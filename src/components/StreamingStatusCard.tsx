
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Radio, Brain, Wifi } from 'lucide-react';

interface StreamingStatusCardProps {
  isLive: boolean;
  autoMode: boolean;
  onToggleAutoMode: () => void;
}

const StreamingStatusCard: React.FC<StreamingStatusCardProps> = ({
  isLive,
  autoMode,
  onToggleAutoMode
}) => {
  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-radio-purple" />
            <span>Sistema de Transmissão Automática</span>
          </div>
          <div className="flex items-center space-x-2">
            {isLive ? (
              <Badge variant="outline" className="border-red-500/50 text-red-400 animate-pulse">
                <Wifi className="w-3 h-3 mr-1" />
                AO VIVO 24/7
              </Badge>
            ) : (
              <Badge variant="outline" className="border-gray-500/50 text-gray-400">
                OFFLINE
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-radio-purple/10 to-radio-cyan/10 border border-white/10">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-radio-purple" />
            <div>
              <p className="font-medium text-white">Modo Autogerenciável</p>
              <p className="text-sm text-gray-400">Sistema totalmente autônomo</p>
            </div>
          </div>
          <Switch 
            checked={autoMode}
            onCheckedChange={onToggleAutoMode}
            className="data-[state=checked]:bg-radio-purple"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamingStatusCard;
