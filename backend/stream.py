"""Streaming utilities using FFmpeg for Icecast output."""
from __future__ import annotations

import os
import subprocess
from pathlib import Path
from typing import Optional

import requests

from . import tts
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
        cmd = self._base_cmd()
        cmd[cmd.index("-i") + 1] = str(file_path)
        subprocess.run(cmd, check=True)


class RadioScheduler:
    """Basic scheduler that alternates songs and announcements."""

    def __init__(self, streamer: IcecastStreamer) -> None:
        self.streamer = streamer
        self.played_since_announcement = 0

    def play_track(self, track: Track) -> None:
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


def announce(streamer: IcecastStreamer, message: Optional[str] = None) -> None:
    """Generate a poetic announcement and stream it."""
    if message is None:
        message = "Another day, another dream on Rádio Trem AI."
    speech = tts.synthesize(message)
    streamer.stream_file(speech)
    speech.unlink(missing_ok=True)

