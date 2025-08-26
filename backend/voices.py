"""Voice bank utilities for Rádio Trem AI."""
from __future__ import annotations

import subprocess
import requests
from pathlib import Path
from typing import Dict, List

VOICE_DIR = Path(__file__).resolve().parent / "voices"
VOICE_DIR.mkdir(parents=True, exist_ok=True)

VOICE_BANK: Dict[str, Dict[str, str]] = {
    "pt-br-female": {
        "language": "pt-BR",
        "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Pt-br-casa.wav?download",
    },
    "pt-pt-male": {
        "language": "pt-PT",
        "url": "https://commons.wikimedia.org/wiki/Special:FilePath/Deslocado-pronun-pt-pt.ogg?download",
    },
    "en-male": {
        "language": "en",
        "url": "https://commons.wikimedia.org/wiki/Special:FilePath/En-Hello.oga?download",
    },
}


def list_voices() -> List[dict]:
    """Return available voices with metadata."""
    return [{"id": vid, **meta} for vid, meta in VOICE_BANK.items()]


def ensure_voice(voice_id: str) -> Path:
    """Download and convert the reference audio for ``voice_id``.

    Parameters
    ----------
    voice_id: str
        Identifier of the voice defined in ``VOICE_BANK``.

    Returns
    -------
    Path
        Path to a WAV file suitable for speaker cloning.
    """
    info = VOICE_BANK.get(voice_id)
    if not info:
        raise ValueError(f"Unknown voice '{voice_id}'")

    url = info["url"]
    ext = Path(url.split("?")[0]).suffix or ".wav"
    raw_path = VOICE_DIR / f"{voice_id}{ext}"
    wav_path = VOICE_DIR / f"{voice_id}.wav"

    if not raw_path.exists():
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        raw_path.write_bytes(resp.content)

    if wav_path.exists():
        return wav_path

    if raw_path.suffix != ".wav":
        # Convert to WAV using ffmpeg
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(raw_path), str(wav_path)],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    else:
        raw_path.rename(wav_path)

    return wav_path
