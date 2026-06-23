
import React from 'react';
import { Users, Activity, Zap, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StreamingMetricsProps {
  listeners: number;
  bitrate: number;
  quality: string;
  latency: number;
  uptime: number;
  isDemo?: boolean;
}

const StreamingMetrics: React.FC<StreamingMetricsProps> = ({
  listeners,
  bitrate,
  quality,
  latency,
  uptime,
  isDemo = false
}) => {
  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center p-3 rounded-lg bg-white/5">
        <Users className="w-6 h-6 mx-auto mb-2 text-radio-cyan" />
        <p className="text-lg font-bold text-white">{listeners.toLocaleString()}</p>
        <p className="text-xs text-gray-400">Ouvintes Ativos</p>
        {isDemo && <Badge variant="outline" className="mt-2 border-yellow-500/50 text-yellow-400">Demonstração</Badge>}
      </div>
      
      <div className="text-center p-3 rounded-lg bg-white/5">
        <Activity className="w-6 h-6 mx-auto mb-2 text-radio-green" />
        <p className="text-lg font-bold text-white">{bitrate}kbps</p>
        <p className="text-xs text-gray-400">{quality}</p>
      </div>
      
      <div className="text-center p-3 rounded-lg bg-white/5">
        <Zap className="w-6 h-6 mx-auto mb-2 text-radio-pink" />
        <p className="text-lg font-bold text-white">{latency}ms</p>
        <p className="text-xs text-gray-400">Latência</p>
      </div>
      
      <div className="text-center p-3 rounded-lg bg-white/5">
        <Clock className="w-6 h-6 mx-auto mb-2 text-radio-purple" />
        <p className="text-lg font-bold text-white">{formatUptime(uptime)}</p>
        <p className="text-xs text-gray-400">Uptime</p>
      </div>
    </div>
  );
};

export default StreamingMetrics;
