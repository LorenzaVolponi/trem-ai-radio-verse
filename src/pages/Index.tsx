import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  Play, 
  Pause, 
  Users, 
  Radio, 
  Zap,
  TrendingUp,
  Music,
  Clock,
  Calendar,
  Settings,
  LogIn,
  Upload,
  Mic2,
  Brain,
  Search,
  Share2,
  Activity,
  Volume2,
  BarChart3,
  Cog,
  Headphones,
  Globe
} from 'lucide-react';
import AdvancedAudioPlayer from '@/components/AdvancedAudioPlayer';
import MusicUpload from '@/components/MusicUpload';
import LiveStats from '@/components/LiveStats';
import ProgramSchedule from '@/components/ProgramSchedule';
import ChatInterface from '@/components/ChatInterface';
import AdminPanel from '@/components/AdminPanel';
import SunoIntegration from '@/components/SunoIntegration';
import AIRadioEngine from '@/components/AIRadioEngine';
import StreamingEngine from '@/components/StreamingEngine';
import AdvancedPlaylist from '@/components/AdvancedPlaylist';
import SEOOptimizer from '@/components/SEOOptimizer';
import AdvancedAudioEngine from '@/components/AdvancedAudioEngine';
import ProgramScheduler from '@/components/ProgramScheduler';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';

const Index = () => {
  const [currentListeners, setCurrentListeners] = useState(2847);
  const [systemStatus, setSystemStatus] = useState({
    aiEngine: 'online',
    streaming: 'optimal',
    voiceCloning: 'active',
    musicGeneration: 'generating'
  });
  
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // Real-time listeners and system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentListeners(prev => prev + Math.floor(Math.random() * 20) - 10);
      
      // Simulate system status changes
      setSystemStatus(prev => ({
        ...prev,
        musicGeneration: Math.random() > 0.7 ? 'generating' : 'standby'
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-radio-darker via-gray-900 to-radio-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 radio-gradient rounded-full flex items-center justify-center animate-pulse-glow mx-auto mb-4">
            <Radio className="w-8 h-8 text-white" />
          </div>
          <p className="text-white">Inicializando Sistema IA...</p>
          <div className="mt-4 w-64 bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-radio-purple to-radio-cyan h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-radio-darker via-gray-900 to-radio-dark text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-radio-purple/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-radio-pink/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-radio-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Enhanced Header */}
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
                <h1 className="text-2xl font-bold gradient-text">Rádio Trem AI</h1>
                <p className="text-sm text-gray-400">Sistema Autogerenciável de Rádio IA - Nível Mundial</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Status Indicators */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-2 py-1 glass-effect rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">AI Engine</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 glass-effect rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Streaming</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 glass-effect rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Voice AI</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AO VIVO 24/7</span>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full">
                <Headphones className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm font-medium">{currentListeners.toLocaleString()}</span>
                <span className="text-xs text-gray-400">ouvintes</span>
              </div>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                    Admin
                  </Badge>
                  <span className="text-sm text-gray-300">Olá, {user.email?.split('@')[0]}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="glass-effect border-radio-purple/50 hover:bg-radio-purple/20"
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="glass-effect border-radio-purple/50 hover:bg-radio-purple/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Enhanced Tabs */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Enhanced Player and Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <AdvancedAudioPlayer isLive={true} />

            {/* Advanced Tabs System */}
            <Tabs defaultValue="now-playing" className="w-full">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 glass-effect border border-white/10">
                <TabsTrigger value="now-playing" className="data-[state=active]:bg-radio-purple/30">
                  <Music className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Tocando</span>
                </TabsTrigger>
                <TabsTrigger value="audio-engine" className="data-[state=active]:bg-radio-purple/30">
                  <Radio className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Engine</span>
                </TabsTrigger>
                <TabsTrigger value="scheduler" className="data-[state=active]:bg-radio-purple/30">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">24/7</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-radio-purple/30">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="suno" className="data-[state=active]:bg-radio-purple/30">
                  <Zap className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Suno</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-radio-purple/30">
                  <Upload className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="playlist" className="data-[state=active]:bg-radio-purple/30">
                  <Volume2 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Playlist</span>
                </TabsTrigger>
                <TabsTrigger value="streaming" className="data-[state=active]:bg-radio-purple/30">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Stream</span>
                </TabsTrigger>
                <TabsTrigger value="ai-engine" className="data-[state=active]:bg-radio-purple/30">
                  <Brain className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">IA</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="data-[state=active]:bg-radio-purple/30">
                  <Cog className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="now-playing" className="space-y-4">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mic2 className="w-5 h-5 text-radio-purple" />
                      <span>Sistema de Transmissão Avançado</span>
                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                        <Zap className="w-3 h-3 mr-1" />
                        IA Nível Mundial
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Status Sistema</p>
                        <p className="font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                          Autogerenciável 24/7
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Qualidade IA</p>
                        <p className="font-medium">Ultra HD 320kbps</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Latência</p>
                        <p className="font-medium text-green-400">~85ms</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Uptime</p>
                        <p className="font-medium">99.98%</p>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-radio-purple/20 text-radio-purple border-radio-purple/30">
                        <Brain className="w-3 h-3 mr-1" />
                        IA Autogerenciável
                      </Badge>
                      <Badge variant="secondary" className="bg-radio-cyan/20 text-radio-cyan border-radio-cyan/30">
                        Transmissão Contínua
                      </Badge>
                      <Badge variant="secondary" className="bg-radio-green/20 text-radio-green border-radio-green/30">
                        Sistema Mundial
                      </Badge>
                      <Badge variant="secondary" className="bg-radio-pink/20 text-radio-pink border-radio-pink/30">
                        Voz Clonada Premium
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audio-engine">
                <AdvancedAudioEngine />
              </TabsContent>

              <TabsContent value="scheduler">
                <ProgramScheduler />
              </TabsContent>

              <TabsContent value="analytics">
                <AdvancedAnalytics />
              </TabsContent>

              <TabsContent value="suno">
                <SunoIntegration />
              </TabsContent>

              <TabsContent value="upload">
                {user ? (
                  <MusicUpload />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Faça login para enviar músicas</h3>
                      <p className="text-gray-400 mb-4">
                        Conecte-se para fazer upload de suas músicas e contribuir com a programação da rádio.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="playlist">
                {user ? (
                  <AdvancedPlaylist />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Acesso às Playlists IA</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar playlists inteligentes e personalizadas por IA.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="streaming">
                {user ? (
                  <StreamingEngine />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Engine de Streaming Avançado</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar controles de streaming de nível mundial.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="ai-engine">
                {user ? (
                  <AIRadioEngine />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Motor de IA Avançado</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar o sistema de IA autogerenciável mais avançado do mundo.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="admin">
                {user ? (
                  <AdminPanel />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Painel Administrativo</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar controles administrativos completos.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <ChatInterface />
            
            {/* Enhanced Queue with AI Predictions */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-radio-cyan" />
                    <span>Fila IA Inteligente</span>
                  </div>
                  <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                    <Brain className="w-3 h-3 mr-1" />
                    Auto
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { time: "Agora", title: "Voz do Amanhã Premium", artist: "IA Vocal Elite", duration: "4:15", isLive: true, aiGenerated: true },
                  { time: "14:36", title: "Flash News IA", artist: "Locução Neural", duration: "2:30", aiGenerated: true },
                  { time: "14:39", title: "Batida Cósmica 2.0", artist: "MusicGen Ultra", duration: "3:28", aiGenerated: true },
                  { time: "14:42", title: "Harmonia Sintética", artist: "AI Composer Pro", duration: "3:45", aiGenerated: true },
                  { time: "14:46", title: "Interação Ouvintes", artist: "ChatBot IA", duration: "5:00", aiGenerated: true }
                ].map((track, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    track.isLive ? 'bg-radio-purple/20 border border-radio-purple/30' : 'bg-white/5 hover:bg-white/10'
                  }`}>
                    <div className="text-xs text-gray-400 w-12">
                      {track.isLive ? (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                          AO VIVO
                        </div>
                      ) : track.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium truncate">{track.title}</p>
                        {track.aiGenerated && (
                          <Badge variant="outline" className="border-radio-cyan/50 text-radio-cyan text-xs">
                            <Brain className="w-2 h-2 mr-1" />
                            IA
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                    </div>
                    <div className="text-xs text-gray-400">{track.duration}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Real-time Stats */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-radio-green" />
                  <span>Métricas Tempo Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Pico Mundial</span>
                  <span className="text-sm font-medium text-radio-green">4,327</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tempo Médio Global</span>
                  <span className="text-sm font-medium text-radio-cyan">52 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Interações IA</span>
                  <span className="text-sm font-medium text-radio-pink">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Países Conectados</span>
                  <span className="text-sm font-medium text-radio-purple">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">IA Performance</span>
                  <span className="text-sm font-medium text-green-400">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Qualidade Neural</span>
                  <span className="text-sm font-medium text-radio-cyan">Ultra HD</span>
                </div>
              </CardContent>
            </Card>

            {/* System Health Monitor */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-radio-purple" />
                  <span>Saúde do Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Engine IA</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">Optimal</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Voice Cloning</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Streaming</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">99.98%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Auto Scheduler</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-400">Running</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 mt-12 glass-effect border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-400">
                © 2024 Rádio Trem AI. Sistema Autogerenciável de Nível Mundial.
              </p>
              <div className="flex space-x-2">
                <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                  <Brain className="w-3 h-3 mr-1" />
                  100% IA
                </Badge>
                <Badge variant="outline" className="border-radio-green/50 text-radio-green">
                  <Globe className="w-3 h-3 mr-1" />
                  Mundial
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!user && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="text-gray-400 hover:text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}
              <p className="text-xs text-gray-500">
                Sistema de Radio IA Autogerenciável - TOP 1 Mundial
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
