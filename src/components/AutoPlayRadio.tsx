import React, { useEffect, useRef, useState } from 'react';

const TRENDING_URL = '/trending';
const FALLBACK_STREAM = 'https://icecast.radiofrance.fr/fip-midfi.mp3';

const AutoPlayRadio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [failed, setFailed] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  // fetch playlist and autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const fetchTrending = async () => {
      try {
        const resp = await fetch(TRENDING_URL);
        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
          setPlaylist(data);
        } else {
          setPlaylist([FALLBACK_STREAM]);
        }
      } catch (_) {
        setPlaylist([FALLBACK_STREAM]);
      }
    };

    fetchTrending();

    const handleEnded = () => {
      setCurrent((prev) => prev + 1);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;
    const index = current % playlist.length;
    audio.src = playlist[index];
    const play = async () => {
      try {
        audio.muted = true;
        await audio.play();
        setFailed(false);
        setTimeout(() => {
          if (audio) audio.muted = false;
        }, 500);
      } catch (_) {
        setFailed(true);
      }
    };
    play();
  }, [playlist, current]);

  const handleStartClick = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play();
        setFailed(false);
      } catch (_) {
        /* ignore */
      }
    }
  };

  return (
    <div className="sr-only">
      <audio ref={audioRef} />
      {failed && (
        <button onClick={handleStartClick}>Clique para iniciar o áudio</button>
      )}
    </div>
  );
};

export default AutoPlayRadio;
