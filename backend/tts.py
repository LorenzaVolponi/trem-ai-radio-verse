"""Text-to-speech utilities for the radio announcer using Coqui TTS."""
from __future__ import annotations

import hashlib
import os
from functools import lru_cache
from pathlib import Path

from TTS.api import TTS

TMP_DIR = Path(os.getenv("TTS_TMP", "tmp"))
TMP_DIR.mkdir(parents=True, exist_ok=True)

# Default model; can be overridden via env var ``TTS_MODEL``
MODEL_NAME = os.getenv("TTS_MODEL", "tts_models/multilingual/multi-dataset/xtts_v2")


@lru_cache(maxsize=1)
def _load_model() -> TTS:
    """Lazy-load the TTS model to avoid long startup times."""
    return TTS(model_name=MODEL_NAME)


def synthesize(message: str, voice: str = "random", emotion: str = "Neutral") -> Path:
    """Generate a speech audio file from ``message``.

    Parameters
    ----------
    message: str
        Text to be spoken.
    voice: str
        Voice identifier supported by the model. ``"random"`` by default.
    emotion: str
        Emotion/style indicator supported by the model.

    Returns
    -------
    Path
        Path to the generated WAV file.
    """
    # Cache by hashing the text + voice + emotion
    cache_key = hashlib.sha1(f"{voice}|{emotion}|{message}".encode("utf-8")).hexdigest()
    wav_path = TMP_DIR / f"tts_{cache_key}.wav"
    if wav_path.exists():
        return wav_path

    tts = _load_model()
    # Some models may not support speaker/emotion params; ignore if unsupported
    try:
        tts.tts_to_file(text=message, speaker=voice, emotion=emotion, file_path=str(wav_path))
    except TypeError:
        tts.tts_to_file(text=message, file_path=str(wav_path))

    return wav_path
