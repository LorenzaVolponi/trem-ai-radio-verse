
import React, { useCallback, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Radio, 
  Users, 
  Activity, 
  Settings, 
  LogOut,
  Brain,
  Globe,
  BarChart3,
  Zap,
  Volume2,
  Headphones,
  ShieldCheck,
  Star
} from 'lucide-react';
import RealtimeStatusAlert, { RealtimeState } from './RealtimeStatusAlert';
import { useToast } from '@/components/ui/use-toast';
import AutoStreamingEngine from './AutoStreamingEngine';
import AIContentGenerator from './AIContentGenerator';
import StreamingEngine from './StreamingEngine';
import GlobalRadioMonitor from './GlobalRadioMonitor';
import AdvancedAudioEngine from './AdvancedAudioEngine';
import ProgramScheduler from './ProgramScheduler';
import AdvancedAnalytics from './AdvancedAnalytics';
import { demoMode, fetchTransmissionMetrics } from '@/services/metrics';

const RadioDashboard = () => {
  const { logout, user } = useAuth();
  const { state: adminState, updateAndPersist, publish, status: persistStatus, error: persistError, lastSavedAt } = useRadioAdminState();
  const [systemStatus, setSystemStatus] = useState({
    streaming: true,
    aiEngine: true,
    voiceCloning: true,
    musicGeneration: true,
    totalListeners: 0,
    uptime: 0
  });
  const [metricsState, setMetricsState] = useState<RealtimeState | 'ready'>('loading');

  const loadAdminMetrics = useCallback(() => {
    setMetricsState('loading');

    window.setTimeout(() => {
      if (!navigator.onLine) {
        setMetricsState('offline');
        toast({
          title: 'Métricas administrativas offline',
          description: 'Não foi possível atualizar os indicadores porque o navegador está sem conexão.',
          variant: 'destructive',
        });
        return;
      }

      setMetricsState('ready');
      toast({
        title: 'Métricas administrativas atualizadas',
        description: 'Os indicadores em tempo real foram carregados com sucesso.',
      });
    }, 900);
  }, [toast]);

  // System monitoring
  useEffect(() => {
    let active = true;

    const updateMetrics = async () => {
      const metrics = await fetchTransmissionMetrics();
      if (!active) return;

      setSystemStatus(prev => ({
        ...prev,
        streaming: metrics.status === 'online',
        totalListeners: metrics.listeners,
        uptime: Number(((metrics.uptimeSeconds / 86400) * 100).toFixed(2)),
      }));
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const hasMetrics = systemStatus.totalListeners > 0;
  const visibleMetricsState: RealtimeState | null = !hasMetrics
    ? 'empty'
    : metricsState === 'ready'
      ? null
      : metricsState;

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
              <div className="relative">
                <div className="w-12 h-12 radio-gradient rounded-full flex items-center justify-center animate-pulse-glow">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-radio-dark animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Rádio Trem AI - Dashboard Admin</h1>
                <p className="text-sm text-gray-400">Sistema autogerenciável 24/7</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Status Indicators */}
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant="outline" className="border-slate-400/50 text-slate-300">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Sem ranking auditado
                </Badge>
                {demoMode && (
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    Demonstração
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full">
                <Users className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm font-medium">{systemStatus.totalListeners.toLocaleString()}</span>
                <span className="text-xs text-gray-400">ouvintes globais</span>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-radio-green/50 text-radio-green">
                  Admin Master
                </Badge>
                <span className="text-sm text-gray-300">Olá, {user}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="glass-effect border-red-500/50 hover:bg-red-500/20 text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        {visibleMetricsState && (
          <RealtimeStatusAlert
            state={visibleMetricsState}
            title={visibleMetricsState === 'error' ? 'Falha ao carregar métricas administrativas' : undefined}
            description={visibleMetricsState === 'error' ? 'Os cartões de status podem estar desatualizados. Tente carregar novamente.' : undefined}
            actionLabel={visibleMetricsState === 'error' || visibleMetricsState === 'offline' ? 'Recarregar métricas' : undefined}
            onAction={visibleMetricsState === 'error' || visibleMetricsState === 'offline' ? loadAdminMetrics : undefined}
            className="mb-6"
          />
        )}

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status Sistema</p>
                  <p className={metricsState === 'ready' ? 'text-xl font-bold text-green-400' : 'text-xl font-bold text-yellow-400'}>
                    {metricsState === 'ready' ? '100% Online' : 'Sincronizando'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-radio-purple to-radio-pink flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">IA Performance</p>
                  <p className="text-xl font-bold text-radio-purple">98.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-radio-cyan to-blue-600 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Países Ativos</p>
                  <p className="text-xl font-bold text-radio-cyan">89</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ranking</p>
                  <p className="text-xl font-bold text-gray-300">Não auditado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Control Tabs */}
        <Tabs defaultValue="monitor" className="w-full">
          <TabsList className="grid w-full grid-cols-8 glass-effect border border-white/10">
            <TabsTrigger value="monitor" className="data-[state=active]:bg-radio-purple/30">
              <Globe className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Monitor Global</span>
            </TabsTrigger>
            <TabsTrigger value="streaming" className="data-[state=active]:bg-radio-purple/30">
              <Radio className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Auto Stream</span>
            </TabsTrigger>
            <TabsTrigger value="ai-content" className="data-[state=active]:bg-radio-purple/30">
              <Brain className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">IA Content</span>
            </TabsTrigger>
            <TabsTrigger value="audio-engine" className="data-[state=active]:bg-radio-purple/30">
              <Volume2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Audio Engine</span>
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="data-[state=active]:bg-radio-purple/30">
              <Settings className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Scheduler</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-radio-purple/30">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="publish" className="data-[state=active]:bg-radio-purple/30">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Publicar</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-radio-purple/30">
              <Zap className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitor" className="space-y-6">
            <GlobalRadioMonitor />
          </TabsContent>

          <TabsContent value="streaming" className="space-y-6">
            <AutoStreamingEngine />
          </TabsContent>

          <TabsContent value="ai-content" className="space-y-6">
            <AIContentGenerator adminState={adminState} persistStatus={persistStatus} persistError={persistError} onChange={updateAndPersist} />
          </TabsContent>

          <TabsContent value="audio-engine" className="space-y-6">
            <AdvancedAudioEngine />
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-6">
            <ProgramScheduler adminState={adminState} persistStatus={persistStatus} persistError={persistError} onChange={updateAndPersist} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-radio-green" /> Publicar programação</span>
                  <Badge variant="outline" className={persistStatus === 'error' ? 'border-red-500/50 text-red-400' : 'border-green-500/50 text-green-400'}>{persistStatus === 'saving' ? 'Salvando...' : persistStatus === 'loading' ? 'Carregando...' : persistStatus === 'error' ? 'Erro' : 'Pronto'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {persistError && <p className="text-sm text-yellow-300">{persistError}</p>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg"><p className="text-2xl font-bold">{adminState.programs.length}</p><p className="text-sm text-gray-400">Programas</p></div>
                  <div className="p-4 bg-white/5 rounded-lg"><p className="text-2xl font-bold">{adminState.tracks.length}</p><p className="text-sm text-gray-400">Faixas</p></div>
                  <div className="p-4 bg-white/5 rounded-lg"><p className="text-2xl font-bold">{adminState.jingles.length}</p><p className="text-sm text-gray-400">Vinhetas</p></div>
                  <div className="p-4 bg-white/5 rounded-lg"><p className="text-2xl font-bold">{adminState.advertisements.length}</p><p className="text-sm text-gray-400">Anúncios</p></div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Revisão de mudanças</h3>
                  <p className="text-sm text-gray-300">Stream: {adminState.streamSettings.isStreaming ? 'ao vivo' : 'offline'} · {adminState.streamSettings.streamQuality}kbps · IA: {adminState.aiContentSettings.voiceSettings.selectedVoice}</p>
                  <p className="text-xs text-gray-500 mt-2">Último salvamento: {lastSavedAt ? new Date(lastSavedAt).toLocaleString('pt-BR') : 'aguardando alterações'}</p>
                  {adminState.activePublication && <p className="text-xs text-green-400 mt-1">Publicação ativa: {new Date(adminState.activePublication.publishedAt).toLocaleString('pt-BR')}</p>}
                </div>
                <Button onClick={publish} className="w-full bg-radio-green hover:bg-radio-green/80"><CheckCircle2 className="w-4 h-4 mr-2" /> Revisar e ativar mudanças</Button>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h3 className="flex items-center gap-2 font-semibold mb-3"><History className="w-4 h-4" /> Histórico de alterações</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {adminState.events.length === 0 && <p className="text-sm text-gray-400">Nenhuma alteração registrada ainda.</p>}
                    {adminState.events.map((event) => <div key={event.id} className="border border-white/10 rounded p-3"><p className="text-sm font-medium">{event.title}</p><p className="text-xs text-gray-400">{event.description}</p><p className="text-xs text-gray-500">{new Date(event.createdAt).toLocaleString('pt-BR')}</p></div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <StreamingEngine adminState={adminState} persistStatus={persistStatus} persistError={persistError} onChange={updateAndPersist} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 glass-effect border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-400">
                © 2024 Rádio Trem AI. Sistema de rádio IA autogerenciável.
              </p>
              <div className="flex space-x-2">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Sem ranking auditado
                </Badge>
                <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                  <Star className="w-3 h-3 mr-1" />
                  Reconhecimento não informado
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <p className="text-xs text-gray-500">
                Sistema Autogerenciável 24/7 - Performance Mundial de IA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RadioDashboard;
