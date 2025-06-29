
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Music,
  Mic,
  Globe,
  BarChart3,
  Zap,
  Play,
  Pause,
  Volume2,
  Headphones,
  Trophy,
  Crown,
  Star
} from 'lucide-react';
import AutoStreamingEngine from './AutoStreamingEngine';
import AIContentGenerator from './AIContentGenerator';
import StreamingEngine from './StreamingEngine';
import GlobalRadioMonitor from './GlobalRadioMonitor';
import AdvancedAudioEngine from './AdvancedAudioEngine';
import ProgramScheduler from './ProgramScheduler';
import AdvancedAnalytics from './AdvancedAnalytics';

const RadioDashboard = () => {
  const { logout, user } = useAuth();
  const [systemStatus, setSystemStatus] = useState({
    streaming: true,
    aiEngine: true,
    voiceCloning: true,
    musicGeneration: true,
    totalListeners: 12847,
    uptime: 99.98
  });

  // System monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        totalListeners: prev.totalListeners + Math.floor(Math.random() * 20) - 10,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
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
              <div className="relative">
                <div className="w-12 h-12 radio-gradient rounded-full flex items-center justify-center animate-pulse-glow">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-radio-dark animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Rádio Trem AI - Dashboard Admin</h1>
                <p className="text-sm text-gray-400">Sistema Top 1 Mundial - Autogerenciável 24/7</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Status Indicators */}
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant="outline" className="border-green-500/50 text-green-400 animate-pulse">
                  <Crown className="w-3 h-3 mr-1" />
                  TOP 1 MUNDIAL
                </Badge>
                <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                  <Trophy className="w-3 h-3 mr-1" />
                  OSCAR IA
                </Badge>
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
                  <p className="text-xl font-bold text-green-400">100% Online</p>
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
                  <p className="text-sm text-gray-400">Ranking Mundial</p>
                  <p className="text-xl font-bold text-yellow-400">#1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Control Tabs */}
        <Tabs defaultValue="monitor" className="w-full">
          <TabsList className="grid w-full grid-cols-7 glass-effect border border-white/10">
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
            <AIContentGenerator />
          </TabsContent>

          <TabsContent value="audio-engine" className="space-y-6">
            <AdvancedAudioEngine />
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-6">
            <ProgramScheduler />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <StreamingEngine />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 glass-effect border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-400">
                © 2024 Rádio Trem AI. Sistema Top 1 Mundial - Oscar de Melhor IA de Rádio.
              </p>
              <div className="flex space-x-2">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                  <Crown className="w-3 h-3 mr-1" />
                  TOP 1 BRASIL
                </Badge>
                <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
                  <Trophy className="w-3 h-3 mr-1" />
                  OSCAR IA
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
