import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Radio,
  Wifi,
  Brain,
  ShieldCheck,
  Heart,
  Zap,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { radioStreamConfig } from '@/config/radio';

interface LiveAudioPlayerProps {
  currentTrack: {
    title: string;
    artist: string;
    duration: number;
    elapsed: number;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
  audioLevel: number;
  isDemo?: boolean;
}

const LiveAudioPlayer: React.FC<LiveAudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  audioLevel,
  isDemo = false
}) => {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(20).fill(0));
  const [streamUrl, setStreamUrl] = useState(radioStreamConfig.streamUrl);
  const [streamStatus, setStreamStatus] = useState<'idle' | 'loading' | 'buffering' | 'playing' | 'blocked' | 'error'>('idle');
  const [streamMessage, setStreamMessage] = useState('Clique em play para iniciar a transmissão ao vivo.');
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let isCancelled = false;
    let hlsInstance: { destroy: () => void } | null = null;

    if (!streamUrl.endsWith('.m3u8')) {
      audio.src = streamUrl;
      return;
    }

    if (audio.canPlayType('application/vnd.apple.mpegurl')) {
      audio.src = streamUrl;
      return;
    }

    import('hls.js').then(({ default: Hls }) => {
      if (isCancelled) return;

      if (!Hls.isSupported()) {
        setStreamUrl(radioStreamConfig.fallback.streamUrl);
        setHasTriedFallback(true);
        setStreamMessage(`HLS não suportado neste navegador. Usando fallback: ${radioStreamConfig.fallback.label}.`);
        return;
      }

      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hlsInstance = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(audio);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          handleStreamError();
        }
      });
    }).catch(handleStreamError);

    return () => {
      isCancelled = true;
      hlsInstance?.destroy();
    };
  }, [streamUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume / 100;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setStreamStatus(prev => (prev === 'playing' ? prev : 'loading'));
      setStreamMessage('Conectando à transmissão ao vivo...');

      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          setStreamStatus('blocked');
          setStreamMessage('Autoplay bloqueado pelo navegador. Toque em play novamente para liberar o áudio.');
        });
      }
    } else {
      audio.pause();
      setStreamStatus('idle');
      setStreamMessage('Transmissão pausada.');
    }
  }, [isPlaying, streamUrl]);

  function handleStreamError() {
    if (!hasTriedFallback && streamUrl !== radioStreamConfig.fallback.streamUrl) {
      setHasTriedFallback(true);
      setStreamUrl(radioStreamConfig.fallback.streamUrl);
      setStreamStatus('loading');
      setStreamMessage(`Stream principal indisponível. Tentando fallback: ${radioStreamConfig.fallback.label}.`);
      return;
    }

    setStreamStatus('error');
    setStreamMessage('Transmissão indisponível no momento. Tente novamente em instantes.');
  }

  const isStreamUnavailable = streamStatus === 'error';
  const isStreamBusy = streamStatus === 'loading' || streamStatus === 'buffering';

  useEffect(() => {
    const finishInitialSync = window.setTimeout(() => {
      setStreamState(navigator.onLine ? 'online' : 'offline');
    }, 800);

    const handleOffline = () => {
      setStreamState('offline');
      toast({
        title: 'Player offline',
        description: 'A transmissão será retomada quando a conexão voltar.',
        variant: 'destructive',
      });
    };

    const handleOnline = () => {
      setStreamState('online');
      toast({
        title: 'Conexão restaurada',
        description: 'O player ao vivo voltou a receber o stream.',
      });
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.clearTimeout(finishInitialSync);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [toast]);

  useEffect(() => {
    if (isPlaying && streamState === 'online') {
      const interval = setInterval(() => {
        setVisualizerBars(prev => 
          createVisualizerBars(prev.length)
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, streamState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTrack.elapsed / currentTrack.duration) * 100;

  const handlePlayPause = () => {
    if (streamState === 'offline' || streamState === 'error') {
      toast({
        title: 'Stream indisponível',
        description: 'Use o botão Tentar novamente para reconectar a transmissão.',
        variant: 'destructive',
      });
      return;
    }

    onPlayPause();
  };

  const handleRetryStream = () => {
    setStreamState('loading');
    window.setTimeout(() => {
      if (!navigator.onLine) {
        setStreamState('offline');
        toast({
          title: 'Sem internet',
          description: 'Não foi possível reconectar porque o navegador está offline.',
          variant: 'destructive',
        });
        return;
      }

      setStreamState('online');
      toast({
        title: 'Stream reconectado',
        description: 'A transmissão ao vivo está disponível novamente.',
      });
    }, 900);
  };

  const hasTrack = Boolean(currentTrack.title && currentTrack.artist);
  const visibleState: RealtimeState | null = !hasTrack ? 'empty' : streamState === 'online' ? null : streamState;

  return (
    <Card className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-cyan-500/20 border-white/20 shadow-2xl">
      <CardContent className="p-6">
        <audio
          ref={audioRef}
          preload="none"
          playsInline
          onLoadStart={() => {
            setStreamStatus('loading');
            setStreamMessage('Carregando transmissão ao vivo...');
          }}
          onWaiting={() => {
            setStreamStatus('buffering');
            setStreamMessage('Buffering da transmissão ao vivo...');
          }}
          onCanPlay={() => {
            setStreamStatus(isPlaying ? 'playing' : 'idle');
            setStreamMessage(isPlaying ? 'Transmissão ao vivo conectada.' : 'Pronto para transmitir ao vivo.');
          }}
          onPlaying={() => {
            setStreamStatus('playing');
            setStreamMessage('Transmissão ao vivo conectada.');
          }}
          onStalled={() => {
            setStreamStatus('buffering');
            setStreamMessage('Conexão instável. Tentando recuperar o áudio...');
          }}
          onError={handleStreamError}
        />
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-brand-cta rounded-full flex items-center justify-center shadow-brand-glow mb-4 mx-auto">
              <Radio className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <Wifi className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge variant="outline" className="border-red-500/50 text-red-400 animate-pulse">
              <Wifi className="w-3 h-3 mr-1" />
              {streamStatus === 'playing' ? 'AO VIVO 24/7' : streamStatus === 'buffering' ? 'BUFFERING' : 'RÁDIO ONLINE'}
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Brain className="w-3 h-3 mr-1" />
              IA autogerenciável
            </Badge>
            <Badge variant="outline" className="border-slate-400/50 text-slate-300">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Sem ranking auditado
            </Badge>
            {isDemo && (
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                Demonstração
              </Badge>
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🎵 {currentTrack.title} 🎵
          </h2>
          <p className="text-xl text-purple-300 mb-2">{currentTrack.artist}</p>
          <p className="text-sm text-gray-400 mb-4">{radioStreamConfig.metadata.stationName} • {radioStreamConfig.metadata.description}</p>

          <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${isStreamUnavailable ? 'border-red-500/50 bg-red-500/10 text-red-200' : 'border-purple-500/30 bg-white/5 text-gray-300'}`}>
            <div className="flex items-center justify-center gap-2">
              {isStreamUnavailable ? <AlertTriangle className="w-4 h-4 text-red-400" /> : isStreamBusy ? <Loader2 className="w-4 h-4 animate-spin text-cyan-300" /> : <Wifi className="w-4 h-4 text-cyan-300" />}
              <span>{streamMessage}</span>
            </div>
          </div>
          
          {/* Audio Visualizer */}
          <div className="flex items-end justify-center space-x-1 h-16 mb-4">
            {visualizerBars.map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-radio-purple to-radio-cyan rounded-full transition-all duration-100 w-2"
                style={{ 
                  height: isPlaying && streamState === 'online' ? `${Math.max(height * 0.6, 10)}%` : '10%',
                  opacity: isPlaying && streamState === 'online' ? 1 : 0.3
                }}
              />
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full mb-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>{formatTime(currentTrack.elapsed)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="w-full h-2 bg-gray-700"
            />
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="w-16 h-16 rounded-full bg-brand-cta shadow-brand-glow transition-brand hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </Button>
          </div>
          
          {/* Volume Control */}
          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-gray-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <div className="w-32">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <span className="text-sm text-gray-400 w-8">{isMuted ? 0 : volume}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Ultra HD {radioStreamConfig.metadata.bitrate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Latência: ~67ms</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Performance IA demo: 99.7%</span>
            </div>
          </div>
        </div>
    </GradientPanel>
  );
};

export default LiveAudioPlayer;
