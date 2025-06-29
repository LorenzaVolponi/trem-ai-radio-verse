import React, { useEffect, useRef, useState } from 'react';

// Public Icecast stream used as default source.
// Replace with your own stream or Suno-generated playlist.
const STREAM_URL = 'https://icecast.radiofrance.fr/fip-midfi.mp3';

const AutoPlayRadio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const play = async () => {
      try {
        audio.muted = true;
        await audio.play();
        setFailed(false);
        setTimeout(() => {
          if (audio) audio.muted = false;
        }, 500);
      } catch (err) {
        setFailed(true);
        const clickHandler = async () => {
          try {
            await audio.play();
            setFailed(false);
            document.removeEventListener('click', clickHandler);
          } catch (_) {
            /* ignored */
          }
        };
        document.addEventListener('click', clickHandler);
      }
    };

    audio.src = STREAM_URL;
    play();
  }, []);

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
