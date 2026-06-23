
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Users, 
  Activity, 
  TrendingUp, 
  Brain,
  Radio,
  Heart,
  Zap,
  Clock,
  MapPin,
  Headphones,
  Volume2,
  Star,
  Trophy
} from 'lucide-react';

interface GlobalMetrics {
  totalListeners: number;
  countriesActive: number;
  averageSessionTime: number;
  aiPerformance: number;
  engagementRate: number;
  voiceInteractions: number;
  songsGenerated: number;
  systemUptime: number;
}

interface CountryData {
  country: string;
  listeners: number;
  percentage: number;
  flag: string;
}

interface TopTrack {
  title: string;
  artist: string;
  plays: number;
  aiGenerated: boolean;
}

const GlobalRadioMonitor = () => {
  const [metrics, setMetrics] = useState<GlobalMetrics>({
    totalListeners: 12847,
    countriesActive: 89,
    averageSessionTime: 47,
    aiPerformance: 98.7,
    engagementRate: 76.4,
    voiceInteractions: 2347,
    songsGenerated: 856,
    systemUptime: 99.98
  });

  const [topCountries] = useState<CountryData[]>([
    { country: 'Brasil', listeners: 4250, percentage: 33.1, flag: '🇧🇷' },
    { country: 'Estados Unidos', listeners: 2180, percentage: 17.0, flag: '🇺🇸' },
    { country: 'Portugal', listeners: 1340, percentage: 10.4, flag: '🇵🇹' },
    { country: 'Reino Unido', listeners: 890, percentage: 6.9, flag: '🇬🇧' },
    { country: 'Canadá', listeners: 720, percentage: 5.6, flag: '🇨🇦' },
    { country: 'França', listeners: 650, percentage: 5.1, flag: '🇫🇷' },
    { country: 'Alemanha', listeners: 580, percentage: 4.5, flag: '🇩🇪' },
    { country: 'Outros', listeners: 2237, percentage: 17.4, flag: '🌍' }
  ]);

  const [topTracks] = useState<TopTrack[]>([
    { title: 'Voz do Amanhã Premium', artist: 'IA Vocal Elite', plays: 15200, aiGenerated: true },
    { title: 'Batida Cósmica 2.0', artist: 'MusicGen Ultra', plays: 12800, aiGenerated: true },
    { title: 'Harmonia Sintética', artist: 'AI Composer Pro', plays: 11400, aiGenerated: true },
    { title: 'Flash News IA', artist: 'Locução Neural', plays: 9600, aiGenerated: true },
    { title: 'Ritmo Quântico', artist: 'Suno AI Premium', plays: 8900, aiGenerated: true }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalListeners: prev.totalListeners + Math.floor(Math.random() * 50) - 25,
        averageSessionTime: Math.max(20, Math.min(90, prev.averageSessionTime + (Math.random() - 0.5) * 5)),
        aiPerformance: Math.max(95, Math.min(100, prev.aiPerformance + (Math.random() - 0.5) * 0.5)),
        engagementRate: Math.max(60, Math.min(90, prev.engagementRate + (Math.random() - 0.5) * 2)),
        voiceInteractions: prev.voiceInteractions + Math.floor(Math.random() * 10),
        songsGenerated: prev.songsGenerated + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-radio-purple" />
            <span>Monitoramento Global</span>
            <Badge variant="outline" className="border-green-500/50 text-green-400 animate-pulse">
              <Activity className="w-3 h-3 mr-1" />
              AO VIVO
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-radio-purple/20 to-radio-cyan/20">
              <Users className="w-8 h-8 mx-auto mb-2 text-radio-cyan" />
              <p className="text-2xl font-bold text-white">{formatNumber(metrics.totalListeners)}</p>
              <p className="text-sm text-gray-400">Ouvintes Globais</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-radio-green/20 to-radio-cyan/20">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-radio-green" />
              <p className="text-2xl font-bold text-white">{metrics.countriesActive}</p>
              <p className="text-sm text-gray-400">Países Ativos</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-radio-pink/20 to-radio-purple/20">
              <Clock className="w-8 h-8 mx-auto mb-2 text-radio-pink" />
              <p className="text-2xl font-bold text-white">{metrics.averageSessionTime}min</p>
              <p className="text-sm text-gray-400">Tempo Médio</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
              <Brain className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold text-white">{metrics.aiPerformance}%</p>
              <p className="text-sm text-gray-400">IA Performance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI System Status */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-radio-purple" />
              <span>Sistema IA Mundial</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Performance Neural</span>
                <span className="text-green-400">{metrics.aiPerformance}%</span>
              </div>
              <Progress value={metrics.aiPerformance} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engajamento dos Ouvintes</span>
                <span className="text-blue-400">{metrics.engagementRate}%</span>
              </div>
              <Progress value={metrics.engagementRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uptime do Sistema</span>
                <span className="text-green-400">{metrics.systemUptime}%</span>
              </div>
              <Progress value={metrics.systemUptime} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center p-2 rounded-lg bg-white/5">
                <Volume2 className="w-5 h-5 mx-auto mb-1 text-radio-cyan" />
                <p className="text-lg font-bold text-white">{formatNumber(metrics.voiceInteractions)}</p>
                <p className="text-xs text-gray-400">Interações IA</p>
              </div>
              
              <div className="text-center p-2 rounded-lg bg-white/5">
                <Radio className="w-5 h-5 mx-auto mb-1 text-radio-pink" />
                <p className="text-lg font-bold text-white">{formatNumber(metrics.songsGenerated)}</p>
                <p className="text-xs text-gray-400">Músicas Geradas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Distribution */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-radio-green" />
              <span>Distribuição Global</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">{country.country}</span>
                      <span className="text-sm text-gray-400">{formatNumber(country.listeners)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-radio-purple to-radio-cyan h-2 rounded-full transition-all duration-500"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 w-12 text-right">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tracks Powered by AI */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Top Mundial - Conteúdo IA</span>
            </div>
            <Badge variant="outline" className="border-radio-purple/50 text-radio-purple">
              <Brain className="w-3 h-3 mr-1" />
              100% IA
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTracks.map((track, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-radio-purple to-radio-cyan text-white font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-white">{track.title}</h3>
                    {track.aiGenerated && (
                      <Badge variant="outline" className="border-radio-cyan/50 text-radio-cyan text-xs">
                        <Brain className="w-2 h-2 mr-1" />
                        IA
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-radio-green">{formatNumber(track.plays)}</p>
                  <p className="text-xs text-gray-400">reproduções</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <Headphones className="w-4 h-4 text-radio-cyan" />
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Feed */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-radio-cyan" />
            <span>Atividade Tempo Real</span>
            <Badge variant="outline" className="border-green-500/50 text-green-400 animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Novo ouvinte conectou do Brasil</span>
              <span className="text-xs text-gray-500">agora</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">IA gerou nova música: "Ritmo Temporal"</span>
              <span className="text-xs text-gray-500">2s</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Interação de voz processada dos EUA</span>
              <span className="text-xs text-gray-500">5s</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Sistema otimizado automaticamente</span>
              <span className="text-xs text-gray-500">8s</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalRadioMonitor;
