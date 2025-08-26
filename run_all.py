"""Run both FastAPI app and radio loop in parallel."""
import threading
import asyncio
import uvicorn

from backend.main import app, scheduler
from backend.stream import radio_loop_async


def _run_api():
    uvicorn.run(app, host="0.0.0.0", port=8000)


def _run_radio():
    asyncio.run(radio_loop_async(scheduler))


if __name__ == "__main__":
    api_thread = threading.Thread(target=_run_api, daemon=True)
    api_thread.start()
    _run_radio()
