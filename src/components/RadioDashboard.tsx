
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Radio, 
  Users, 
  TrendingUp, 
  Globe, 
  Activity,
  Zap,
  Brain,
  Music,
  Mic,
  Settings,
  BarChart3,
  Clock,
  Heart,
  Volume2,
  Wifi,
  Server
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AutoStreamingEngine from './AutoStreamingEngine';
import AIContentGenerator from './AIContentGenerator';

const RadioDashboard = () => {
  const { logout, user } = useAuth();
  const [globalStats, setGlobalStats] = useState({
    totalListeners: 2847,
    peakListeners: 4327,
    averageSession: 52,
    countries: 47,
    aiInteractions: 247,
    uptime: 99.8
  });

  const [systemStatus, setSystemStatus] = useState({
    streaming: 'optimal',
    aiEngine: 'active',
    voiceCloning: 'running',
    musicGeneration: 'generating',
    database: 'healthy',
    bandwidth: 'excellent'
  });

  // Real-time stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalStats(prev => ({
        ...prev,
        totalListeners: prev.totalListeners + Math.floor(Math.random() * 20) - 10,
        aiInteractions: prev.aiInteractions + Math.floor(Math.random() * 3),
        averageSession: Math.max(45, Math.min(65, prev.averageSession + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'active':
      case 'running':
      case 'healthy':
      case 'excellent':
        return 'text-green-400';
      case 'generating':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'active':
      case 'running':
      case 'healthy':
      case 'excellent':
        return 'border-green-500/50 text-green-400';
      case 'generating':
        return 'border-blue-500/50 text-blue-400';
      default:
        return 'border-gray-500/50 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-radio-darker via-gray-900 to-radio-dark text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-radio-purple/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-radio-pink/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-radio-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 radio-gradient rounded-full flex items-center justify-center animate-pulse-glow">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Rádio Trem AI - Dashboard</h1>
                <p className="text-sm text-gray-400">Sistema Administrativo Autogerenciável</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                Admin: {user}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="glass-effect border-red-500/50 hover:bg-red-500/20 text-red-400"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-radio-cyan" />
              <p className="text-2xl font-bold text-white">{globalStats.totalListeners.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Ouvintes Ativos</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-radio-green" />
              <p className="text-2xl font-bold text-white">{globalStats.peakListeners.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Pico Diário</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-radio-pink" />
              <p className="text-2xl font-bold text-white">{Math.round(globalStats.averageSession)}min</p>
              <p className="text-xs text-gray-400">Sessão Média</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-radio-purple" />
              <p className="text-2xl font-bold text-white">{globalStats.countries}</p>
              <p className="text-xs text-gray-400">Países</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-radio-blue" />
              <p className="text-2xl font-bold text-white">{globalStats.aiInteractions}</p>
              <p className="text-xs text-gray-400">Interações IA</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-2xl font-bold text-white">{globalStats.uptime}%</p>
              <p className="text-xs text-gray-400">Uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* System Status Overview */}
        <Card className="glass-effect border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-radio-green" />
              <span>Status do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(systemStatus).map(([key, status]) => (
                <div key={key} className="text-center p-3 rounded-lg bg-white/5">
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" 
                       style={{ backgroundColor: status.includes('active') || status.includes('optimal') || status.includes('healthy') || status.includes('excellent') || status.includes('running') ? '#10b981' : '#3b82f6' }}>
                  </div>
                  <p className="text-sm font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <Badge variant="outline" className={getStatusBadge(status)}>
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Control Tabs */}
        <Tabs defaultValue="streaming" className="w-full">
          <TabsList className="grid w-full grid-cols-5 glass-effect border border-white/10 mb-6">
            <TabsTrigger value="streaming" className="data-[state=active]:bg-radio-purple/30">
              <Wifi className="w-4 h-4 mr-2" />
              Streaming
            </TabsTrigger>
            <TabsTrigger value="ai-content" className="data-[state=active]:bg-radio-purple/30">
              <Brain className="w-4 h-4 mr-2" />
              IA Content
            </TabsTrigger>
            <TabsTrigger value="programming" className="data-[state=active]:bg-radio-purple/30">
              <Clock className="w-4 h-4 mr-2" />
              Programação
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-radio-purple/30">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-radio-purple/30">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="streaming">
            <AutoStreamingEngine />
          </TabsContent>

          <TabsContent value="ai-content">
            <AIContentGenerator />
          </TabsContent>

          <TabsContent value="programming">
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle>Programação Automática 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Sistema Autogerenciável Ativo</h3>
                  <p className="text-gray-400 mb-6">
                    A programação é gerenciada automaticamente pela IA, adaptando-se em tempo real às preferências dos ouvintes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <Music className="w-8 h-8 text-radio-cyan mx-auto mb-2" />
                      <p className="text-sm font-medium">Seleção Musical IA</p>
                      <p className="text-xs text-gray-400">Baseada em tendências</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <Mic className="w-8 h-8 text-radio-pink mx-auto mb-2" />
                      <p className="text-sm font-medium">Locuções Dinâmicas</p>
                      <p className="text-xs text-gray-400">Voz clonada adaptativa</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <Heart className="w-8 h-8 text-radio-green mx-auto mb-2" />
                      <p className="text-sm font-medium">Interação Emocional</p>
                      <p className="text-xs text-gray-400">Resposta ao público</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle>Métricas de Audiência</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Ouvintes Únicos (24h)</span>
                      <span className="text-sm font-medium text-white">8,432</span>
                    </div>
                    <Progress value={84} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Tempo Médio de Escuta</span>
                      <span className="text-sm font-medium text-white">52 min</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Taxa de Retenção</span>
                      <span className="text-sm font-medium text-white">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <CardTitle>Performance da IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Satisfação do Conteúdo</span>
                      <span className="text-sm font-medium text-white">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Precisão da Voz IA</span>
                      <span className="text-sm font-medium text-white">97%</span>
                    </div>
                    <Progress value={97} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Adaptação Contextual</span>
                      <span className="text-sm font-medium text-white">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Sistema Autogerenciável</h3>
                  <p className="text-gray-400 mb-6">
                    As configurações são otimizadas automaticamente pela IA para garantir a melhor performance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white/5">
                      <Zap className="w-8 h-8 text-radio-purple mx-auto mb-2" />
                      <p className="text-sm font-medium">Auto-otimização</p>
                      <p className="text-xs text-gray-400">Ajustes automáticos</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5">
                      <Server className="w-8 h-8 text-radio-green mx-auto mb-2" />
                      <p className="text-sm font-medium">Monitoramento 24/7</p>
                      <p className="text-xs text-gray-400">Saúde do sistema</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RadioDashboard;
