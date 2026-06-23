
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Server } from 'lucide-react';

interface SystemHealth {
  cpu: number;
  memory: number;
  bandwidth: number;
  uptime: number;
}

interface SystemHealthMonitorProps {
  systemHealth: SystemHealth;
}

const SystemHealthMonitor: React.FC<SystemHealthMonitorProps> = ({
  systemHealth
}) => {
  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Server className="w-5 h-5 text-radio-green" />
          <span>Saúde do Sistema</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>CPU</span>
              <span className={`${systemHealth.cpu < 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                {Math.round(systemHealth.cpu)}%
              </span>
            </div>
            <Progress value={systemHealth.cpu} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Memória</span>
              <span className={`${systemHealth.memory < 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                {Math.round(systemHealth.memory)}%
              </span>
            </div>
            <Progress value={systemHealth.memory} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Bandwidth</span>
              <span className="text-cyan-400">{systemHealth.bandwidth.toFixed(1)} Mbps</span>
            </div>
            <Progress value={(systemHealth.bandwidth / 15) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Streaming</span>
              <span className="text-green-400">Optimal</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthMonitor;
