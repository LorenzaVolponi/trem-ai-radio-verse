
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RealTimeStatsProps {
  currentListeners: number;
  isDemo?: boolean;
}

const RealTimeStats: React.FC<RealTimeStatsProps> = ({ currentListeners, isDemo = false }) => {
  return (
    <Card className="backdrop-blur-md bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-sm flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span>Métricas em Tempo Real</span>
          {isDemo && <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">Demonstração</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Ouvintes Globais</span>
          <span className="text-sm font-medium text-cyan-400">{currentListeners.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Tempo Médio</span>
          <span className="text-sm font-medium text-green-400">67 min</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Interações IA</span>
          <span className="text-sm font-medium text-pink-400">1.247</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Países Ativos</span>
          <span className="text-sm font-medium text-purple-400">89</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">IA Performance</span>
          <span className="text-sm font-medium text-yellow-400">99.7% demo</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Ranking Mundial</span>
          <span className="text-sm font-medium text-gray-300 flex items-center">
            <Info className="w-3 h-3 mr-1" />
            Não auditado
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeStats;
