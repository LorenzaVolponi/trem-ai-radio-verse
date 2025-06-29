
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Eye, 
  Share2, 
  Globe, 
  FileText,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SEOMetrics {
  organic_traffic: number;
  search_ranking: number;
  backlinks: number;
  page_speed: number;
  mobile_score: number;
  accessibility: number;
}

interface ContentSuggestion {
  title: string;
  keywords: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimated_traffic: number;
}

const SEOOptimizer = () => {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics>({
    organic_traffic: 12450,
    search_ranking: 3.2,
    backlinks: 89,
    page_speed: 92,
    mobile_score: 88,
    accessibility: 94
  });

  const [contentSuggestions] = useState<ContentSuggestion[]>([
    {
      title: "As Melhores Músicas de IA de 2024",
      keywords: ["música ia", "ai music", "música artificial"],
      description: "Lista curada das melhores criações musicais de IA do ano",
      priority: 'high',
      estimated_traffic: 2500
    },
    {
      title: "Como Funciona a Clonagem de Voz na Rádio",
      keywords: ["clonagem voz", "voice cloning", "ia voz"],
      description: "Explicação técnica sobre tecnologia de clonagem vocal",
      priority: 'high',
      estimated_traffic: 1800
    },
    {
      title: "Playlist: Sucessos Gerados por IA",
      keywords: ["playlist ia", "música gerada", "hits artificiais"],
      description: "Coletânea dos maiores sucessos criados por inteligência artificial",
      priority: 'medium',
      estimated_traffic: 1200
    },
    {
      title: "O Futuro das Rádios Autônomas",
      keywords: ["rádio autônoma", "future radio", "ai broadcasting"],
      description: "Análise sobre o futuro da radiodifusão com IA",
      priority: 'medium',
      estimated_traffic: 950
    }
  ]);

  const [metaTags, setMetaTags] = useState({
    title: "Rádio Trem AI - A Primeira Rádio Totalmente Autônoma",
    description: "Experimente o futuro da música com nossa rádio 100% autônoma. Músicas geradas por IA, vozes clonadas e programação inteligente 24/7.",
    keywords: "rádio ia, música artificial, ai radio, clonagem voz, música gerada",
    ogTitle: "Rádio Trem AI - Revolução na Radiodifusão",
    ogDescription: "A primeira rádio web totalmente autônoma do mundo. Música, vozes e conteúdo 100% gerados por IA.",
    twitterTitle: "🎵 Rádio Trem AI - O Futuro da Música",
    twitterDescription: "Ouça agora a primeira rádio totalmente autônoma! #AI #Radio #FuturoMusica"
  });

  const [socialSharing, setSocialSharing] = useState({
    autoShare: true,
    platforms: ['twitter', 'facebook', 'linkedin'],
    hashtagsAuto: ['#radioIA', '#musicaAI', '#futuromusica', '#radiotrem']
  });

  const { toast } = useToast();

  // Simular atualização de métricas
  useEffect(() => {
    const interval = setInterval(() => {
      setSeoMetrics(prev => ({
        ...prev,
        organic_traffic: prev.organic_traffic + Math.floor(Math.random() * 20) - 10,
        search_ranking: Math.max(1, Math.min(10, prev.search_ranking + (Math.random() * 0.2) - 0.1)),
        backlinks: prev.backlinks + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://radiotrem.ai/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://radiotrem.ai/playlist</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://radiotrem.ai/sobre</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();

    toast({
      title: "Sitemap gerado!",
      description: "O arquivo sitemap.xml foi baixado com sucesso",
    });
  };

  const optimizeContent = (suggestion: ContentSuggestion) => {
    toast({
      title: "Conteúdo otimizado!",
      description: `"${suggestion.title}" foi adicionado à programação com foco SEO`,
    });
  };

  const shareToSocial = (platform: string) => {
    const text = "🎵 Ouça agora a Rádio Trem AI - A primeira rádio totalmente autônoma! #radioIA #musicaAI";
    const url = "https://radiotrem.ai";
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-500/50';
      case 'medium': return 'text-yellow-400 border-yellow-500/50';
      case 'low': return 'text-green-400 border-green-500/50';
      default: return 'text-gray-400 border-gray-500/50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Métricas SEO */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-radio-green" />
            <span>Métricas SEO</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-radio-green" />
              <p className="text-lg font-bold text-white">{seoMetrics.organic_traffic.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Tráfego Orgânico</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Target className="w-6 h-6 mx-auto mb-2 text-radio-cyan" />
              <p className="text-lg font-bold text-white">#{seoMetrics.search_ranking.toFixed(1)}</p>
              <p className="text-xs text-gray-400">Ranking Médio</p>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/5">
              <ExternalLink className="w-6 h-6 mx-auto mb-2 text-radio-purple" />
              <p className="text-lg font-bold text-white">{seoMetrics.backlinks}</p>
              <p className="text-xs text-gray-400">Backlinks</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Page Speed</span>
              <span className={`text-sm font-medium ${getScoreColor(seoMetrics.page_speed)}`}>
                {seoMetrics.page_speed}/100
              </span>
            </div>
            <Progress value={seoMetrics.page_speed} className="h-2" />

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Mobile Score</span>
              <span className={`text-sm font-medium ${getScoreColor(seoMetrics.mobile_score)}`}>
                {seoMetrics.mobile_score}/100
              </span>
            </div>
            <Progress value={seoMetrics.mobile_score} className="h-2" />

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Acessibilidade</span>
              <span className={`text-sm font-medium ${getScoreColor(seoMetrics.accessibility)}`}>
                {seoMetrics.accessibility}/100
              </span>
            </div>
            <Progress value={seoMetrics.accessibility} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-effect border border-white/10">
          <TabsTrigger value="content" className="data-[state=active]:bg-radio-purple/30">
            <FileText className="w-4 h-4 mr-2" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="meta" className="data-[state=active]:bg-radio-purple/30">
            <Search className="w-4 h-4 mr-2" />
            Meta Tags
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-radio-purple/30">
            <Share2 className="w-4 h-4 mr-2" />
            Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Sugestões de Conteúdo */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-radio-purple" />
                  <span>Sugestões de Conteúdo</span>
                </div>
                <Button onClick={generateSitemap} variant="outline" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  Gerar Sitemap
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-white">{suggestion.title}</h3>
                        <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{suggestion.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {suggestion.keywords.map((keyword, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-radio-cyan/20 text-radio-cyan">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Tráfego estimado: {suggestion.estimated_traffic.toLocaleString()} visitantes/mês
                      </p>
                    </div>
                    <Button
                      onClick={() => optimizeContent(suggestion)}
                      size="sm"
                      className="bg-radio-purple hover:bg-radio-purple/80"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Otimizar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-radio-cyan" />
                <span>Meta Tags & SEO</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <Input
                    value={metaTags.title}
                    onChange={(e) => setMetaTags({...metaTags, title: e.target.value})}
                    className="glass-effect border-white/20 bg-white/5"
                  />
                  <p className="text-xs text-gray-500 mt-1">{metaTags.title.length}/60 caracteres</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
                  <Input
                    value={metaTags.keywords}
                    onChange={(e) => setMetaTags({...metaTags, keywords: e.target.value})}
                    className="glass-effect border-white/20 bg-white/5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <Textarea
                  value={metaTags.description}
                  onChange={(e) => setMetaTags({...metaTags, description: e.target.value})}
                  className="glass-effect border-white/20 bg-white/5"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">{metaTags.description.length}/160 caracteres</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">OG Title</label>
                  <Input
                    value={metaTags.ogTitle}
                    onChange={(e) => setMetaTags({...metaTags, ogTitle: e.target.value})}
                    className="glass-effect border-white/20 bg-white/5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Twitter Title</label>
                  <Input
                    value={metaTags.twitterTitle}
                    onChange={(e) => setMetaTags({...metaTags, twitterTitle: e.target.value})}
                    className="glass-effect border-white/20 bg-white/5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-radio-pink" />
                <span>Compartilhamento Social</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  onClick={() => shareToSocial('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 justify-start"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                
                <Button
                  onClick={() => shareToSocial('facebook')}
                  className="bg-blue-700 hover:bg-blue-800 justify-start"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                
                <Button
                  onClick={() => shareToSocial('linkedin')}
                  className="bg-blue-600 hover:bg-blue-700 justify-start"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hashtags Automáticas</label>
                <Input
                  value={socialSharing.hashtagsAuto.join(' ')}
                  onChange={(e) => setSocialSharing({
                    ...socialSharing, 
                    hashtagsAuto: e.target.value.split(' ')
                  })}
                  className="glass-effect border-white/20 bg-white/5"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOOptimizer;
