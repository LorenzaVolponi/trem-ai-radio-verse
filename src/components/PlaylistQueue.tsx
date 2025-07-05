
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain } from 'lucide-react';

const PlaylistQueue: React.FC = () => {
  const queueTracks = [
    { time: "Agora", title: "Voz do Amanhã Premium", artist: "IA Vocal Elite", duration: "4:15", isLive: true, aiGenerated: true },
    { time: "14:36", title: "Flash News IA Oscar", artist: "Locução Neural Premium", duration: "2:30", aiGenerated: true },
    { time: "14:39", title: "Batida Cósmica 2.0", artist: "MusicGen Ultra Oscar", duration: "3:28", aiGenerated: true },
    { time: "14:42", title: "Harmonia Sintética Premium", artist: "AI Composer Oscar", duration: "3:45", aiGenerated: true },
    { time: "14:46", title: "Interação Ouvintes IA", artist: "ChatBot Oscar Premium", duration: "5:00", aiGenerated: true }
  ];

  return (
    <Card className="backdrop-blur-md bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Fila IA Oscar - Autogerenciável</span>
          </div>
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            <Brain className="w-3 h-3 mr-1" />
            Auto
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {queueTracks.map((track, index) => (
          <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            track.isLive ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5 hover:bg-white/10'
          }`}>
            <div className="text-xs text-gray-400 w-12">
              {track.isLive ? (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                  AO VIVO
                </div>
              ) : track.time}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium truncate">{track.title}</p>
                {track.aiGenerated && (
                  <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-xs">
                    <Brain className="w-2 h-2 mr-1" />
                    IA
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
            <div className="text-xs text-gray-400">{track.duration}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlaylistQueue;
