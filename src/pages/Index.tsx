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
  Volume2
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

const Index = () => {
  const [currentListeners, setCurrentListeners] = useState(1247);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // Simular atualização de ouvintes em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentListeners(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);
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
          <p className="text-white">Carregando...</p>
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
                <h1 className="text-2xl font-bold gradient-text">Rádio Trem AI</h1>
                <p className="text-sm text-gray-400">A Primeira Rádio Totalmente Autônoma</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AO VIVO</span>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full">
                <Users className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm font-medium">{currentListeners.toLocaleString()}</span>
                <span className="text-xs text-gray-400">ouvintes</span>
              </div>

              {user ? (
                <div className="flex items-center space-x-2">
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Player Principal */}
          <div className="lg:col-span-2 space-y-6">
            <AdvancedAudioPlayer isLive={true} />

            {/* Tabs de Conteúdo */}
            <Tabs defaultValue="now-playing" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 glass-effect border border-white/10">
                <TabsTrigger value="now-playing" className="data-[state=active]:bg-radio-purple/30">
                  <Music className="w-4 h-4 mr-2" />
                  Tocando
                </TabsTrigger>
                <TabsTrigger value="suno" className="data-[state=active]:bg-radio-purple/30">
                  <Zap className="w-4 h-4 mr-2" />
                  Suno AI
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-radio-purple/30">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="playlist" className="data-[state=active]:bg-radio-purple/30">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Playlist
                </TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-radio-purple/30">
                  <Calendar className="w-4 h-4 mr-2" />
                  Programa
                </TabsTrigger>
                <TabsTrigger value="streaming" className="data-[state=active]:bg-radio-purple/30">
                  <Activity className="w-4 h-4 mr-2" />
                  Stream
                </TabsTrigger>
                <TabsTrigger value="ai-engine" className="data-[state=active]:bg-radio-purple/30">
                  <Brain className="w-4 h-4 mr-2" />
                  IA Engine
                </TabsTrigger>
                <TabsTrigger value="seo" className="data-[state=active]:bg-radio-purple/30">
                  <Search className="w-4 h-4 mr-2" />
                  SEO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="now-playing" className="space-y-4">
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mic2 className="w-5 h-5 text-radio-purple" />
                      <span>Informações da Transmissão</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                          Transmitindo ao vivo
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Qualidade</p>
                        <p className="font-medium">320kbps Stereo</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Latência</p>
                        <p className="font-medium">~2.3s</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Uptime</p>
                        <p className="font-medium">24h 7d</p>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="flex space-x-2">
                      <Badge variant="secondary" className="bg-radio-purple/20 text-radio-purple border-radio-purple/30">
                        <Zap className="w-3 h-3 mr-1" />
                        IA Gerada
                      </Badge>
                      <Badge variant="secondary" className="bg-radio-cyan/20 text-radio-cyan border-radio-cyan/30">
                        Transmissão Contínua
                      </Badge>
                      <Badge variant="secondary" className="bg-radio-green/20 text-radio-green border-radio-green/30">
                        Automática
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
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
                      <h3 className="text-lg font-medium mb-2">Acesso às Playlists</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar playlists personalizadas e inteligentes.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="schedule">
                <ProgramSchedule />
              </TabsContent>

              <TabsContent value="streaming">
                {user ? (
                  <StreamingEngine />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Controle de Streaming</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar controles avançados de streaming.
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
                      <h3 className="text-lg font-medium mb-2">Acesso ao Motor de IA</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar o sistema de IA autônomo da rádio.
                      </p>
                      <Button onClick={() => navigate('/auth')} className="bg-radio-purple hover:bg-radio-purple/80">
                        <LogIn className="w-4 h-4 mr-2" />
                        Fazer Login
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="seo">
                {user ? (
                  <SEOOptimizer />
                ) : (
                  <Card className="glass-effect border-white/10">
                    <CardContent className="p-8 text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Otimização SEO</h3>
                      <p className="text-gray-400 mb-4">
                        Faça login para acessar ferramentas de SEO e analytics.
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

          {/* Sidebar */}
          <div className="space-y-6">
            <ChatInterface />
            
            {/* Próximas Faixas */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-radio-cyan" />
                  <span>Fila de Reprodução</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { time: "Agora", title: "Voz do Amanhã", artist: "IA Vocal", duration: "4:15", isLive: true },
                  { time: "14:36", title: "Notícias Flash", artist: "Locução IA", duration: "2:30" },
                  { time: "14:39", title: "Batida Cósmica", artist: "Gerador Musical", duration: "3:28" },
                  { time: "14:42", title: "Melodia Sintética", artist: "AI Composer", duration: "3:45" }
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
                      <p className="text-sm font-medium truncate">{track.title}</p>
                      <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                    </div>
                    <div className="text-xs text-gray-400">{track.duration}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Estatísticas Rápidas */}
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-sm">Estatísticas Hoje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Pico de Audiência</span>
                  <span className="text-sm font-medium text-radio-green">2,341</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tempo Médio</span>
                  <span className="text-sm font-medium text-radio-cyan">47 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Interações</span>
                  <span className="text-sm font-medium text-radio-pink">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Faixas Tocadas</span>
                  <span className="text-sm font-medium text-radio-purple">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Músicas IA</span>
                  <span className="text-sm font-medium text-radio-green">78%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 glass-effect border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-400">
                © 2024 Rádio Trem AI. Powered by Artificial Intelligence.
              </p>
              <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                <Zap className="w-3 h-3 mr-1" />
                100% IA
              </Badge>
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
                Sistema de Radio AI completo com upload, streaming e IA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
