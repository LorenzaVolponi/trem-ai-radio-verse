"""FastAPI application for Rádio Trem AI backend."""
from __future__ import annotations

from typing import List
import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from pydantic import BaseModel

from . import scraper, tts
from .stream import build_scheduler_from_env, now_playing, get_history

# Allow web players on other origins to call the API
app = FastAPI(title="Rádio Trem AI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index() -> HTMLResponse:
    """Serve a tiny HTML player pointing to the configured Icecast stream."""
    host = os.getenv("ICECAST_HOST", "localhost")
    port = os.getenv("ICECAST_PORT", "8000")
    mount = os.getenv("ICECAST_MOUNT", "stream.mp3")
    stream_url = f"http://{host}:{port}/{mount}"
    html_path = Path(__file__).resolve().parent.parent / "public" / "radio.html"
    html = html_path.read_text(encoding="utf-8")
    inject = f"<script>window.ICECAST_STREAM='{stream_url}';</script>"
    html = html.replace("</head>", inject + "</head>")
    return HTMLResponse(html)


@app.get("/trending", response_model=List[scraper.Track])
def get_trending(limit: int = 20) -> List[scraper.Track]:
    """Return cached trending tracks."""

    return scraper.get_trending_cache()[:limit]


class AnnouncementRequest(BaseModel):
    text: str
    voice: str | None = None
    emotion: str | None = None


@app.post("/generate_announcement")
def generate_announcement(payload: AnnouncementRequest) -> FileResponse:
    """Generate an announcement audio file for the provided ``text``."""
    file_path = tts.synthesize(
        payload.text,
        voice=payload.voice or "random",
        emotion=payload.emotion or "Neutral",
    )
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


@app.get("/history")
def history_endpoint(limit: int = 20):
    """Return recent playback history."""
    return get_history(limit)

@app.post("/skip")
def skip_track() -> dict[str, str]:
    """Skip the currently playing track."""
    scheduler.skip_current()
    return {"status": "skipping"}



# Instantiate scheduler for long‑running radio loop (not started automatically)
scheduler = build_scheduler_from_env()

