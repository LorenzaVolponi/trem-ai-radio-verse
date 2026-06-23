
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Cpu, 
  Radio, 
  Zap, 
  Music, 
  Mic, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Clock,
  Volume2
} from 'lucide-react';

interface AIEngineStatus {
  isActive: boolean;
  systemHealth: number;
  currentTask: string;
  musicGeneration: boolean;
  voiceCloning: boolean;
  audienceAnalysis: boolean;
  contentScheduling: boolean;
  emergencyMode: boolean;
  autonomyLevel: number;
  lastUpdate: string;
}

interface SystemMetrics {
  dailyListeners: number;
  averageListenTime: number;
  organicTraffic: number;
  engagementRate: number;
  contentQuality: number;
  systemUptime: number;
}

const AIRadioEngine = () => {
  const [engineStatus, setEngineStatus] = useState<AIEngineStatus>({
    isActive: true,
    systemHealth: 95,
    currentTask: 'Analyzing audience preferences',
    musicGeneration: true,
    voiceCloning: true,
    audienceAnalysis: true,
    contentScheduling: true,
    emergencyMode: false,
    autonomyLevel: 85,
    lastUpdate: new Date().toISOString()
  });

  const [metrics, setMetrics] = useState<SystemMetrics>({
    dailyListeners: 2847,
    averageListenTime: 47,
    organicTraffic: 1634,
    engagementRate: 73,
    contentQuality: 89,
    systemUptime: 99.8
  });

  const [autoShutdownThreshold] = useState(60); // Desliga se saúde < 60%

  // Simular monitoramento em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setEngineStatus(prev => {
        const newHealth = Math.max(0, Math.min(100, 
          prev.systemHealth + (Math.random() - 0.5) * 5
        ));
        
        // Auto-shutdown logic
        const shouldShutdown = newHealth < autoShutdownThreshold;
        
        return {
          ...prev,
          systemHealth: newHealth,
          emergencyMode: shouldShutdown,
          isActive: shouldShutdown ? false : prev.isActive,
          autonomyLevel: Math.max(0, Math.min(100, 
            prev.autonomyLevel + (Math.random() - 0.5) * 3
          )),
          lastUpdate: new Date().toISOString(),
          currentTask: getRandomTask()
        };
      });

      setMetrics(prev => ({
        ...prev,
        dailyListeners: Math.max(0, prev.dailyListeners + Math.floor((Math.random() - 0.5) * 50)),
        averageListenTime: Math.max(0, prev.averageListenTime + Math.floor((Math.random() - 0.5) * 5)),
        organicTraffic: Math.max(0, prev.organicTraffic + Math.floor((Math.random() - 0.5) * 30)),
        engagementRate: Math.max(0, Math.min(100, prev.engagementRate + (Math.random() - 0.5) * 2)),
        contentQuality: Math.max(0, Math.min(100, prev.contentQuality + (Math.random() - 0.5) * 1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoShutdownThreshold]);

  const getRandomTask = () => {
    const tasks = [
      'Generating new music content',
      'Analyzing audience sentiment',
      'Optimizing playlist sequence',
      'Processing voice cloning',
      'Scheduling content blocks',
      'Monitoring engagement metrics',
      'Adjusting audio quality',
      'Updating social media integration',
      'Generating narrative content',
      'Optimizing for SEO'
    ];
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const toggleEngineStatus = () => {
    if (engineStatus.emergencyMode) {
      // Requer confirmação para reativar em modo emergência
      const confirmed = window.confirm(
        'Sistema em modo emergência. Tem certeza que deseja reativar?'
      );
      if (!confirmed) return;
    }

    setEngineStatus(prev => ({
      ...prev,
      isActive: !prev.isActive,
      emergencyMode: false
    }));
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBadge = (health: number) => {
    if (health >= 80) return { color: 'bg-green-500/20 text-green-400 border-green-500/50', text: 'Excellent' };
    if (health >= 60) return { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', text: 'Warning' };
    return { color: 'bg-red-500/20 text-red-400 border-red-500/50', text: 'Critical' };
  };

  const healthBadge = getHealthBadge(engineStatus.systemHealth);

  return (
    <div className="space-y-6">
      {/* Status Principal */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-radio-purple" />
              <span>AI Radio Engine</span>
              <Badge variant="outline" className={healthBadge.color}>
                {healthBadge.text}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {engineStatus.isActive ? 'Online' : 'Offline'}
              </span>
              <Switch 
                checked={engineStatus.isActive}
                onCheckedChange={toggleEngineStatus}
                disabled={engineStatus.emergencyMode}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Emergency Alert */}
          {engineStatus.emergencyMode && (
            <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-sm font-medium text-red-400">Sistema em Modo Emergência</p>
                <p className="text-xs text-red-300">
                  Saúde do sistema abaixo do limite. Intervenção humana necessária.
                </p>
              </div>
            </div>
          )}

          {/* System Health */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Saúde do Sistema</span>
              <span className={`text-sm font-medium ${getHealthColor(engineStatus.systemHealth)}`}>
                {engineStatus.systemHealth.toFixed(1)}%
              </span>
            </div>
            <Progress value={engineStatus.systemHealth} className="h-2" />
          </div>

          {/* Autonomy Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Nível de Autonomia</span>
              <span className="text-sm font-medium text-radio-purple">
                {engineStatus.autonomyLevel.toFixed(1)}%
              </span>
            </div>
            <Progress value={engineStatus.autonomyLevel} className="h-2" />
          </div>

          {/* Current Task */}
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <Cpu className="w-4 h-4 text-radio-cyan animate-pulse" />
            <div>
              <p className="text-sm font-medium text-white">Tarefa Atual</p>
              <p className="text-xs text-gray-400">{engineStatus.currentTask}</p>
            </div>
          </div>

          {/* AI Modules Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-radio-green" />
                <span className="text-sm">Geração Musical</span>
              </div>
              {engineStatus.musicGeneration ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-radio-pink" />
                <span className="text-sm">Voice Cloning</span>
              </div>
              {engineStatus.voiceCloning ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm">Análise Audiência</span>
              </div>
              {engineStatus.audienceAnalysis ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-radio-blue" />
                <span className="text-sm">Programação</span>
              </div>
              {engineStatus.contentScheduling ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Performance */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-radio-green" />
            <span>Métricas de Sucesso</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-radio-cyan" />
              <p className="text-2xl font-bold text-white">{metrics.dailyListeners.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Ouvintes Diários</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-radio-green" />
              <p className="text-2xl font-bold text-white">{metrics.averageListenTime}min</p>
              <p className="text-sm text-gray-400">Tempo Médio</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-radio-pink" />
              <p className="text-2xl font-bold text-white">{metrics.organicTraffic.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Tráfego Orgânico</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Activity className="w-8 h-8 mx-auto mb-2 text-radio-purple" />
              <p className="text-2xl font-bold text-white">{metrics.engagementRate}%</p>
              <p className="text-sm text-gray-400">Engajamento</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Volume2 className="w-8 h-8 mx-auto mb-2 text-radio-blue" />
              <p className="text-2xl font-bold text-white">{metrics.contentQuality}%</p>
              <p className="text-sm text-gray-400">Qualidade</p>
            </div>

            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Radio className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold text-white">{metrics.systemUptime}%</p>
              <p className="text-sm text-gray-400">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Pipeline Status */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-radio-purple" />
            <span>Pipeline de IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 'Análise de Audiência', status: 'completed', progress: 100 },
              { step: 'Geração de Conteúdo', status: 'in-progress', progress: 75 },
              { step: 'Voice Synthesis', status: 'in-progress', progress: 60 },
              { step: 'Mixagem Automática', status: 'pending', progress: 20 },
              { step: 'Transmissão', status: 'ready', progress: 100 }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-white">{item.step}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.status === 'completed' ? 'border-green-500/50 text-green-400' :
                        item.status === 'in-progress' ? 'border-yellow-500/50 text-yellow-400' :
                        item.status === 'ready' ? 'border-blue-500/50 text-blue-400' :
                        'border-gray-500/50 text-gray-400'
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <Progress value={item.progress} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRadioEngine;
