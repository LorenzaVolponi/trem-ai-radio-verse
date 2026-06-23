
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Calendar, 
  Music, 
  Mic, 
  Radio, 
  Zap, 
  Play,
  Users,
  TrendingUp,
  Star
} from 'lucide-react';

const ProgramSchedule = () => {
  const [selectedDay, setSelectedDay] = useState('today');

  const scheduleData = {
    today: [
      {
        time: '06:00',
        duration: '3h',
        title: 'Despertar IA',
        description: 'Músicas energizantes geradas por IA para começar o dia',
        type: 'music',
        status: 'completed',
        aiHost: 'Voz Aurora',
        listeners: 1200
      },
      {
        time: '09:00',
        duration: '1h',
        title: 'Notícias Flash IA',
        description: 'Resumo de notícias mundial com análise de IA',
        type: 'news',
        status: 'completed',
        aiHost: 'Voz Nexus',
        listeners: 1500
      },
      {
        time: '10:00',
        duration: '2h',
        title: 'Mix Algoritmo',
        description: 'Seleção musical baseada em tendências e análise preditiva',
        type: 'music',
        status: 'completed',
        aiHost: 'Voz Harmony',
        listeners: 1300
      },
      {
        time: '12:00',
        duration: '1h',
        title: 'Pausa para o Almoço',
        description: 'Música ambiente e conversas casuais com IA',
        type: 'ambient',
        status: 'completed',
        aiHost: 'Voz Casual',
        listeners: 900
      },
      {
        time: '13:00',
        duration: '3h',
        title: 'Tarde Criativa',
        description: 'Criações musicais originais e experimentações sonoras',
        type: 'creative',
        status: 'live',
        aiHost: 'Voz Creator',
        listeners: 1247
      },
      {
        time: '16:00',
        duration: '2h',
        title: 'Interação Direta',
        description: 'Programa interativo com sugestões dos ouvintes',
        type: 'interactive',
        status: 'upcoming',
        aiHost: 'Voz Social',
        listeners: 0
      },
      {
        time: '18:00',
        duration: '3h',
        title: 'Prime Time IA',
        description: 'Os melhores hits gerados por IA do momento',
        type: 'prime',
        status: 'upcoming',
        aiHost: 'Voz Prime',
        listeners: 0
      },
      {
        time: '21:00',
        duration: '2h',
        title: 'Noite Chill',
        description: 'Música relaxante para encerrar o dia',
        type: 'chill',
        status: 'upcoming',
        aiHost: 'Voz Zen',
        listeners: 0
      },
      {
        time: '23:00',
        duration: '7h',
        title: 'Madrugada Automática',
        description: 'Programação totalmente automatizada durante a madrugada',
        type: 'auto',
        status: 'upcoming',
        aiHost: 'Sistema Auto',
        listeners: 0
      }
    ],
    tomorrow: [
      {
        time: '06:00',
        duration: '3h',
        title: 'Despertar IA - Edição Especial',
        description: 'Especial com músicas inéditas geradas durante a madrugada',
        type: 'special',
        status: 'scheduled',
        aiHost: 'Voz Aurora',
        listeners: 0
      },
      // ... mais programação
    ]
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      music: Music,
      news: Radio,
      ambient: Clock,
      creative: Zap,
      interactive: Users,
      prime: Star,
      chill: Calendar,
      auto: Radio,
      special: TrendingUp
    };
    return icons[type] || Music;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      music: 'bg-radio-purple/20 text-radio-purple border-radio-purple/30',
      news: 'bg-radio-cyan/20 text-radio-cyan border-radio-cyan/30',
      ambient: 'bg-radio-green/20 text-radio-green border-radio-green/30',
      creative: 'bg-radio-pink/20 text-radio-pink border-radio-pink/30',
      interactive: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      prime: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      chill: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      auto: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      special: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[type] || colors.music;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      live: 'bg-red-500/20 text-red-400 border-red-500/50',
      completed: 'bg-green-500/20 text-green-400 border-green-500/50',
      upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/50'
    };
    return colors[status] || colors.upcoming;
  };

  const currentSchedule = scheduleData[selectedDay] || scheduleData.today;

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-radio-purple" />
              <span>Programação da Rádio</span>
            </div>
            <Badge variant="outline" className="border-radio-green/50 text-radio-green">
              <Zap className="w-3 h-3 mr-1" />
              100% IA
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDay} onValueChange={setSelectedDay}>
            <TabsList className="grid w-full grid-cols-3 glass-effect border border-white/10">
              <TabsTrigger value="today" className="data-[state=active]:bg-radio-purple/30">
                Hoje
              </TabsTrigger>
              <TabsTrigger value="tomorrow" className="data-[state=active]:bg-radio-purple/30">
                Amanhã
              </TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-radio-purple/30">
                Semana
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedDay} className="mt-6">
              <div className="space-y-4">
                {currentSchedule.map((program, index) => {
                  const TypeIcon = getTypeIcon(program.type);
                  
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:bg-white/5 ${
                        program.status === 'live' 
                          ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/20' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="text-lg font-mono font-bold text-white">
                              {program.time}
                            </div>
                            <div className="text-xs text-gray-400">
                              {program.duration}
                            </div>
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-white">
                                {program.title}
                              </h3>
                              {program.status === 'live' && (
                                <Badge variant="outline" className={getStatusColor(program.status)}>
                                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                                  AO VIVO
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-400">
                              {program.description}
                            </p>

                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Mic className="w-4 h-4 text-radio-cyan" />
                                <span className="text-sm text-gray-300">{program.aiHost}</span>
                              </div>
                              
                              {program.listeners > 0 && (
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4 text-radio-green" />
                                  <span className="text-sm text-gray-300">
                                    {program.listeners.toLocaleString()} ouvintes
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant="outline" className={getTypeColor(program.type)}>
                            <TypeIcon className="w-3 h-3 mr-1" />
                            {program.type}
                          </Badge>

                          {program.status !== 'completed' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-radio-purple hover:text-white hover:bg-radio-purple/20"
                            >
                              {program.status === 'live' ? (
                                <>
                                  <Radio className="w-4 h-4 mr-1" />
                                  Ouvir
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-1" />
                                  Definir Lembrete
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Resumo da Programação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5 text-radio-purple" />
              <div>
                <p className="text-lg font-bold text-white">12h</p>
                <p className="text-sm text-gray-400">Música por Dia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-radio-cyan" />
              <div>
                <p className="text-lg font-bold text-white">6</p>
                <p className="text-sm text-gray-400">Vozes IA Ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-radio-green" />
              <div>
                <p className="text-lg font-bold text-white">100%</p>
                <p className="text-sm text-gray-400">Automação IA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgramSchedule;
