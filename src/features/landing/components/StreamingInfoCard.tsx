
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Radio, 
  Wifi,
  Brain,
  Server,
  Mic2,
  Crown
} from 'lucide-react';

const StreamingInfoCard: React.FC = () => {
  return (
    <Card className="backdrop-blur-md bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Radio className="w-5 h-5 text-purple-400" />
          <span>Transmissão Oscar de IA - Sistema Autogerenciável</span>
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            <Wifi className="w-3 h-3 mr-1" />
            Auto 24/7
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="font-medium flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Transmitindo 24/7
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Qualidade</p>
            <p className="font-medium text-purple-400">Ultra HD 320kbps</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Latência</p>
            <p className="font-medium text-green-400">~67ms</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Uptime</p>
            <p className="font-medium text-yellow-400">99.98%</p>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Brain className="w-3 h-3 mr-1" />
            IA Autogerenciável
          </Badge>
          <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            <Wifi className="w-3 h-3 mr-1" />
            Início Automático
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            <Server className="w-3 h-3 mr-1" />
            Zero Intervenção
          </Badge>
          <Badge variant="secondary" className="bg-pink-500/20 text-pink-400 border-pink-500/30">
            <Mic2 className="w-3 h-3 mr-1" />
            Voz Clonada
          </Badge>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Crown className="w-3 h-3 mr-1" />
            Oscar IA
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamingInfoCard;
