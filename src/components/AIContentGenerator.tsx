
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Mic, 
  Music, 
  Zap, 
  Bot,
  Volume2,
  Play,
  Pause,
  Shuffle,
  RefreshCw,
  Headphones,
  AudioWaveform
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceModel {
  name: string;
  type: string;
  status: 'active' | 'loading' | 'offline';
  quality: string;
  latency: string;
}

interface GeneratedContent {
  id: string;
  type: 'voice' | 'music' | 'script';
  title: string;
  content: string;
  duration: number;
  timestamp: Date;
}

const AIContentGenerator = () => {
  const [voiceModels] = useState<VoiceModel[]>([
    { name: 'VITS Premium', type: 'Neural TTS', status: 'active', quality: 'Ultra HD', latency: '50ms' },
    { name: 'Coqui TTS', type: 'Multi-lang', status: 'active', quality: 'HD', latency: '75ms' },
    { name: 'Bark AI', type: 'Emotional', status: 'active', quality: 'HD+', latency: '65ms' },
    { name: 'Tortoise TTS', type: 'Studio', status: 'loading', quality: 'Studio', latency: '120ms' }
  ]);

  const [musicGenerators] = useState([
    { name: 'MusicGen', status: 'active', model: 'Facebook AI' },
    { name: 'Riffusion', status: 'active', model: 'Stability AI' },
    { name: 'AudioGen', status: 'active', model: 'Meta' },
    { name: 'Suno Integration', status: 'active', model: 'Suno API' }
  ]);

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);

  const { toast } = useToast();

  const generateAutomaticContent = useCallback(() => {
    const contentTypes = ['voice', 'music', 'script'] as const;
    const type = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    
    const newContent: GeneratedContent = {
      id: `content_${Date.now()}`,
      type,
      title: getContentTitle(type),
      content: getContentDescription(type),
      duration: Math.floor(Math.random() * 300) + 60,
      timestamp: new Date()
    };

    setGeneratedContent(prev => [newContent, ...prev.slice(0, 9)]);
  }, []);

  // Simulate content generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        generateAutomaticContent();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [generateAutomaticContent]);

  const getContentTitle = (type: string) => {
    const titles = {
      voice: ['Vinheta Matinal', 'Apresentação News', 'Transição Musical', 'Interação Ouvinte'],
      music: ['Batida Cósmica', 'Harmonia Sintética', 'Ritmo Neural', 'Melodia Quântica'],
      script: ['Roteiro Noticioso', 'Segmento Cultural', 'Papo Descontraído', 'Info Meteorológica']
    };
    return titles[type][Math.floor(Math.random() * titles[type].length)];
  };

  const getContentDescription = (type: string) => {
    const descriptions = {
      voice: 'Locução gerada com voz clonada usando modelo VITS Premium',
      music: 'Música original criada por IA com MusicGen e refinada',
      script: 'Roteiro dinâmico gerado por LLM para programação'
    };
    return descriptions[type];
  };

  const generateCustomContent = async () => {
    if (!customPrompt.trim()) {
      toast({
        title: "Prompt necessário",
        description: "Digite um prompt para gerar conteúdo personalizado",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsGenerating(false);
          
          // Add generated content
          const newContent: GeneratedContent = {
            id: `custom_${Date.now()}`,
            type: 'voice',
            title: 'Conteúdo Personalizado',
            content: `Gerado a partir do prompt: "${customPrompt}"`,
            duration: 180,
            timestamp: new Date()
          };

          setGeneratedContent(prev => [newContent, ...prev.slice(0, 9)]);
          setCustomPrompt('');
          
          toast({
            title: "Conteúdo Gerado!",
            description: "Seu conteúdo personalizado foi criado com sucesso",
          });
          
          return 0;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-500/50';
      case 'loading': return 'text-yellow-400 border-yellow-500/50';
      case 'offline': return 'text-red-400 border-red-500/50';
      default: return 'text-gray-400 border-gray-500/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'script': return <Bot className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Models Status */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-radio-purple" />
            <span>Modelos de Voz IA</span>
            <Badge variant="outline" className="border-radio-green/50 text-radio-green">
              Open Source
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voiceModels.map((model, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{model.name}</h3>
                  <Badge variant="outline" className={getStatusColor(model.status)}>
                    {model.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Tipo: {model.type}</p>
                  <p>Qualidade: {model.quality}</p>
                  <p>Latência: {model.latency}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {model.status === 'active' ? 'Pronto para uso' : 'Carregando...'}
                  </span>
                  {model.status === 'active' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Music Generation */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Music className="w-5 h-5 text-radio-cyan" />
            <span>Geração Musical</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {musicGenerators.map((generator, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-white/5">
                <Headphones className="w-6 h-6 mx-auto mb-2 text-radio-cyan" />
                <p className="text-sm font-medium text-white">{generator.name}</p>
                <p className="text-xs text-gray-400">{generator.model}</p>
                <Badge variant="outline" className="border-green-500/50 text-green-400 mt-1">
                  {generator.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Content Generation */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-radio-pink" />
            <span>Gerador Personalizado</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Prompt para IA</label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Descreva o conteúdo que deseja gerar (ex: 'Crie uma vinheta energética para programa matinal')"
              className="glass-effect border-white/20 bg-white/5 text-white placeholder-gray-400 min-h-20"
            />
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gerando conteúdo...</span>
                <span>{Math.round(generationProgress)}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>
          )}

          <Button 
            onClick={generateCustomContent}
            disabled={isGenerating || !customPrompt.trim()}
            className="w-full bg-radio-pink hover:bg-radio-pink/80"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Gerar Conteúdo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content History */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-radio-green" />
              <span>Conteúdo Gerado Recentemente</span>
            </div>
            <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
              {generatedContent.length} itens
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {generatedContent.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Nenhum conteúdo gerado ainda</p>
                <p className="text-sm text-gray-500">O sistema gerará conteúdo automaticamente</p>
              </div>
            ) : (
              generatedContent.map((content) => (
                <div key={content.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-radio-purple to-radio-cyan flex items-center justify-center">
                      {getTypeIcon(content.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{content.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{content.content}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{formatDuration(content.duration)}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {content.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGenerator;
