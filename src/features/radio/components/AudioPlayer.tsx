
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Repeat,
  Shuffle,
  Download,
  ExternalLink
} from 'lucide-react';

interface AudioPlayerProps {
  currentTrack: {
    title: string;
    artist: string;
    album: string;
    duration: string;
    currentTime: string;
  };
  isPlaying: boolean;
  onPlayPause: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  currentTrack, 
  isPlaying, 
  onPlayPause 
}) => {
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState([35]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);

  // Visualizador de áudio simulado
  const audioVisualizerBars = Array.from({ length: 32 }, (_, i) => i);

  return (
    <Card className="glass-effect border-white/10 p-6">
      <CardContent className="p-0">
        <div className="space-y-6">
          
          {/* Artwork e Informações */}
          <div className="flex items-start space-x-6">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-radio-purple via-radio-pink to-radio-cyan rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-4xl font-bold text-white">AI</div>
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  onClick={onPlayPause}
                  size="icon"
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h2>
                <p className="text-lg text-gray-300">{currentTrack.artist}</p>
                <p className="text-sm text-gray-400">{currentTrack.album}</p>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>

          {/* Visualizador de Áudio */}
          <div className="w-full h-16 flex items-end justify-center space-x-1 bg-black/20 rounded-lg p-2">
            {audioVisualizerBars.map((bar) => (
              <div
                key={bar}
                className={`w-1 bg-gradient-to-t from-radio-cyan via-radio-purple to-radio-pink rounded-full audio-bar ${
                  isPlaying ? 'animate-wave' : 'h-2'
                }`}
                style={{
                  height: isPlaying ? `${Math.random() * 40 + 8}px` : '8px',
                  animationDelay: `${bar * 0.05}s`
                }}
              />
            ))}
          </div>

          {/* Controles de Progresso */}
          <div className="space-y-2">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{currentTrack.currentTime}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Controles Principais */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Controles de Reprodução */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`text-gray-400 hover:text-white ${isShuffled ? 'text-radio-purple' : ''}`}
                >
                  <Shuffle className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                <Button
                  onClick={onPlayPause}
                  size="icon"
                  className="w-12 h-12 bg-radio-purple hover:bg-radio-purple/80 text-white rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRepeated(!isRepeated)}
                  className={`text-gray-400 hover:text-white ${isRepeated ? 'text-radio-purple' : ''}`}
                >
                  <Repeat className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Controle de Volume */}
            <div className="flex items-center space-x-2 w-32">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white"
              >
                {isMuted || volume[0] === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>

          {/* Status da Transmissão */}
          <div className="flex items-center justify-center space-x-4 p-4 bg-black/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white">TRANSMISSÃO AO VIVO</span>
            </div>
            <div className="text-sm text-gray-400">|</div>
            <div className="text-sm text-gray-400">Qualidade: 320kbps</div>
            <div className="text-sm text-gray-400">|</div>
            <div className="text-sm text-gray-400">Latência: 2.3s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
