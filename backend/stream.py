"""Streaming utilities using FFmpeg for Icecast output."""
from __future__ import annotations

import os
import subprocess
from pathlib import Path
from typing import Optional

import random
from dataclasses import dataclass

import requests

from . import tts, scraper
from .scraper import Track


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

    def stream_file(self, file_path: Path) -> None:
        """Send a local audio file to the Icecast server.

        Volume or fade effects between music and announcements can be applied
        by extending the FFmpeg command with filter arguments.
        """
        cmd = self._base_cmd()
        cmd[cmd.index("-i") + 1] = str(file_path)
        subprocess.run(cmd, check=True)


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

        file_path = download_track(track.audio_url)
        self.streamer.stream_file(file_path)

        self.played_since_announcement += 1
        if self.played_since_announcement >= 2:
            self.played_since_announcement = 0
            announce(self.streamer)


def download_track(url: str) -> Path:
    """Download ``url`` to a temporary file and return its path."""
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    tmp = Path("tmp")
    tmp.mkdir(exist_ok=True)
    filename = tmp / Path(url).name
    with open(filename, "wb") as fh:
        fh.write(response.content)
    return filename


def frase_ia_emocional() -> str:
    """Return a random poetic phrase for announcements."""

    return random.choice(ANNOUNCEMENTS)


def announce(streamer: IcecastStreamer, message: Optional[str] = None) -> None:
    """Generate a poetic announcement and stream it."""

    if message is None:
        message = frase_ia_emocional()

    speech = tts.synthesize(message)
    now_playing.announcement = message
    streamer.stream_file(speech)
    speech.unlink(missing_ok=True)


# ---------------------------------------------------------------------------
# State & helpers


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
            scheduler.play_track(track)


