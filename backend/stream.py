"""Streaming utilities using FFmpeg for Icecast output."""
from __future__ import annotations

import hashlib
import logging
import os
import random
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

import requests

from . import scraper, tts
from .scraper import Track

logger = logging.getLogger(__name__)


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

    def skip_current(self) -> None:
        """Terminate the current FFmpeg process to skip the track."""
        if self.current_process and self.current_process.poll() is None:
            self._was_skipped = True
            self.current_process.terminate()


class RadioScheduler:
    """Basic scheduler that alternates songs and announcements."""

    def __init__(self, streamer: IcecastStreamer) -> None:
        self.streamer = streamer
        self.played_since_announcement = 0

    def play_track(self, track: Track) -> None:
        """Stream ``track`` and trigger announcements periodically."""

        # Update global now playing information
        now_playing.title = track.title
        now_playing.artist = track.artist
        now_playing.suno_url = track.page_url
        now_playing.announcement = ""

        try:
            file_path = download_track(track.audio_url)
            self.streamer.stream_file(file_path)
        except Exception as exc:
            logger.warning("Failed to play %s: %s", track.title, exc)

        self.played_since_announcement += 1
        if self.played_since_announcement >= 2:
            self.played_since_announcement = 0
            announce(self.streamer)

    def skip_current(self) -> None:
        """Skip the currently playing track."""
        self.streamer.skip_current()
        self.played_since_announcement = 0


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


def frase_ia_emocional() -> str:
    """Return a random poetic phrase for announcements."""

    return random.choice(ANNOUNCEMENTS)


def announce(streamer: IcecastStreamer, message: Optional[str] = None) -> None:
    """Generate a poetic announcement and stream it."""

    if message is None:
        message = frase_ia_emocional()

    try:
        speech = tts.synthesize(message)
        now_playing.announcement = message
        streamer.stream_file(speech)
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


ANNOUNCEMENTS = [
    "Estamos entrando na estação da imaginação.",
    "Essa próxima faixa foi escolhida pelo trem do tempo.",
    "A Rádio Trem AI respira com você.",
    "Essa é uma criação sonora feita por uma inteligência sem ego.",
    "Deixe-se levar por esse som criado no futuro.",
    "Mais uma faixa gerada por IA... mas sentida por você.",
]


def build_scheduler_from_env() -> RadioScheduler:
    """Create a ``RadioScheduler`` using Icecast credentials from the env."""

    host = os.getenv("ICECAST_HOST", "localhost")
    port = int(os.getenv("ICECAST_PORT", "8000"))
    mount = os.getenv("ICECAST_MOUNT", "stream.mp3")
    user = os.getenv("ICECAST_USER", "source")
    password = os.getenv("ICECAST_PASSWORD", "hackme")

    streamer = IcecastStreamer(host, port, mount, user, password)
    return RadioScheduler(streamer)


def radio_loop(scheduler: RadioScheduler) -> None:
    """Continuously stream cached trending tracks and announcements."""

    while True:
        playlist = scraper.get_trending_cache()
        if not playlist:
            scraper.update_trending_cache()
            playlist = scraper.get_trending_cache()

        for track in playlist:
            try:
                scheduler.play_track(track)
            except Exception as exc:
                logger.warning("Playback error: %s", exc)
                continue
