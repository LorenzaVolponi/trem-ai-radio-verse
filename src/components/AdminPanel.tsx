
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Mic, 
  Music, 
  Radio, 
  Zap, 
  Upload, 
  Download,
  Play,
  Pause,
  Volume2,
  Users,
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';

const AdminPanel = () => {
  const [aiSettings, setAiSettings] = useState({
    voiceCloning: true,
    musicGeneration: true,
    autoScheduling: true,
    interactiveMode: true,
    emotionalTone: [75],
    creativityLevel: [85],
    responseSpeed: [60]
  });

  const [systemStatus, setSystemStatus] = useState({
    streaming: 'online',
    aiEngine: 'running',
    database: 'healthy',
    bandwidth: 'optimal'
  });

  const [currentAIVoice, setCurrentAIVoice] = useState('Voz Creator');

  return (
    <div className="space-y-6">
      {/* Status do Sistema */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-radio-green" />
            <span>Status do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-500/10">
              <Server className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-sm font-medium text-white">Streaming</p>
              <Badge variant="outline" className="border-green-500/50 text-green-400 mt-1">
                Online
              </Badge>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-blue-500/10">
              <Cpu className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-sm font-medium text-white">IA Engine</p>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 mt-1">
                Running
              </Badge>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-purple-500/10">
              <Database className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-sm font-medium text-white">Database</p>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 mt-1">
                Healthy
              </Badge>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-cyan-500/10">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <p className="text-sm font-medium text-white">Bandwidth</p>
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 mt-1">
                Optimal
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles de IA */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-radio-purple" />
            <span>Controles de IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Switches Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm">Clonagem de Voz</span>
              </div>
              <Switch 
                checked={aiSettings.voiceCloning}
                onCheckedChange={(checked) => 
                  setAiSettings({...aiSettings, voiceCloning: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-radio-pink" />
                <span className="text-sm">Geração Musical</span>
              </div>
              <Switch 
                checked={aiSettings.musicGeneration}
                onCheckedChange={(checked) => 
                  setAiSettings({...aiSettings, musicGeneration: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-radio-green" />
                <span className="text-sm">Agendamento Auto</span>
              </div>
              <Switch 
                checked={aiSettings.autoScheduling}
                onCheckedChange={(checked) => 
                  setAiSettings({...aiSettings, autoScheduling: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-radio-blue" />
                <span className="text-sm">Modo Interativo</span>
              </div>
              <Switch 
                checked={aiSettings.interactiveMode}
                onCheckedChange={(checked) => 
                  setAiSettings({...aiSettings, interactiveMode: checked})
                }
              />
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Controles Avançados */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Tom Emocional: {aiSettings.emotionalTone[0]}%
              </label>
              <Slider
                value={aiSettings.emotionalTone}
                onValueChange={(value) => 
                  setAiSettings({...aiSettings, emotionalTone: value})
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

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Nível de Criatividade: {aiSettings.creativityLevel[0]}%
              </label>
              <Slider
                value={aiSettings.creativityLevel}
                onValueChange={(value) => 
                  setAiSettings({...aiSettings, creativityLevel: value})
                }
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Conservador</span>
                <span>Experimental</span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Velocidade de Resposta: {aiSettings.responseSpeed[0]}%
              </label>
              <Slider
                value={aiSettings.responseSpeed}
                onValueChange={(value) => 
                  setAiSettings({...aiSettings, responseSpeed: value})
                }
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Reflexivo</span>
                <span>Instantâneo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento de Conteúdo */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-radio-cyan" />
            <span>Gerenciamento de Conteúdo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-radio-purple hover:bg-radio-purple/80 justify-start">
              <Upload className="w-4 h-4 mr-2" />
              Upload Nova Música
            </Button>
            
            <Button variant="outline" className="border-radio-cyan/50 justify-start">
              <Mic className="w-4 h-4 mr-2" />
              Treinar Nova Voz
            </Button>
            
            <Button variant="outline" className="border-radio-green/50 justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Configurar Programação
            </Button>
            
            <Button variant="outline" className="border-radio-pink/50 justify-start">
              <Download className="w-4 h-4 mr-2" />
              Exportar Dados
            </Button>
          </div>

          <Separator className="bg-white/10" />

          {/* Prompt para IA */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Prompt Personalizado para IA</label>
            <Textarea 
              placeholder="Digite instruções específicas para a IA da rádio..."
              className="glass-effect border-white/20 bg-white/5 text-white placeholder-gray-400 min-h-20"
            />
            <Button className="bg-radio-purple hover:bg-radio-purple/80">
              <Zap className="w-4 h-4 mr-2" />
              Aplicar Prompt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seleção de Voz IA Ativa */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-radio-pink" />
            <span>Voz IA Ativa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Voz Aurora', personality: 'Energética', active: false },
              { name: 'Voz Creator', personality: 'Criativa', active: true },
              { name: 'Voz Nexus', personality: 'Informativa', active: false },
              { name: 'Voz Harmony', personality: 'Harmoniosa', active: false },
              { name: 'Voz Zen', personality: 'Relaxante', active: false },
              { name: 'Voz Prime', personality: 'Profissional', active: false }
            ].map((voice, index) => (
              <Button
                key={index}
                variant={voice.active ? "default" : "outline"}
                className={`p-3 h-auto flex flex-col items-start ${
                  voice.active 
                    ? 'bg-radio-purple hover:bg-radio-purple/80' 
                    : 'border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setCurrentAIVoice(voice.name)}
              >
                <span className="font-medium">{voice.name}</span>
                <span className="text-xs text-gray-400">{voice.personality}</span>
                {voice.active && (
                  <Badge variant="secondary" className="mt-1 bg-white/20">
                    Ativa
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
