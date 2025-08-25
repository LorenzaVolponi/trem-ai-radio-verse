"""Text-to-speech utilities for the radio announcer."""
from __future__ import annotations

import os
from pathlib import Path
import uuid

from gtts import gTTS

TMP_DIR = Path(os.getenv("TTS_TMP", "tmp"))
TMP_DIR.mkdir(parents=True, exist_ok=True)


def synthesize(message: str, language: str = "en") -> Path:
    """Generate a speech audio file from ``message``.

    Parameters
    ----------
    message: str
        Text to be spoken.
    language: str
        Language code. Defaults to English.

    Returns
    -------
    Path
        Path to the generated MP3 file.
    """
    filename = TMP_DIR / f"announcement_{uuid.uuid4().hex}.mp3"
    tts = gTTS(text=message, lang=language)
    tts.save(str(filename))
    return filename

