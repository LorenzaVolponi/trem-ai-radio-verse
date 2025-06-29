
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Radio, 
  Mic, 
  Music, 
  Play, 
  Pause, 
  Users, 
  Activity,
  Zap,
  Brain,
  Volume2,
  Wifi,
  Server,
  Globe,
  Heart,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StreamingState {
  isLive: boolean;
  autoMode: boolean;
  currentTrack: {
    title: string;
    artist: string;
    duration: number;
    elapsed: number;
  };
  listeners: number;
  quality: string;
  bitrate: number;
  latency: number;
}

const AutoStreamingEngine = () => {
  const [streamState, setStreamState] = useState<StreamingState>({
    isLive: true,
    autoMode: true,
    currentTrack: {
      title: "Voz do Amanhã Premium",
      artist: "IA Vocal Elite",
      duration: 255,
      elapsed: 0
    },
    listeners: 1847,
    quality: 'Ultra HD',
    bitrate: 320,
    latency: 78
  });

  const [audioLevel, setAudioLevel] = useState(0);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    bandwidth: 8.5,
    uptime: 86400
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const startAutoStreaming = useCallback(() => {
    setStreamState(prev => ({ ...prev, isLive: true }));
    toast({
      title: "Transmissão Iniciada Automaticamente",
      description: "Sistema autogerenciável ativo 24/7",
    });
  }, [toast]);

  // Auto-start streaming when component mounts or auto mode changes
  useEffect(() => {
    if (streamState.autoMode) {
      startAutoStreaming();
    }
  }, [streamState.autoMode, startAutoStreaming]);

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamState(prev => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 20) - 10,
        latency: Math.max(50, Math.min(120, prev.latency + (Math.random() - 0.5) * 10)),
        currentTrack: {
          ...prev.currentTrack,
          elapsed: prev.currentTrack.elapsed + 1
        }
      }));

      setAudioLevel(Math.random() * 100);
      
      setSystemHealth(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 3)),
        bandwidth: Math.max(5, Math.min(15, prev.bandwidth + (Math.random() - 0.5) * 1)),
        uptime: prev.uptime + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const toggleAutoMode = useCallback(() => {
    setStreamState(prev => ({ ...prev, autoMode: !prev.autoMode }));
    if (!streamState.autoMode) {
      startAutoStreaming();
    }
  }, [streamState.autoMode, startAutoStreaming]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Main Streaming Control */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-radio-purple" />
              <span>Sistema de Transmissão Automática</span>
            </div>
            <div className="flex items-center space-x-2">
              {streamState.isLive ? (
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
        <CardContent className="space-y-6">
          {/* Auto Mode Control */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-radio-purple/10 to-radio-cyan/10 border border-white/10">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-radio-purple" />
              <div>
                <p className="font-medium text-white">Modo Autogerenciável</p>
                <p className="text-sm text-gray-400">Sistema totalmente autônomo</p>
              </div>
            </div>
            <Switch 
              checked={streamState.autoMode}
              onCheckedChange={toggleAutoMode}
              className="data-[state=checked]:bg-radio-purple"
            />
          </div>

          {/* Current Track Display */}
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
              <p className="text-xl font-bold text-white">{streamState.currentTrack.title}</p>
              <p className="text-gray-400">por {streamState.currentTrack.artist}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{formatTime(streamState.currentTrack.elapsed)}</span>
                <Progress 
                  value={(streamState.currentTrack.elapsed / streamState.currentTrack.duration) * 100} 
                  className="w-64 h-1"
                />
                <span>{formatTime(streamState.currentTrack.duration)}</span>
              </div>
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Users className="w-6 h-6 mx-auto mb-2 text-radio-cyan" />
              <p className="text-lg font-bold text-white">{streamState.listeners.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Ouvintes Ativos</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Activity className="w-6 h-6 mx-auto mb-2 text-radio-green" />
              <p className="text-lg font-bold text-white">{streamState.bitrate}kbps</p>
              <p className="text-xs text-gray-400">{streamState.quality}</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Zap className="w-6 h-6 mx-auto mb-2 text-radio-pink" />
              <p className="text-lg font-bold text-white">{streamState.latency}ms</p>
              <p className="text-xs text-gray-400">Latência</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Clock className="w-6 h-6 mx-auto mb-2 text-radio-purple" />
              <p className="text-lg font-bold text-white">{formatUptime(systemHealth.uptime)}</p>
              <p className="text-xs text-gray-400">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health Monitor */}
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

      {/* AI Voice & Music Generation Status */}
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
    </div>
  );
};

export default AutoStreamingEngine;
