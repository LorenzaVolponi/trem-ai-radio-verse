
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  Globe, 
  Heart, 
  MessageCircle, 
  Share2,
  Clock,
  Activity,
  Headphones,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LiveStatsProps {
  listeners: number;
}

const LiveStats: React.FC<LiveStatsProps> = ({ listeners }) => {
  const [audienceData, setAudienceData] = useState([
    { time: '10:00', listeners: 1180 },
    { time: '11:00', listeners: 1250 },
    { time: '12:00', listeners: 1420 },
    { time: '13:00', listeners: 1680 },
    { time: '14:00', listeners: listeners },
  ]);

  const [demographics, setDemographics] = useState([
    { name: '18-25', value: 35, color: '#8B5CF6' },
    { name: '26-35', value: 28, color: '#EC4899' },
    { name: '36-45', value: 22, color: '#3B82F6' },
    { name: '46+', value: 15, color: '#06B6D4' },
  ]);

  const [countries, setCountries] = useState([
    { name: 'Brasil', percentage: 45, flag: '🇧🇷' },
    { name: 'Estados Unidos', percentage: 20, flag: '🇺🇸' },
    { name: 'Portugal', percentage: 12, flag: '🇵🇹' },
    { name: 'Argentina', percentage: 8, flag: '🇦🇷' },
    { name: 'Outros', percentage: 15, flag: '🌍' },
  ]);

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    avgListenTime: 47,
    bounceRate: 12,
    engagement: 89,
    satisfaction: 94
  });

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-radio-purple" />
              <div>
                <p className="text-2xl font-bold text-white">{listeners.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Ouvintes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-radio-green" />
              <div>
                <p className="text-2xl font-bold text-white">+12%</p>
                <p className="text-sm text-gray-400">vs. Ontem</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-radio-cyan" />
              <div>
                <p className="text-2xl font-bold text-white">47min</p>
                <p className="text-sm text-gray-400">Tempo Médio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-radio-pink" />
              <div>
                <p className="text-2xl font-bold text-white">94%</p>
                <p className="text-sm text-gray-400">Satisfação</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Audiência */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-radio-purple" />
            <span>Audiência nas Últimas Horas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={audienceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="listeners" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demografia */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-radio-cyan" />
              <span>Demografia dos Ouvintes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {demographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {demographics.map((item, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-white/20"
                  style={{ borderColor: item.color + '50', color: item.color }}
                >
                  {item.name}: {item.value}%
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Países */}
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-radio-green" />
              <span>Audiência por País</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {countries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm text-gray-300">{country.name}</span>
                </div>
                <div className="flex items-center space-x-2 flex-1 max-w-32">
                  <Progress value={country.percentage} className="flex-1" />
                  <span className="text-sm text-gray-400 w-8">{country.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Métricas de Engajamento */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-radio-pink" />
            <span>Métricas de Engajamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-radio-purple/20 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-radio-purple" />
              </div>
              <p className="text-2xl font-bold text-white">{realTimeMetrics.avgListenTime}min</p>
              <p className="text-sm text-gray-400">Tempo Médio de Escuta</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-radio-cyan/20 flex items-center justify-center">
                <Activity className="w-8 h-8 text-radio-cyan" />
              </div>
              <p className="text-2xl font-bold text-white">{realTimeMetrics.bounceRate}%</p>
              <p className="text-sm text-gray-400">Taxa de Rejeição</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-radio-green/20 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-radio-green" />
              </div>
              <p className="text-2xl font-bold text-white">{realTimeMetrics.engagement}%</p>
              <p className="text-sm text-gray-400">Engajamento</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-radio-pink/20 flex items-center justify-center">
                <Heart className="w-8 h-8 text-radio-pink" />
              </div>
              <p className="text-2xl font-bold text-white">{realTimeMetrics.satisfaction}%</p>
              <p className="text-sm text-gray-400">Satisfação</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveStats;
