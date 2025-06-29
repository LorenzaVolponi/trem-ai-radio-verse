
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Activity, 
  Radio,
  Music,
  Heart,
  Share2,
  Eye,
  Zap,
  Target,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Headphones
} from 'lucide-react';

interface AnalyticsData {
  realTimeListeners: number;
  totalListeners24h: number;
  averageListenTime: number;
  peakListeners: number;
  engagementRate: number;
  bounceRate: number;
  shareRate: number;
  mobileUsers: number;
  desktopUsers: number;
  internationalUsers: number;
  topCountries: { name: string; listeners: number; percentage: number }[];
  hourlyData: { hour: string; listeners: number; engagement: number }[];
  topTracks: { title: string; artist: string; plays: number; likes: number }[];
  socialMetrics: { platform: string; shares: number; engagement: number }[];
}

const AdvancedAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    realTimeListeners: 2847,
    totalListeners24h: 15420,
    averageListenTime: 47,
    peakListeners: 4320,
    engagementRate: 73.5,
    bounceRate: 18.2,
    shareRate: 12.8,
    mobileUsers: 65,
    desktopUsers: 35,
    internationalUsers: 28,
    topCountries: [
      { name: 'Brasil', listeners: 10854, percentage: 70.3 },
      { name: 'Argentina', listeners: 1542, percentage: 10.0 },
      { name: 'Portugal', listeners: 926, percentage: 6.0 },
      { name: 'Chile', listeners: 771, percentage: 5.0 },
      { name: 'Outros', listeners: 1327, percentage: 8.7 }
    ],
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      listeners: Math.floor(Math.random() * 3000) + 1000,
      engagement: Math.floor(Math.random() * 40) + 60
    })),
    topTracks: [
      { title: 'Voz do Amanhã', artist: 'IA Vocal', plays: 1247, likes: 892 },
      { title: 'Batida Cósmica', artist: 'Gerador Musical', plays: 1156, likes: 834 },
      { title: 'Melodia Sintética', artist: 'AI Composer', plays: 1089, likes: 756 },
      { title: 'Ritmo Neural', artist: 'Deep AI', plays: 967, likes: 623 },
      { title: 'Harmonia Digital', artist: 'Synth AI', plays: 845, likes: 578 }
    ],
    socialMetrics: [
      { platform: 'Instagram', shares: 2341, engagement: 87 },
      { platform: 'Twitter', shares: 1876, engagement: 92 },
      { platform: 'TikTok', shares: 3421, engagement: 95 },
      { platform: 'Facebook', shares: 1234, engagement: 78 },
      { platform: 'WhatsApp', shares: 4532, engagement: 89 }
    ]
  });

  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Real-time data updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        realTimeListeners: Math.max(0, prev.realTimeListeners + Math.floor((Math.random() - 0.5) * 200)),
        engagementRate: Math.max(50, Math.min(100, prev.engagementRate + (Math.random() - 0.5) * 2)),
        shareRate: Math.max(5, Math.min(25, prev.shareRate + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getEngagementColor = (rate: number) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Real-time Overview */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-radio-purple" />
              <span>Analytics em Tempo Real</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Ao Vivo</span>
              </div>
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? "bg-radio-purple" : ""}
              >
                Auto-refresh
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Headphones className="w-8 h-8 mx-auto mb-2 text-radio-cyan" />
              <p className="text-2xl font-bold text-white">
                {analytics.realTimeListeners.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Ouvintes Agora</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-radio-green" />
              <p className="text-2xl font-bold text-white">
                {formatNumber(analytics.totalListeners24h)}
              </p>
              <p className="text-sm text-gray-400">Total 24h</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-radio-pink" />
              <p className="text-2xl font-bold text-white">{analytics.averageListenTime}min</p>
              <p className="text-sm text-gray-400">Tempo Médio</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-radio-purple" />
              <p className="text-2xl font-bold text-white">
                {formatNumber(analytics.peakListeners)}
              </p>
              <p className="text-sm text-gray-400">Pico de Audiência</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-radio-pink" />
            <span>Métricas de Engajamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Taxa de Engajamento</span>
                <span className={`text-sm font-medium ${getEngagementColor(analytics.engagementRate)}`}>
                  {analytics.engagementRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={analytics.engagementRate} className="h-2" />
              <p className="text-xs text-gray-400">
                {analytics.engagementRate >= 70 ? 'Excelente' : 
                 analytics.engagementRate >= 50 ? 'Bom' : 'Precisa melhorar'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Taxa de Rejeição</span>
                <span className="text-sm font-medium text-green-400">
                  {analytics.bounceRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={100 - analytics.bounceRate} className="h-2" />
              <p className="text-xs text-gray-400">
                {analytics.bounceRate < 25 ? 'Excelente' : 
                 analytics.bounceRate < 40 ? 'Bom' : 'Alto'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Taxa de Compartilhamento</span>
                <span className="text-sm font-medium text-radio-cyan">
                  {analytics.shareRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={analytics.shareRate * 4} className="h-2" />
              <p className="text-xs text-gray-400">
                {analytics.shareRate >= 15 ? 'Viral' : 
                 analytics.shareRate >= 10 ? 'Bom' : 'Moderado'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audience Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-radio-cyan" />
              <span>Audiência por País</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">{country.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      {country.listeners.toLocaleString()}
                    </span>
                    <div className="w-20">
                      <Progress value={country.percentage} className="h-1" />
                    </div>
                    <span className="text-xs text-gray-400 w-10">
                      {country.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-radio-green" />
              <span>Dispositivos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-radio-cyan" />
                <span className="text-sm">Mobile</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={analytics.mobileUsers} className="w-20 h-2" />
                <span className="text-sm font-medium">{analytics.mobileUsers}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-radio-purple" />
                <span className="text-sm">Desktop</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={analytics.desktopUsers} className="w-20 h-2" />
                <span className="text-sm font-medium">{analytics.desktopUsers}%</span>
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-400">Usuários Internacionais</span>
                <span className="text-sm font-medium text-blue-400">
                  {analytics.internationalUsers}%
                </span>
              </div>
              <Progress value={analytics.internationalUsers} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Content */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Music className="w-5 h-5 text-radio-pink" />
            <span>Conteúdo Mais Popular</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topTracks.map((track, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-white">{track.title}</h4>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Radio className="w-3 h-3 text-radio-cyan" />
                      <span className="text-gray-400">{track.plays}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-radio-pink" />
                      <span className="text-gray-400">{track.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Performance */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-radio-cyan" />
            <span>Performance Redes Sociais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {analytics.socialMetrics.map((social, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-lg flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{social.platform}</h4>
                <p className="text-lg font-bold text-radio-cyan">
                  {formatNumber(social.shares)}
                </p>
                <p className="text-xs text-gray-400">
                  {social.engagement}% engajamento
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
