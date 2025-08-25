"""FastAPI application for Rádio Trem AI backend."""
from __future__ import annotations

import os
from typing import List

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from . import scraper, tts
from .stream import IcecastStreamer, RadioScheduler, announce

app = FastAPI(title="Rádio Trem AI")


@app.get("/trending", response_model=List[scraper.Track])
def get_trending() -> List[scraper.Track]:
    """Return a list of trending tracks from Suno."""
    return scraper.fetch_trending()


@app.get("/generate_announcement")
def generate_announcement(message: str) -> JSONResponse:
    """Generate an announcement audio file for the provided ``message``."""
    file_path = tts.synthesize(message)
    return JSONResponse({"file": str(file_path)})


@app.get("/current")
def current_track() -> JSONResponse:
    """Placeholder endpoint returning current track info.

    A full implementation would keep state of the currently playing track
    within the ``RadioScheduler`` and return its metadata here.
    """
    return JSONResponse({"title": "Unknown", "artist": "Unknown"})


# -- Radio runtime ---------------------------------------------------------


def build_scheduler() -> RadioScheduler:
    host = os.getenv("ICECAST_HOST", "localhost")
    port = int(os.getenv("ICECAST_PORT", "8000"))
    mount = os.getenv("ICECAST_MOUNT", "stream.mp3")
    user = os.getenv("ICECAST_USER", "source")
    password = os.getenv("ICECAST_PASSWORD", "hackme")

    streamer = IcecastStreamer(host, port, mount, user, password)
    return RadioScheduler(streamer)


scheduler = build_scheduler()

