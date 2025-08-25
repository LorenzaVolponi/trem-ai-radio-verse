"""FastAPI application for Rádio Trem AI backend."""
from __future__ import annotations

from typing import List

from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

from . import scraper, tts
from .stream import build_scheduler_from_env, now_playing

app = FastAPI(title="Rádio Trem AI")


@app.get("/trending", response_model=List[scraper.Track])
def get_trending(limit: int = 20) -> List[scraper.Track]:
    """Return cached trending tracks."""

    return scraper.get_trending_cache()[:limit]


class AnnouncementRequest(BaseModel):
    text: str


@app.post("/generate_announcement")
def generate_announcement(payload: AnnouncementRequest) -> FileResponse:
    """Generate an announcement audio file for the provided ``text``."""
    file_path = tts.synthesize(payload.text)
    return FileResponse(file_path, media_type="audio/wav", filename=file_path.name)


class NowPlayingResponse(BaseModel):
    title: str
    artist: str
    suno_url: str
    announcement: str


@app.get("/now_playing", response_model=NowPlayingResponse)
def now_playing_endpoint() -> NowPlayingResponse:
    """Return metadata about the current track and last announcement."""
    return NowPlayingResponse(**now_playing.__dict__)


# Instantiate scheduler for long‑running radio loop (not started automatically)
scheduler = build_scheduler_from_env()

