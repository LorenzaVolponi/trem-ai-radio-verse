from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import StreamingResponse, RedirectResponse, JSONResponse
import subprocess
from typing import List
import os
import requests
from suno import Suno

app = FastAPI(title="Radio Backend")

tracks = [
    "https://icecast.radiofrance.fr/fip-midfi.mp3"
]

# Optional Suno integration
cookie = os.getenv("SUNO_COOKIE", "")
try:
    suno_client = Suno(cookie=cookie) if cookie else None
except Exception:
    suno_client = None

@app.get("/tracks", response_model=List[str])
def list_tracks():
    """Return available stream URLs. Replace with Suno integration."""
    return tracks

@app.post("/stream")
def start_stream(background_tasks: BackgroundTasks):
    """Placeholder to start FFmpeg streaming to Icecast."""
    cmd = [
        "ffmpeg",
        "-re",
        "-i",
        tracks[0],
        "-c:a",
        "libmp3lame",
        "-f",
        "mp3",
        "icecast://source:password@localhost:8000/stream"
    ]
    background_tasks.add_task(subprocess.Popen, cmd)
    return {"status": "started"}


@app.get("/generate")
def generate_and_stream(prompt: str = "uplifting pop track"):
    """Generate a song using Suno and stream the audio."""
    if not suno_client:
        # Suno unavailable, redirect to fallback stream
        return RedirectResponse(url=tracks[0])
    try:
        song = suno_client.songs.generate(prompt)[0]
    except Exception:
        return RedirectResponse(url=tracks[0])
    audio_resp = requests.get(song.audio_url, stream=True)
    return StreamingResponse(audio_resp.iter_content(chunk_size=4096), media_type="audio/mpeg")


@app.get("/trending")
def list_trending() -> JSONResponse:
    """Return a list of trending Suno songs (audio URLs)."""
    if not suno_client:
        return JSONResponse(content=tracks)
    try:
        songs = suno_client.get_songs()
    except Exception:
        return JSONResponse(content=tracks)
    audio_urls = [song.audio_url for song in songs if song.audio_url]
    return JSONResponse(content=audio_urls)
