
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Volume2 } from 'lucide-react';

interface CurrentTrack {
  title: string;
  artist: string;
  duration: number;
  elapsed: number;
}

interface CurrentTrackDisplayProps {
  currentTrack: CurrentTrack;
  audioLevel: number;
}

const CurrentTrackDisplay: React.FC<CurrentTrackDisplayProps> = ({
  currentTrack,
  audioLevel
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 rounded-lg bg-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-white">Tocando Agora</h3>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-radio-cyan" />
          <div className="w-16 h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-100"
              style={{ width: `${audioLevel}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-xl font-bold text-white">{currentTrack.title}</p>
        <p className="text-gray-400">por {currentTrack.artist}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{formatTime(currentTrack.elapsed)}</span>
          <Progress 
            value={(currentTrack.elapsed / currentTrack.duration) * 100} 
            className="w-64 h-1"
          />
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentTrackDisplay;
