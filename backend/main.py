from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import StreamingResponse
import subprocess
from typing import List

app = FastAPI(title="Radio Backend")

tracks = [
    "https://icecast.radiofrance.fr/fip-midfi.mp3"
]

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
