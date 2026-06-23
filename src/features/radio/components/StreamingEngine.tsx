
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Radio, 
  Mic, 
  Music, 
  Users, 
  Activity,
  Volume2,
  Play,
  Pause,
  SkipForward,
  Settings,
  Zap,
  Brain,
  Heart,
  TrendingUp,
  Eye,
  Clock,
  Server
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface StreamMetrics {
  listeners: number;
  bitrate: number;
  uptime: number;
  cpu_usage: number;
  memory_usage: number;
  bandwidth: number;
}

interface AudioLevel {
  left: number;
  right: number;
}

const StreamingEngine = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [streamMetrics, setStreamMetrics] = useState<StreamMetrics>({
    listeners: 1247,
    bitrate: 320,
    uptime: 86400,
    cpu_usage: 45,
    memory_usage: 62,
    bandwidth: 8.5
  });
  const [audioLevels, setAudioLevels] = useState<AudioLevel>({ left: 0, right: 0 });
  const [streamQuality, setStreamQuality] = useState([320]);
  const [bufferSize, setBufferSize] = useState([8]);
  const [crossfadeDuration, setCrossfadeDuration] = useState([3]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const { toast } = useToast();

  // Simular métricas de streaming em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamMetrics(prev => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 10) - 5,
        cpu_usage: Math.max(20, Math.min(90, prev.cpu_usage + Math.random() * 10 - 5)),
        memory_usage: Math.max(30, Math.min(85, prev.memory_usage + Math.random() * 8 - 4)),
        bandwidth: Math.max(5, Math.min(15, prev.bandwidth + Math.random() * 2 - 1)),
        uptime: prev.uptime + 1
      }));

      // Simular níveis de áudio
      setAudioLevels({
        left: Math.random() * 100,
        right: Math.random() * 100
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming);
    toast({
      title: isStreaming ? "Stream Pausado" : "Stream Iniciado",
      description: isStreaming ? "Transmissão pausada" : "Transmissão iniciada com sucesso",
    });
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (value: number, thresholds: number[]) => {
    if (value < thresholds[0]) return 'text-green-400';
    if (value < thresholds[1]) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Status Principal do Stream */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-radio-purple" />
              <span>Engine de Transmissão</span>
            </div>
            <div className="flex items-center space-x-2">
              {isStreaming ? (
                <Badge variant="outline" className="border-green-500/50 text-green-400 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  AO VIVO
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-500/50 text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  OFFLINE
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controles Principais */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={toggleStreaming}
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isStreaming 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isStreaming ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </Button>
          </div>

          {/* Métricas em Tempo Real */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Users className="w-6 h-6 mx-auto mb-2 text-radio-cyan" />
              <p className="text-lg font-bold text-white">{streamMetrics.listeners.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Ouvintes</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Activity className="w-6 h-6 mx-auto mb-2 text-radio-green" />
              <p className="text-lg font-bold text-white">{streamMetrics.bitrate}kbps</p>
              <p className="text-xs text-gray-400">Qualidade</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Clock className="w-6 h-6 mx-auto mb-2 text-radio-pink" />
              <p className="text-lg font-bold text-white">{formatUptime(streamMetrics.uptime)}</p>
              <p className="text-xs text-gray-400">Uptime</p>
            </div>
          </div>

          {/* Níveis de Áudio */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Níveis de Áudio</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-400 w-8">L</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${audioLevels.left}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8">{Math.round(audioLevels.left)}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-400 w-8">R</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${audioLevels.right}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8">{Math.round(audioLevels.right)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Streaming */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-radio-cyan" />
            <span>Configurações de Stream</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Modo Automático */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-radio-purple" />
              <span className="text-sm">Modo Automático</span>
            </div>
            <Switch 
              checked={autoMode}
              onCheckedChange={setAutoMode}
            />
          </div>

          {/* Controles de Qualidade */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Qualidade do Stream: {streamQuality[0]}kbps
              </label>
              <Slider
                value={streamQuality}
                onValueChange={setStreamQuality}
                max={320}
                min={64}
                step={32}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Buffer: {bufferSize[0]}s
              </label>
              <Slider
                value={bufferSize}
                onValueChange={setBufferSize}
                max={30}
                min={2}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Crossfade: {crossfadeDuration[0]}s
              </label>
              <Slider
                value={crossfadeDuration}
                onValueChange={setCrossfadeDuration}
                max={10}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoramento do Sistema */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-radio-green" />
            <span>Monitoramento do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU</span>
                <span className={getStatusColor(streamMetrics.cpu_usage, [60, 80])}>
                  {streamMetrics.cpu_usage}%
                </span>
              </div>
              <Progress value={streamMetrics.cpu_usage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memória</span>
                <span className={getStatusColor(streamMetrics.memory_usage, [70, 85])}>
                  {streamMetrics.memory_usage}%
                </span>
              </div>
              <Progress value={streamMetrics.memory_usage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bandwidth</span>
                <span className="text-cyan-400">{streamMetrics.bandwidth.toFixed(1)} Mbps</span>
              </div>
              <Progress value={(streamMetrics.bandwidth / 15) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Latência</span>
                <span className="text-green-400">2.3s</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamingEngine;
