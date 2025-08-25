"""Utilities for scraping trending songs from Suno."""
from __future__ import annotations

import logging
from typing import List

import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel

logger = logging.getLogger(__name__)


class Track(BaseModel):
    """Representation of a track returned by the scraper."""
    title: str
    artist: str
    audio_url: str
    page_url: str


def fetch_trending(limit: int = 20) -> List[Track]:
    """Fetch trending tracks from Suno.

    Parameters
    ----------
    limit: int
        Maximum number of tracks to return.
    """
    url = "https://suno.com/trending"
    logger.debug("Fetching trending tracks from %s", url)
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    tracks: List[Track] = []

    # The site structure may change frequently; the selectors below are
    # intentionally broad to capture basic information when available.
    for card in soup.select("a[href^='/song']"):
        title_el = card.select_one(".title") or card.select_one("p")
        artist_el = card.select_one(".artist")
        audio_el = card.select_one("audio")

        title = title_el.get_text(strip=True) if title_el else "Unknown"
        artist = artist_el.get_text(strip=True) if artist_el else "Unknown"
        audio_url = audio_el.get("src") if audio_el else ""
        page_url = f"https://suno.com{card.get('href')}"

        tracks.append(Track(title=title, artist=artist, audio_url=audio_url, page_url=page_url))

        if len(tracks) >= limit:
            break

    logger.info("Fetched %d tracks", len(tracks))
    return tracks

