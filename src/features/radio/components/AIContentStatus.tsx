
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Mic, Music, Globe, Heart, Zap, Radio } from 'lucide-react';

const AIContentStatus: React.FC = () => {
  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-radio-purple" />
          <span>IA de Conteúdo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Mic className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">Clonagem de Voz</span>
            </div>
            <p className="text-xs text-gray-400">VITS & Coqui TTS Ativo</p>
            <Badge variant="outline" className="border-green-500/50 text-green-400 mt-1">
              <Heart className="w-2 h-2 mr-1" />
              Online
            </Badge>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Music className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Geração Musical</span>
            </div>
            <p className="text-xs text-gray-400">MusicGen & Suno</p>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400 mt-1">
              <Zap className="w-2 h-2 mr-1" />
              Gerando
            </Badge>
          </div>

          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Streaming Global</span>
            </div>
            <p className="text-xs text-gray-400">Icecast Server</p>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400 mt-1">
              <Radio className="w-2 h-2 mr-1" />
              Transmitindo
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIContentStatus;
