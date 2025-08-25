"""Utilities for scraping the Suno Trending page.

This module periodically fetches the list of trending tracks from
``https://suno.com/trending`` and keeps the latest results in memory so the
rest of the application can access them without hammering the site on every
request.
"""

from __future__ import annotations

import logging
import time
from datetime import datetime
from typing import List

from apscheduler.schedulers.background import BackgroundScheduler
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


# ----------------------------------------------------------------------------
# Fetching and caching
# ----------------------------------------------------------------------------

TRENDING_CACHE: List[Track] = []
LAST_UPDATED: datetime | None = None


def fetch_trending_tracks(limit: int = 20) -> List[Track]:
    """Scrape the Suno trending page and return a list of tracks.

    Parameters
    ----------
    limit:
        Maximum number of tracks to return.
    """

    url = "https://suno.com/trending"
    logger.debug("Fetching trending tracks from %s", url)

    for attempt in range(3):
        try:
            response = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            response.raise_for_status()
            break
        except Exception as exc:
            logger.warning("Trending request attempt %d failed: %s", attempt + 1, exc)
            time.sleep(1)
    else:
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    tracks: List[Track] = []

    # The site structure may change frequently; the selectors below are
    # intentionally broad to capture basic information when available.
    for card in soup.select("a[href^='/song']"):
        title_el = card.select_one(".track-title") or card.select_one(".title") or card.select_one("p")
        artist_el = card.select_one(".track-artist") or card.select_one(".artist")
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


def update_trending_cache() -> None:
    """Refresh the in-memory cache with the latest trending tracks."""

    global TRENDING_CACHE, LAST_UPDATED
    try:
        TRENDING_CACHE = fetch_trending_tracks()
        LAST_UPDATED = datetime.utcnow()
        logger.debug("Trending cache updated with %d tracks", len(TRENDING_CACHE))
    except Exception as exc:  # pragma: no cover - network failures are logged
        logger.warning("Failed to update trending cache: %s", exc)


def get_trending_cache() -> List[Track]:
    """Return the current cached trending tracks."""

    return TRENDING_CACHE


# Start background scheduler to refresh the cache every 10 minutes.
scheduler = BackgroundScheduler()
scheduler.add_job(update_trending_cache, "interval", minutes=10)
scheduler.start()

# Populate cache at import time so callers immediately have data.
update_trending_cache()


# Backwards compatibility with previous ``fetch_trending`` name
def fetch_trending(limit: int = 20) -> List[Track]:
    return fetch_trending_tracks(limit)

