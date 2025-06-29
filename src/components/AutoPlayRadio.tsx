import React, { useEffect, useRef, useState } from 'react';

const playlist = [
  {
    title: 'Sample Track 1',
    url: 'https://file-examples.com/wp-content/storage/fe6a3fb2e4886c02f68da66/2017/11/file_example_MP3_700KB.mp3'
  },
  {
    title: 'Sample Track 2',
    url: 'https://file-examples.com/wp-content/storage/fe6a3fb2e4886c02f68da66/2017/11/file_example_MP3_1MG.mp3'
  }
];

const AutoPlayRadio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const play = async () => {
      try {
        await audio.play();
        setFailed(false);
      } catch (err) {
        setFailed(true);
      }
    };

    audio.src = playlist[currentIndex].url;
    play();
  }, [currentIndex]);

  const handleEnded = () => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
  };

  const handleStartClick = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setFailed(false);
      } catch (err) {
        /* ignore */
      }
    }
  };

  return (
    <div className="sr-only">
      <audio ref={audioRef} onEnded={handleEnded} />
      {failed && (
        <button onClick={handleStartClick}>Clique para iniciar o áudio</button>
      )}
    </div>
  );
};

export default AutoPlayRadio;
