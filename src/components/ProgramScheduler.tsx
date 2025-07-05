
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Music,
  Mic,
  Radio,
  Zap,
  Users,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Program {
  id: string;
  name: string;
  host: string;
  startTime: string;
  duration: number;
  genre: string;
  type: 'live' | 'ai-generated' | 'music-only';
  status: 'active' | 'scheduled' | 'completed';
  listeners?: number;
  engagement?: number;
}

type ProgramType = Program["type"];

const ProgramScheduler = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'Despertar com IA',
      host: 'Voz Aurora',
      startTime: '06:00',
      duration: 180,
      genre: 'Matinal',
      type: 'ai-generated',
      status: 'completed',
      listeners: 1247,
      engagement: 87
    },
    {
      id: '2',
      name: 'Música Contínua IA',
      host: 'Sistema Automático',
      startTime: '09:00',
      duration: 120,
      genre: 'Variedades',
      type: 'music-only',
      status: 'active',
      listeners: 2341,
      engagement: 92
    },
    {
      id: '3',
      name: 'Programa Interativo',
      host: 'Voz Creator',
      startTime: '14:00',
      duration: 90,
      genre: 'Talk Show',
      type: 'ai-generated',
      status: 'scheduled',
      listeners: 0,
      engagement: 0
    },
    {
      id: '4',
      name: 'Noite Eletrônica IA',
      host: 'Voz Nexus',
      startTime: '20:00',
      duration: 240,
      genre: 'Eletrônica',
      type: 'ai-generated',
      status: 'scheduled',
      listeners: 0,
      engagement: 0
    }
  ]);

  const [newProgram, setNewProgram] = useState({
    name: '',
    host: '',
    startTime: '',
    duration: 60,
    genre: '',
    type: 'ai-generated' as const
  });

  const [autoScheduling, setAutoScheduling] = useState(true);
  const [adaptiveContent, setAdaptiveContent] = useState(true);
  const { toast } = useToast();

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate program status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrograms(prev => prev.map(program => {
        if (program.status === 'active') {
          return {
            ...program,
            listeners: Math.max(0, program.listeners! + Math.floor((Math.random() - 0.5) * 100)),
            engagement: Math.max(60, Math.min(100, program.engagement! + (Math.random() - 0.5) * 5))
          };
        }
        return program;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addProgram = () => {
    if (newProgram.name && newProgram.startTime) {
      const program: Program = {
        id: Date.now().toString(),
        ...newProgram,
        status: 'scheduled',
        listeners: 0,
        engagement: 0
      };

      setPrograms([...programs, program]);
      setNewProgram({
        name: '',
        host: '',
        startTime: '',
        duration: 60,
        genre: '',
        type: 'ai-generated'
      });

      toast({
        title: "Programa adicionado",
        description: `${program.name} foi agendado para ${program.startTime}`,
      });
    }
  };

  const removeProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
    toast({
      title: "Programa removido",
      description: "Programa foi removido da grade",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-500/50 text-green-400';
      case 'scheduled': return 'border-blue-500/50 text-blue-400';
      case 'completed': return 'border-gray-500/50 text-gray-400';
      default: return 'border-white/50 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live': return <Radio className="w-4 h-4" />;
      case 'ai-generated': return <Brain className="w-4 h-4" />;
      case 'music-only': return <Music className="w-4 h-4" />;
      default: return <Mic className="w-4 h-4" />;
    }
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-radio-purple" />
              <span>Programação 24/7</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-radio-cyan">{getCurrentTime()}</p>
                <p className="text-sm text-gray-400">Horário Atual</p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Play className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-lg font-bold text-white">
                {programs.filter(p => p.status === 'active').length}
              </p>
              <p className="text-sm text-gray-400">Programas Ativos</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-lg font-bold text-white">
                {programs.filter(p => p.status === 'scheduled').length}
              </p>
              <p className="text-sm text-gray-400">Agendados</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-radio-pink" />
              <p className="text-lg font-bold text-white">
                {programs.reduce((sum, p) => sum + (p.listeners || 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Total de Ouvintes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Program List */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-radio-green" />
            <span>Grade de Programação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {programs.map((program) => (
              <div 
                key={program.id}
                className={`p-4 rounded-lg border transition-colors ${
                  program.status === 'active' 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getTypeIcon(program.type)}
                      <h3 className="font-medium text-white">{program.name}</h3>
                      <Badge variant="outline" className={getStatusColor(program.status)}>
                        {program.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400">
                      <div>
                        <p>Apresentador: {program.host}</p>
                        <p>Início: {program.startTime}</p>
                      </div>
                      <div>
                        <p>Duração: {program.duration}min</p>
                        <p>Gênero: {program.genre}</p>
                      </div>
                      {program.status === 'active' && (
                        <>
                          <div>
                            <p>Ouvintes: {program.listeners?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p>Engajamento: {program.engagement}%</p>
                            <Progress value={program.engagement} className="h-1 mt-1" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProgram(program.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Program */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-radio-cyan" />
            <span>Adicionar Programa</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nome do programa"
              value={newProgram.name}
              onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
              className="glass-effect border-white/20 bg-white/5"
            />
            
            <Input
              placeholder="Apresentador/Host"
              value={newProgram.host}
              onChange={(e) => setNewProgram({...newProgram, host: e.target.value})}
              className="glass-effect border-white/20 bg-white/5"
            />
            
            <Input
              type="time"
              value={newProgram.startTime}
              onChange={(e) => setNewProgram({...newProgram, startTime: e.target.value})}
              className="glass-effect border-white/20 bg-white/5"
            />
            
            <Input
              type="number"
              placeholder="Duração (minutos)"
              value={newProgram.duration}
              onChange={(e) => setNewProgram({...newProgram, duration: parseInt(e.target.value) || 60})}
              className="glass-effect border-white/20 bg-white/5"
            />
            
            <Input
              placeholder="Gênero"
              value={newProgram.genre}
              onChange={(e) => setNewProgram({...newProgram, genre: e.target.value})}
              className="glass-effect border-white/20 bg-white/5"
            />
            
            <select
              value={newProgram.type}
              onChange={(e) => setNewProgram({...newProgram, type: e.target.value as ProgramType})}
              className="glass-effect border-white/20 bg-white/5 text-white rounded-md px-3 py-2"
            >
              <option value="ai-generated">IA Generated</option>
              <option value="music-only">Apenas Música</option>
              <option value="live">Ao Vivo</option>
            </select>
          </div>
          
          <Button 
            onClick={addProgram}
            className="w-full bg-radio-purple hover:bg-radio-purple/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar à Grade
          </Button>
        </CardContent>
      </Card>

      {/* Auto Settings */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-radio-purple" />
            <span>Automação Inteligente</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-radio-cyan" />
              <span className="text-sm">Programação Automática 24/7</span>
            </div>
            <Button
              variant={autoScheduling ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoScheduling(!autoScheduling)}
              className={autoScheduling ? "bg-radio-purple" : ""}
            >
              {autoScheduling ? "Ativado" : "Desativado"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-radio-green" />
              <span className="text-sm">Conteúdo Adaptativo por IA</span>
            </div>
            <Button
              variant={adaptiveContent ? "default" : "outline"}
              size="sm"
              onClick={() => setAdaptiveContent(!adaptiveContent)}
              className={adaptiveContent ? "bg-radio-green" : ""}
            >
              {adaptiveContent ? "Ativado" : "Desativado"}
            </Button>
          </div>

          {autoScheduling && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-400 mb-2">
                <Zap className="w-3 h-3 inline mr-1" />
                Sistema Automático Ativo
              </p>
              <p className="text-xs text-blue-300">
                A IA está gerenciando automaticamente a programação 24/7, 
                criando conteúdo dinâmico e adaptativo baseado nas preferências dos ouvintes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramScheduler;
