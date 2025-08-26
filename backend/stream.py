"""Streaming utilities using FFmpeg for Icecast output."""
from __future__ import annotations

import asyncio
import hashlib
import logging
import os
import random
import sqlite3
import subprocess
import threading
import time
from collections import deque
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Optional

import requests

from . import scraper, tts
from .scraper import Track

logger = logging.getLogger(__name__)

# Queue of upcoming tracks pre-fetched from the scraper
TRACK_QUEUE: asyncio.Queue[tuple[Track, Path]] = asyncio.Queue()

# Simple cache of recent phrases to avoid repetition
_recent_phrases: deque[str] = deque(maxlen=10)

# SQLite database for playback history
HISTORY_DB = Path(os.getenv("HISTORY_DB", "history.db"))


def _init_history_db() -> None:
    conn = sqlite3.connect(HISTORY_DB)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS history (timestamp TEXT, title TEXT, artist TEXT, announcement TEXT)"
    )
    conn.commit()
    conn.close()


_init_history_db()


class IcecastStreamer:
    """Handle audio streaming to an Icecast server via FFmpeg."""

    def __init__(
        self,
        host: str,
        port: int,
        mount: str,
        user: str,
        password: str,
    ) -> None:
        self.host = host
        self.port = port
        self.mount = mount
        self.user = user
        self.password = password
        self.current_process: Optional[subprocess.Popen] = None
        self._was_skipped = False
        # Durations for fades and crossfades
        self.fade_duration = float(os.getenv("FADE_DURATION", "1.0"))
        self.crossfade_duration = float(os.getenv("CROSSFADE_DURATION", "1.5"))

    def _base_cmd(self) -> list[str]:
        url = f"icecast://{self.user}:{self.password}@{self.host}:{self.port}/{self.mount}"
        return [
            "ffmpeg",
            "-re",  # read input in real time
            "-i",
            "-",  # placeholder for stdin
            "-c:a",
            "libmp3lame",
            "-b:a",
            "128k",
            "-content_type",
            "audio/mpeg",
            "-f",
            "mp3",
            url,
        ]

    def _probe_duration(self, file_path: Path) -> float:
        """Return duration of ``file_path`` in seconds using ffprobe."""

        try:
            result = subprocess.run(
                [
                    "ffprobe",
                    "-v",
                    "error",
                    "-show_entries",
                    "format=duration",
                    "-of",
                    "default=noprint_wrappers=1:nokey=1",
                    str(file_path),
                ],
                capture_output=True,
                text=True,
            )
            return float(result.stdout.strip())
        except Exception:
            return 0.0

    def stream_file(self, file_path: Path) -> None:
        """Send a local audio file to the Icecast server with fades and normalization."""

        cmd = self._base_cmd()
        cmd[cmd.index("-i") + 1] = str(file_path)

        duration = self._probe_duration(file_path)
        fade = self.fade_duration
        fade_out_start = max(duration - fade, 0)
        filter_chain = f"loudnorm,afade=t=in:st=0:d={fade},afade=t=out:st={fade_out_start}:d={fade}"
        cmd.insert(cmd.index("-c:a"), "-af")
        cmd.insert(cmd.index("-c:a"), filter_chain)

        for attempt in range(3):
            try:
                logger.debug("Streaming %s (attempt %d)", file_path, attempt + 1)
                self.current_process = subprocess.Popen(cmd)
                self.current_process.wait()
                if self._was_skipped:
                    logger.info("Streaming of %s skipped", file_path)
                    break
                if self.current_process.returncode == 0:
                    break
                raise subprocess.CalledProcessError(self.current_process.returncode, cmd)
            except Exception as exc:
                logger.warning("Stream attempt %d failed: %s", attempt + 1, exc)
                time.sleep(1)
            finally:
                if self.current_process:
                    self.current_process.kill()
                    self.current_process = None
                    self._was_skipped = False
        else:
            logger.error("Failed to stream file %s after retries", file_path)

    def stream_pair(self, first: Path, second: Path) -> None:
        """Stream two tracks with a crossfade between them."""

        url = f"icecast://{self.user}:{self.password}@{self.host}:{self.port}/{self.mount}"
        cf = self.crossfade_duration
        filter_complex = (
            f"[0:a]loudnorm[a0];[1:a]loudnorm[a1];[a0][a1]acrossfade=d={cf}"
        )
        cmd = [
            "ffmpeg",
            "-re",
            "-i",
            str(first),
            "-i",
            str(second),
            "-filter_complex",
            filter_complex,
            "-c:a",
            "libmp3lame",
            "-b:a",
            "128k",
            "-content_type",
            "audio/mpeg",
            "-f",
            "mp3",
            url,
        ]

        for attempt in range(3):
            try:
                logger.debug(
                    "Streaming pair %s + %s (attempt %d)", first, second, attempt + 1
                )
                self.current_process = subprocess.Popen(cmd)
                self.current_process.wait()
                if self._was_skipped:
                    logger.info("Streaming of pair skipped")
                    break
                if self.current_process.returncode == 0:
                    break
                raise subprocess.CalledProcessError(self.current_process.returncode, cmd)
            except Exception as exc:
                logger.warning("Pair stream attempt %d failed: %s", attempt + 1, exc)
                time.sleep(1)
            finally:
                if self.current_process:
                    self.current_process.kill()
                    self.current_process = None
                    self._was_skipped = False
        else:
            logger.error("Failed to stream pair %s + %s after retries", first, second)

    def skip_current(self) -> None:
        """Terminate the current FFmpeg process to skip the track."""
        if self.current_process and self.current_process.poll() is None:
            self._was_skipped = True
            self.current_process.terminate()


class RadioScheduler:
    """Scheduler that plays pairs of tracks with crossfade and announcements."""

    def __init__(self, streamer: IcecastStreamer) -> None:
        self.streamer = streamer

    def play_pair(
        self, first: tuple[Track, Path], second: tuple[Track, Path]
    ) -> None:
        track1, file1 = first
        track2, file2 = second

        # Log and set now playing for first track
        now_playing.title = track1.title
        now_playing.artist = track1.artist
        now_playing.suno_url = track1.page_url
        now_playing.announcement = ""
        log_history(track1, None)

        # Thread to update metadata for second track when it starts
        duration1 = self.streamer._probe_duration(file1)
        cf = self.streamer.crossfade_duration

        def _switch_metadata() -> None:
            time.sleep(max(duration1 - cf, 0))
            now_playing.title = track2.title
            now_playing.artist = track2.artist
            now_playing.suno_url = track2.page_url
            now_playing.announcement = ""
            log_history(track2, None)

        threading.Thread(target=_switch_metadata, daemon=True).start()

        try:
            self.streamer.stream_pair(file1, file2)
        except Exception as exc:
            logger.warning("Failed to play pair %s/%s: %s", track1.title, track2.title, exc)

        announce(self.streamer)

    def skip_current(self) -> None:
        """Skip the currently playing track."""
        self.streamer.skip_current()


TRACK_CACHE = Path(os.getenv("TRACK_CACHE", "track_cache"))
TRACK_CACHE.mkdir(exist_ok=True)
CACHE_TTL = int(os.getenv("TRACK_CACHE_TTL", "86400"))  # one day default


def cleanup_cache() -> None:
    """Remove cached files older than ``CACHE_TTL`` seconds."""

    now = time.time()
    for file in TRACK_CACHE.glob("*"):
        try:
            if file.is_file() and now - file.stat().st_mtime > CACHE_TTL:
                file.unlink()
        except OSError:
            pass


def download_track(url: str) -> Path:
    """Stream-download ``url`` into the cache and return its path."""

    cleanup_cache()
    filename = TRACK_CACHE / (hashlib.sha1(url.encode("utf-8")).hexdigest() + Path(url).suffix)
    if filename.exists():
        return filename

    for attempt in range(3):
        try:
            with requests.get(url, timeout=30, stream=True) as response:
                response.raise_for_status()
                with open(filename, "wb") as fh:
                    for chunk in response.iter_content(chunk_size=65536):
                        if chunk:
                            fh.write(chunk)
            return filename
        except Exception as exc:
            logger.warning("Download attempt %d failed: %s", attempt + 1, exc)
            time.sleep(1)
    raise RuntimeError(f"Failed to download {url}")


def log_history(track: Track | None, announcement: str | None) -> None:
    """Persist a track play or announcement into the history database."""

    conn = sqlite3.connect(HISTORY_DB)
    conn.execute(
        "INSERT INTO history VALUES (?,?,?,?)",
        (
            datetime.utcnow().isoformat(),
            track.title if track else None,
            track.artist if track else None,
            announcement,
        ),
    )
    conn.commit()
    conn.close()


def get_history(limit: int = 20) -> list[dict[str, str]]:
    """Return the latest ``limit`` history entries."""

    conn = sqlite3.connect(HISTORY_DB)
    rows = conn.execute(
        "SELECT timestamp, title, artist, announcement FROM history ORDER BY timestamp DESC LIMIT ?",
        (limit,),
    ).fetchall()
    conn.close()
    return [
        {
            "timestamp": ts,
            "title": title or "",
            "artist": artist or "",
            "announcement": ann or "",
        }
        for ts, title, artist, ann in rows
    ]


def _llm_generate(style: str) -> str:
    """Generate a phrase using an external LLM if an API key is provided."""

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("No API key")

    prompt = (
        "Gere uma breve frase poética para uma rádio com o seguinte estilo: "
        f"{style}."
    )
    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 40,
            },
            timeout=15,
        )
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception:
        raise RuntimeError("LLM request failed")


def generate_phrase() -> str:
    """Return a cached poetic phrase using LLM or fallback list."""

    style = os.getenv("ANNOUNCE_STYLE", "poética")

    for _ in range(3):
        try:
            phrase = _llm_generate(style)
        except Exception:
            phrase = random.choice(
                [
                    "Estamos entrando na estação da imaginação.",
                    "Essa próxima faixa foi escolhida pelo trem do tempo.",
                    "A Rádio Trem AI respira com você.",
                    "Essa é uma criação sonora feita por uma inteligência sem ego.",
                    "Deixe-se levar por esse som criado no futuro.",
                    "Mais uma faixa gerada por IA... mas sentida por você.",
                ]
            )

        if phrase not in _recent_phrases:
            _recent_phrases.append(phrase)
            return phrase

    return phrase


def frase_ia_emocional() -> str:
    """Compatibility wrapper for older code."""

    return generate_phrase()


def announce(streamer: IcecastStreamer, message: Optional[str] = None) -> None:
    """Generate a poetic announcement and stream it."""

    if message is None:
        message = generate_phrase()

    try:
        speech = tts.synthesize(message)
        now_playing.announcement = message
        streamer.stream_file(speech)
        log_history(None, message)
    except Exception as exc:
        logger.warning("Failed to announce '%s': %s", message, exc)


# ---------------------------------------------------------------------------
# State & helpers
# ---------------------------------------------------------------------------


@dataclass
class NowPlaying:
    """Metadata about the currently playing track and last announcement."""

    title: str = ""
    artist: str = ""
    suno_url: str = ""
    announcement: str = ""


now_playing = NowPlaying()


def build_scheduler_from_env() -> RadioScheduler:
    """Create a ``RadioScheduler`` using Icecast credentials from the env."""

    host = os.getenv("ICECAST_HOST", "localhost")
    port = int(os.getenv("ICECAST_PORT", "8000"))
    mount = os.getenv("ICECAST_MOUNT", "stream.mp3")
    user = os.getenv("ICECAST_USER", "source")
    password = os.getenv("ICECAST_PASSWORD", "hackme")

    streamer = IcecastStreamer(host, port, mount, user, password)
    return RadioScheduler(streamer)


async def _preload_tracks() -> None:
    """Keep the track queue filled with downloaded files."""

    index = 0
    while True:
        if TRACK_QUEUE.qsize() >= 4:
            await asyncio.sleep(1)
            continue
        playlist = scraper.get_trending_cache()
        if not playlist:
            scraper.update_trending_cache()
            await asyncio.sleep(5)
            continue
        track = playlist[index % len(playlist)]
        try:
            path = download_track(track.audio_url)
            await TRACK_QUEUE.put((track, path))
            index += 1
        except Exception as exc:
            logger.warning("Preload failed for %s: %s", track.title, exc)
            await asyncio.sleep(1)


async def radio_loop_async(scheduler: RadioScheduler) -> None:
    """Continuously stream tracks from the queue."""

    asyncio.create_task(_preload_tracks())
    while True:
        first = await TRACK_QUEUE.get()
        second = await TRACK_QUEUE.get()
        await asyncio.to_thread(scheduler.play_pair, first, second)
