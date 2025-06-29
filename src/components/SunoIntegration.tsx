import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  Music, 
  Download, 
  Play, 
  Pause, 
  ExternalLink,
  Bot,
  Heart,
  Share2,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SunoTrack {
  [key: string]: unknown;
  id: string;
  title: string;
  description: string;
  audio_url: string;
  video_url: string;
  image_url: string;
  duration: number;
  created_at: string;
  tags: string[];
  is_public: boolean;
  user_id: string;
  username: string;
}

const SunoIntegration = () => {
  const [tracks, setTracks] = useState<SunoTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SunoTrack | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [importedTracks, setImportedTracks] = useState<Set<string>>(new Set());
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Simular busca no Suno (@groovebot profile)
  const fetchSunoTracks = useCallback(async () => {
    setLoading(true);
    try {
      // Simulando dados do perfil @groovebot
      const mockTracks: SunoTrack[] = [
        {
          id: 'suno_1',
          title: 'Cosmic Melody',
          description: 'An ethereal journey through space and time',
          audio_url: 'https://example.com/cosmic-melody.mp3',
          video_url: 'https://example.com/cosmic-melody.mp4',
          image_url: 'https://example.com/cosmic-melody-cover.jpg',
          duration: 210,
          created_at: '2024-01-15T10:30:00Z',
          tags: ['ambient', 'electronic', 'space'],
          is_public: true,
          user_id: 'groovebot_id',
          username: 'groovebot'
        },
        {
          id: 'suno_2',
          title: 'Digital Dreams',
          description: 'Synthwave meets modern AI composition',
          audio_url: 'https://example.com/digital-dreams.mp3',
          video_url: 'https://example.com/digital-dreams.mp4',
          image_url: 'https://example.com/digital-dreams-cover.jpg',
          duration: 195,
          created_at: '2024-01-14T15:45:00Z',
          tags: ['synthwave', 'ai', 'retro'],
          is_public: true,
          user_id: 'groovebot_id',
          username: 'groovebot'
        },
        {
          id: 'suno_3',
          title: 'Neural Networks',
          description: 'The sound of artificial intelligence thinking',
          audio_url: 'https://example.com/neural-networks.mp3',
          video_url: 'https://example.com/neural-networks.mp4',
          image_url: 'https://example.com/neural-networks-cover.jpg',
          duration: 240,
          created_at: '2024-01-13T08:20:00Z',
          tags: ['experimental', 'ai', 'techno'],
          is_public: true,
          user_id: 'groovebot_id',
          username: 'groovebot'
        }
      ];

      setTracks(mockTracks);
      
      toast({
        title: "Músicas carregadas!",
        description: `${mockTracks.length} faixas encontradas do @groovebot`,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar músicas do Suno';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const importTrackToRadio = async (track: SunoTrack) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para importar músicas",
        variant: "destructive",
      });
      return;
    }

    try {
      // Properly format metadata as JSON
      const metadata = {
        suno_data: {
          id: track.id,
          title: track.title,
          description: track.description,
          tags: track.tags,
          username: track.username
        },
        imported_from: 'suno_groovebot',
        original_description: track.description
      };

      const { error } = await supabase
        .from('tracks')
        .insert({
          title: track.title,
          artist: track.username,
          album: 'Suno AI Collection',
          genre: track.tags.join(', '),
          file_url: track.audio_url,
          cover_url: track.image_url,
          duration: track.duration,
          suno_id: track.id,
          is_ai_generated: true,
          created_by: user.id,
          metadata: metadata
        });

      if (error) throw error;

      setImportedTracks(prev => new Set([...prev, track.id]));
      
      toast({
        title: "Música importada!",
        description: `"${track.title}" foi adicionada à sua rádio`,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive",
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchSunoTracks();
  }, [fetchSunoTracks]);

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-radio-purple" />
            <span>Suno AI Music (@groovebot)</span>
            <Badge variant="outline" className="border-radio-green/50 text-radio-green">
              IA Generated
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Controls */}
            <div className="flex space-x-2">
              <Input
                placeholder="Buscar músicas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-effect border-white/20 bg-white/5"
              />
              <Button 
                onClick={fetchSunoTracks}
                disabled={loading}
                className="bg-radio-purple hover:bg-radio-purple/80"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Atualizar
              </Button>
            </div>

            {/* Track List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTracks.map((track) => (
                <div 
                  key={track.id}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-lg flex items-center justify-center">
                      {track.image_url ? (
                        <img 
                          src={track.image_url} 
                          alt={track.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Music className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-radio-purple rounded-full flex items-center justify-center">
                      <Bot className="w-2 h-2 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{track.title}</h3>
                    <p className="text-sm text-gray-400 truncate">by @{track.username}</p>
                    <p className="text-xs text-gray-500 truncate">{track.description}</p>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">{formatDuration(track.duration)}</span>
                      <div className="flex space-x-1">
                        {track.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-radio-cyan/50 text-radio-cyan">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentTrack(track)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`https://suno.com/song/${track.id}`, '_blank')}
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>

                    <Button
                      onClick={() => importTrackToRadio(track)}
                      disabled={importedTracks.has(track.id)}
                      size="sm"
                      className={`${
                        importedTracks.has(track.id) 
                          ? 'bg-green-600 hover:bg-green-600' 
                          : 'bg-radio-purple hover:bg-radio-purple/80'
                      }`}
                    >
                      {importedTracks.has(track.id) ? (
                        'Importado'
                      ) : (
                        <>
                          <Download className="w-3 h-3 mr-1" />
                          Importar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredTracks.length === 0 && !loading && (
              <div className="text-center py-8">
                <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Nenhuma música encontrada</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Currently Playing Preview */}
      {currentTrack && (
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Preview - {currentTrack.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{currentTrack.title}</p>
                <p className="text-xs text-gray-400">{currentTrack.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentTrack(null)}
                className="text-gray-400 hover:text-white"
              >
                <Pause className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SunoIntegration;
