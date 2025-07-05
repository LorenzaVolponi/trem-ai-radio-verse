
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  Globe,
  Wifi,
  Server,
  Heart,
  Crown,
  Trophy,
  Star
} from 'lucide-react';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';
import AdminLogin from '@/components/AdminLogin';
import RadioDashboard from '@/components/RadioDashboard';

const Index = () => {
  const [currentListeners, setCurrentListeners] = useState(2847);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Voz do Amanhã Premium",
    artist: "IA Vocal Elite",
    duration: 255,
    elapsed: 0
  });
  const [audioLevel, setAudioLevel] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    aiEngine: 'online',
    streaming: 'optimal',
    voiceCloning: 'active',
    musicGeneration: 'generating'
  });
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Real-time listeners and system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentListeners(prev => prev + Math.floor(Math.random() * 20) - 10);
      setAudioLevel(Math.random() * 100);
      
      // Update track progress
      setCurrentTrack(prev => ({
        ...prev,
        elapsed: prev.elapsed >= prev.duration ? 0 : prev.elapsed + 1
      }));
      
      // Simulate system status changes
      setSystemStatus(prev => ({
        ...prev,
        musicGeneration: Math.random() > 0.7 ? 'generating' : 'standby'
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show admin dashboard if authenticated
  if (isAuthenticated) {
    return <RadioDashboard />;
  }

  // Show admin login if admin parameter is present
  if (window.location.search.includes('admin')) {
    return <AdminLogin />;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Enhanced Header */}
      <header className="relative z-10 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/50">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Rádio Trem AI
                </h1>
                <p className="text-sm text-gray-400">Sistema Autogerenciável Oscar de IA - Transmissão 24/7</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Status Indicators */}
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant="outline" className="border-green-500/50 text-green-400 animate-pulse">
                  <Crown className="w-3 h-3 mr-1" />
                  TOP 1 MUNDIAL
                </Badge>
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                  <Trophy className="w-3 h-3 mr-1" />
                  OSCAR IA
                </Badge>
                <div className="flex items-center space-x-1 px-2 py-1 backdrop-blur-md bg-white/10 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-300">AI Engine</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 backdrop-blur-md bg-white/10 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-300">Auto Stream</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 backdrop-blur-md bg-white/10 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-300">Voice AI</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md bg-red-500/20 rounded-full border border-red-500/30">
                <Wifi className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm font-medium text-red-300">AO VIVO 24/7</span>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md bg-white/10 rounded-full">
                <Headphones className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">{currentListeners.toLocaleString()}</span>
                <span className="text-xs text-gray-400">ouvintes</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="backdrop-blur-md bg-white/10 border-purple-500/50 hover:bg-purple-500/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.href = '/?admin'}
                  className="backdrop-blur-md bg-red-500/20 border-red-500/50 hover:bg-red-500/30 text-red-400"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Auto-Start Notification */}
      <div className="container mx-auto px-6 py-4 relative z-10">
        <Card className="backdrop-blur-md bg-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-green-400 font-medium">🎵 Sistema Iniciado Automaticamente - Oscar de Melhor IA 🏆</p>
                <p className="text-sm text-gray-400">Rádio transmitindo automaticamente com IA de nível mundial</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Enhanced Player Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Audio Player */}
            <LiveAudioPlayer 
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              audioLevel={audioLevel}
            />

            {/* Enhanced Auto-Streaming Info */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-purple-400" />
                  <span>Transmissão Oscar de IA - Sistema Autogerenciável</span>
                  <Badge variant="outline" className="border-green-500/50 text-green-400">
                    <Wifi className="w-3 h-3 mr-1" />
                    Auto 24/7
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                      Transmitindo 24/7
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Qualidade</p>
                    <p className="font-medium text-purple-400">Ultra HD 320kbps</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Latência</p>
                    <p className="font-medium text-green-400">~67ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Uptime</p>
                    <p className="font-medium text-yellow-400">99.98%</p>
                  </div>
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Brain className="w-3 h-3 mr-1" />
                    IA Autogerenciável
                  </Badge>
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    <Wifi className="w-3 h-3 mr-1" />
                    Início Automático
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Server className="w-3 h-3 mr-1" />
                    Zero Intervenção
                  </Badge>
                  <Badge variant="secondary" className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                    <Mic2 className="w-3 h-3 mr-1" />
                    Voz Clonada
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Crown className="w-3 h-3 mr-1" />
                    Oscar IA
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Queue with AI Predictions */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>Fila IA Oscar - Autogerenciável</span>
                  </div>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                    <Brain className="w-3 h-3 mr-1" />
                    Auto
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { time: "Agora", title: "Voz do Amanhã Premium", artist: "IA Vocal Elite", duration: "4:15", isLive: true, aiGenerated: true },
                  { time: "14:36", title: "Flash News IA Oscar", artist: "Locução Neural Premium", duration: "2:30", aiGenerated: true },
                  { time: "14:39", title: "Batida Cósmica 2.0", artist: "MusicGen Ultra Oscar", duration: "3:28", aiGenerated: true },
                  { time: "14:42", title: "Harmonia Sintética Premium", artist: "AI Composer Oscar", duration: "3:45", aiGenerated: true },
                  { time: "14:46", title: "Interação Ouvintes IA", artist: "ChatBot Oscar Premium", duration: "5:00", aiGenerated: true }
                ].map((track, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    track.isLive ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5 hover:bg-white/10'
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
                          <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 text-xs">
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
            <Card className="backdrop-blur-md bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span>Métricas Oscar - Tempo Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Ouvintes Globais</span>
                  <span className="text-sm font-medium text-cyan-400">{currentListeners.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tempo Médio</span>
                  <span className="text-sm font-medium text-green-400">67 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Interações IA</span>
                  <span className="text-sm font-medium text-pink-400">1.247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Países Ativos</span>
                  <span className="text-sm font-medium text-purple-400">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">IA Performance</span>
                  <span className="text-sm font-medium text-yellow-400">99.7% Oscar</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Ranking Mundial</span>
                  <span className="text-sm font-medium text-yellow-400 flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    #1
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Admin Access Card */}
            <Card className="backdrop-blur-md bg-red-500/10 border-red-500/20">
              <CardContent className="p-4 text-center">
                <Settings className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h3 className="font-medium mb-2">Acesso Oscar Admin Master</h3>
                <p className="text-xs text-gray-400 mb-3">
                  Sistema de controle total Oscar de IA
                </p>
                <Button 
                  onClick={() => window.location.href = '/?admin'} 
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Dashboard Oscar
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Login: admin007 / Senha: admin007
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative z-10 mt-12 backdrop-blur-md bg-black/20 border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-400">
                © 2024 Rádio Trem AI. Sistema Oscar de IA - Nível Mundial Autogerenciável.
              </p>
              <div className="flex space-x-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                  <Brain className="w-3 h-3 mr-1" />
                  100% IA Oscar
                </Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  <Wifi className="w-3 h-3 mr-1" />
                  Auto-Start 24/7
                </Badge>
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                  <Crown className="w-3 h-3 mr-1" />
                  TOP 1 MUNDIAL
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/auth')}
                  className="text-gray-400 hover:text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.href = '/?admin'}
                  className="text-red-400 hover:text-red-300"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Oscar
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Sistema Oscar de Rádio IA Autogerenciável - Transmissão Premium 24/7
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
