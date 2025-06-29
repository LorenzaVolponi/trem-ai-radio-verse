import os
import time
from typing import List

import requests
from suno import Suno


class TrendingScraper:
    def __init__(self, cookie: str, fallback: List[str]):
        self.cookie = cookie
        try:
            self.client = Suno(cookie=cookie) if cookie else None
        except Exception:
            self.client = None
        self.fallback = fallback
        self.trending = fallback

    def refresh(self) -> None:
        if not self.client:
            self.trending = self.fallback
            return
        try:
            songs = self.client.get_songs()
            urls = [s.audio_url for s in songs if s.audio_url]
            if urls:
                self.trending = urls
            else:
                self.trending = self.fallback
        except Exception:
            self.trending = self.fallback

    def run_forever(self, interval: int = 600) -> None:
        while True:
            self.refresh()
            time.sleep(interval)
