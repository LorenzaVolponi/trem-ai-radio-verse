"""Text-to-speech utilities for the radio announcer."""
from __future__ import annotations

import os
from pathlib import Path
import uuid

from gtts import gTTS
from pydub import AudioSegment

TMP_DIR = Path(os.getenv("TTS_TMP", "tmp"))
TMP_DIR.mkdir(parents=True, exist_ok=True)


def synthesize(message: str, language: str = "pt") -> Path:
    """Generate a speech audio file from ``message``.

    The function uses ``gTTS`` to create an MP3 file and then converts it to
    WAV so it can be mixed easily by FFmpeg.

    Parameters
    ----------
    message: str
        Text to be spoken.
    language: str
        Language code. Defaults to Portuguese.

    Returns
    -------
    Path
        Path to the generated WAV file.
    """
    mp3_path = TMP_DIR / f"announcement_{uuid.uuid4().hex}.mp3"
    wav_path = mp3_path.with_suffix(".wav")

    tts = gTTS(text=message, lang=language)
    tts.save(str(mp3_path))

    # Convert to WAV for easier mixing
    AudioSegment.from_mp3(mp3_path).export(wav_path, format="wav")
    mp3_path.unlink(missing_ok=True)
    return wav_path

