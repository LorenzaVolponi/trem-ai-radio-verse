
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
  Zap, 
  Play, 
  Pause, 
  Volume2, 
  Activity,
  Brain,
  Headphones,
  Waveform,
  Settings,
  TrendingUp,
  Users,
  Clock,
  Server,
  Cpu
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AudioEngineState {
  isLive: boolean;
  audioQuality: string;
  latency: number;
  voiceModel: string;
  musicGeneration: boolean;
  realTimeProcessing: boolean;
  adaptiveContent: boolean;
  emotionalTone: number;
  audienceEngagement: number;
}

const AdvancedAudioEngine = () => {
  const [engineState, setEngineState] = useState<AudioEngineState>({
    isLive: true,
    audioQuality: '320kbps',
    latency: 85,
    voiceModel: 'VITS-Premium',
    musicGeneration: true,
    realTimeProcessing: true,
    adaptiveContent: true,
    emotionalTone: 75,
    audienceEngagement: 87
  });

  const [audioMetrics, setAudioMetrics] = useState({
    inputLevel: 0,
    outputLevel: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    networkLatency: 0
  });

  const [currentProgram, setCurrentProgram] = useState({
    name: 'Programa Matinal IA',
    host: 'Voz Aurora',
    genre: 'Variedades',
    listeners: 1847,
    duration: '02:15:30'
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const { toast } = useToast();

  // Real-time audio metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioMetrics(prev => ({
        inputLevel: Math.random() * 100,
        outputLevel: Math.random() * 100,
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(75, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkLatency: Math.max(50, Math.min(150, prev.networkLatency + (Math.random() - 0.5) * 20))
      }));

      setEngineState(prev => ({
        ...prev,
        latency: Math.max(50, Math.min(120, prev.latency + (Math.random() - 0.5) * 10)),
        audienceEngagement: Math.max(60, Math.min(100, prev.audienceEngagement + (Math.random() - 0.5) * 3))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleLiveMode = () => {
    setEngineState(prev => ({ ...prev, isLive: !prev.isLive }));
    toast({
      title: engineState.isLive ? "Modo ao vivo desativado" : "Modo ao vivo ativado",
      description: engineState.isLive ? "Sistema em modo programado" : "Transmissão ao vivo iniciada",
    });
  };

  const switchVoiceModel = (model: string) => {
    setEngineState(prev => ({ ...prev, voiceModel: model }));
    toast({
      title: "Modelo de voz alterado",
      description: `Agora usando: ${model}`,
    });
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return 'text-green-400';
    if (latency < 200) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Main Audio Control */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-radio-purple" />
              <span>Engine de Áudio Avançado</span>
            </div>
            <div className="flex items-center space-x-2">
              {engineState.isLive ? (
                <Badge variant="outline" className="border-red-500/50 text-red-400 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  AO VIVO
                </Badge>
              ) : (
                <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  PROGRAMADO
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={toggleLiveMode}
              size="lg"
              className={`w-16 h-16 rounded-full ${
                engineState.isLive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {engineState.isLive ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Current Program Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-white mb-2">{currentProgram.name}</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Apresentador: {currentProgram.host}</p>
                <p>Gênero: {currentProgram.genre}</p>
                <p>Duração: {currentProgram.duration}</p>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Ouvintes Ativos</span>
                <Users className="w-4 h-4 text-radio-cyan" />
              </div>
              <p className="text-2xl font-bold text-white">{currentProgram.listeners.toLocaleString()}</p>
            </div>
          </div>

          {/* Audio Levels */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Níveis de Áudio</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Input</span>
                  <span>{Math.round(audioMetrics.inputLevel)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${audioMetrics.inputLevel}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Output</span>
                  <span>{Math.round(audioMetrics.outputLevel)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-100"
                    style={{ width: `${audioMetrics.outputLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Models Selection */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-radio-pink" />
            <span>Modelos de Voz IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'VITS-Premium', quality: 'Ultra HD', latency: '50ms', active: true },
              { name: 'Coqui-TTS', quality: 'HD', latency: '75ms', active: false },
              { name: 'Bark-AI', quality: 'HD+', latency: '65ms', active: false },
              { name: 'Tortoise-TTS', quality: 'Studio', latency: '120ms', active: false },
              { name: 'Real-Time Voice', quality: 'Stream', latency: '35ms', active: false },
              { name: 'Emotional-AI', quality: 'Expressiva', latency: '80ms', active: false }
            ].map((voice, index) => (
              <Button
                key={index}
                variant={voice.active ? "default" : "outline"}
                className={`p-3 h-auto flex flex-col items-start ${
                  voice.active 
                    ? 'bg-radio-purple hover:bg-radio-purple/80' 
                    : 'border-white/20 hover:bg-white/10'
                }`}
                onClick={() => switchVoiceModel(voice.name)}
              >
                <span className="font-medium">{voice.name}</span>
                <span className="text-xs text-gray-400">{voice.quality}</span>
                <span className="text-xs text-gray-500">Latência: {voice.latency}</span>
                {voice.active && (
                  <Badge variant="secondary" className="mt-1 bg-white/20">
                    Ativo
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Audio Processing */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-radio-cyan" />
            <span>Processamento IA Avançado</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-radio-green" />
                <span className="text-sm">Geração Musical</span>
              </div>
              <Switch 
                checked={engineState.musicGeneration}
                onCheckedChange={(checked) => 
                  setEngineState({...engineState, musicGeneration: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-radio-purple" />
                <span className="text-sm">Processamento Real-Time</span>
              </div>
              <Switch 
                checked={engineState.realTimeProcessing}
                onCheckedChange={(checked) => 
                  setEngineState({...engineState, realTimeProcessing: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm">Conteúdo Adaptativo</span>
              </div>
              <Switch 
                checked={engineState.adaptiveContent}
                onCheckedChange={(checked) => 
                  setEngineState({...engineState, adaptiveContent: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-radio-pink" />
                <span className="text-sm">Monitor Emocional</span>
              </div>
              <Switch checked={true} />
            </div>
          </div>

          {/* Emotional Tone Control */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Tom Emocional: {engineState.emotionalTone}%
              </label>
              <Slider
                value={[engineState.emotionalTone]}
                onValueChange={(value) => 
                  setEngineState({...engineState, emotionalTone: value[0]})
                }
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Neutro</span>
                <span>Muito Expressivo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-radio-green" />
            <span>Performance do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU</span>
                <span className={`${audioMetrics.cpuUsage < 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {Math.round(audioMetrics.cpuUsage)}%
                </span>
              </div>
              <Progress value={audioMetrics.cpuUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memória</span>
                <span className={`${audioMetrics.memoryUsage < 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {Math.round(audioMetrics.memoryUsage)}%
                </span>
              </div>
              <Progress value={audioMetrics.memoryUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Latência de Rede</span>
                <span className={getLatencyColor(audioMetrics.networkLatency)}>
                  {Math.round(audioMetrics.networkLatency)}ms
                </span>
              </div>
              <Progress value={(audioMetrics.networkLatency / 300) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engajamento</span>
                <span className="text-radio-purple">{engineState.audienceEngagement}%</span>
              </div>
              <Progress value={engineState.audienceEngagement} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAudioEngine;
