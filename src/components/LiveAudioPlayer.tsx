
import React, { useState, useEffect } from 'react';
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
  Heart,
  Zap
} from 'lucide-react';
import { BrandBadge, GradientPanel, SectionHeading } from '@/components/brand';

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
}

const LiveAudioPlayer: React.FC<LiveAudioPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  audioLevel
}) => {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(20).fill(0));

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisualizerBars(prev => 
          prev.map(() => Math.random() * 100)
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTrack.elapsed / currentTrack.duration) * 100;

  return (
    <GradientPanel variant="hero" className="animate-brand-fade-up p-6">
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
            <BrandBadge tone="live" icon={<Wifi className="w-3 h-3" />}>
              AO VIVO 24/7
            </BrandBadge>
            <BrandBadge tone="primary" icon={<Brain className="w-3 h-3" />}>
              Curadoria IA
            </BrandBadge>
          </div>
          
          <SectionHeading
            className="mb-4 items-center text-center md:block"
            eyebrow="Rádio premium autogerenciável"
            title={<span className="bg-gradient-to-r from-purple-300 to-cyan-200 bg-clip-text text-transparent">{currentTrack.title}</span>}
            description={<span className="text-purple-200">{currentTrack.artist}</span>}
          />
          
          {/* Audio Visualizer */}
          <div className="flex items-end justify-center space-x-1 h-16 mb-4">
            {visualizerBars.map((height, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-radio-purple to-radio-cyan rounded-full transition-all duration-100 w-2"
                style={{ 
                  height: isPlaying ? `${Math.max(height * 0.6, 10)}%` : '10%',
                  opacity: isPlaying ? 1 : 0.3
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
              onClick={onPlayPause}
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
              <span>Ultra HD 320kbps</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Latência: ~67ms</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>IA Performance: 99.7%</span>
            </div>
          </div>
        </div>
    </GradientPanel>
  );
};

export default LiveAudioPlayer;
