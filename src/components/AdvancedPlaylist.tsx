
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  Shuffle,
  Repeat,
  Heart,
  Plus,
  Clock,
  TrendingUp,
  Filter,
  Search,
  Star,
  Zap,
  Volume2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  duration?: number;
  cover_url?: string;
  is_ai_generated: boolean;
  suno_id?: string;
  created_at: string;
  plays?: number;
  liked?: boolean;
}

interface Playlist {
  id: string;
  name: string;
  description?: string;
  cover_url?: string;
  tracks: Track[];
  duration: number;
  created_at: string;
}

const AdvancedPlaylist = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  // Carregar tracks do banco de dados
  const loadTracks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTracks: Track[] = data.map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: track.album,
        genre: track.genre,
        duration: track.duration || 0,
        cover_url: track.cover_url,
        is_ai_generated: track.is_ai_generated || false,
        suno_id: track.suno_id,
        created_at: track.created_at,
        plays: Math.floor(Math.random() * 1000) + 50,
        liked: Math.random() > 0.7
      }));

      setTracks(formattedTracks);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Criar playlist automática baseada em gênero ou mood
  const createSmartPlaylist = (type: 'genre' | 'mood' | 'ai' | 'trending') => {
    let filteredTracks: Track[] = [];
    let playlistName = '';

    switch (type) {
      case 'ai':
        filteredTracks = tracks.filter(track => track.is_ai_generated);
        playlistName = 'IA Geradas';
        break;
      case 'trending':
        filteredTracks = tracks
          .filter(track => track.plays && track.plays > 500)
          .sort((a, b) => (b.plays || 0) - (a.plays || 0))
          .slice(0, 20);
        playlistName = 'Trending Now';
        break;
      case 'genre':
        const genres = [...new Set(tracks.map(t => t.genre).filter(Boolean))];
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        filteredTracks = tracks.filter(track => track.genre === randomGenre).slice(0, 15);
        playlistName = `${randomGenre} Mix`;
        break;
      case 'mood':
        filteredTracks = tracks.filter(track => track.liked).slice(0, 25);
        playlistName = 'Favoritas';
        break;
    }

    const totalDuration = filteredTracks.reduce((acc, track) => acc + (track.duration || 0), 0);

    const newPlaylist: Playlist = {
      id: `playlist_${Date.now()}`,
      name: playlistName,
      description: `Gerada automaticamente • ${filteredTracks.length} músicas`,
      tracks: filteredTracks,
      duration: totalDuration,
      created_at: new Date().toISOString()
    };

    setPlaylists(prev => [newPlaylist, ...prev]);
    
    toast({
      title: "Playlist criada!",
      description: `"${playlistName}" foi criada com ${filteredTracks.length} músicas`,
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPlaylistDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    toast({
      title: "Tocando agora",
      description: `${track.title} - ${track.artist}`,
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.plays || 0) - (a.plays || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const genres = [...new Set(tracks.map(t => t.genre).filter(Boolean))];

  useEffect(() => {
    loadTracks();
  }, []);

  return (
    <div className="space-y-6">
      {/* Player Atual */}
      {currentTrack && (
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-lg flex items-center justify-center">
                {currentTrack.cover_url ? (
                  <img 
                    src={currentTrack.cover_url} 
                    alt={currentTrack.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Music className="w-8 h-8 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-white">{currentTrack.title}</h3>
                <p className="text-sm text-gray-400">{currentTrack.artist}</p>
                {currentTrack.is_ai_generated && (
                  <Badge variant="outline" className="border-radio-purple/50 text-radio-purple mt-1">
                    <Zap className="w-3 h-3 mr-1" />
                    IA
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-400"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="tracks" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-effect border border-white/10">
          <TabsTrigger value="tracks" className="data-[state=active]:bg-radio-purple/30">
            <Music className="w-4 h-4 mr-2" />
            Biblioteca
          </TabsTrigger>
          <TabsTrigger value="playlists" className="data-[state=active]:bg-radio-purple/30">
            <Volume2 className="w-4 h-4 mr-2" />
            Playlists
          </TabsTrigger>
          <TabsTrigger value="smart" className="data-[state=active]:bg-radio-purple/30">
            <Star className="w-4 h-4 mr-2" />
            Smart Mix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="space-y-4">
          {/* Controles de Busca e Filtro */}
          <Card className="glass-effect border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar músicas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-effect border-white/20 bg-white/5"
                  />
                </div>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-3 py-2 glass-effect border-white/20 bg-white/5 text-white rounded-md"
                >
                  <option value="all">Todos os gêneros</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 glass-effect border-white/20 bg-white/5 text-white rounded-md"
                >
                  <option value="recent">Mais recentes</option>
                  <option value="popular">Mais tocadas</option>
                  <option value="title">Por título</option>
                  <option value="artist">Por artista</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Tracks */}
          <Card className="glass-effect border-white/10">
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredTracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className={`flex items-center space-x-4 p-3 hover:bg-white/10 transition-colors cursor-pointer ${
                      currentTrack?.id === track.id ? 'bg-radio-purple/20' : ''
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="w-2 text-xs text-gray-400">
                      {index + 1}
                    </div>
                    
                    <div className="w-12 h-12 bg-gradient-to-br from-radio-purple to-radio-cyan rounded flex items-center justify-center">
                      {track.cover_url ? (
                        <img 
                          src={track.cover_url} 
                          alt={track.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <Music className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-white truncate">{track.title}</h3>
                        {track.is_ai_generated && (
                          <Badge variant="outline" className="border-radio-purple/50 text-radio-purple text-xs">
                            IA
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                      {track.genre && (
                        <p className="text-xs text-gray-500">{track.genre}</p>
                      )}
                    </div>

                    <div className="text-xs text-gray-400 flex items-center space-x-4">
                      <span>{track.plays} plays</span>
                      <span>{formatDuration(track.duration || 0)}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="glass-effect border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-lg flex items-center justify-center">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{playlist.name}</h3>
                      <p className="text-sm text-gray-400">{playlist.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{playlist.tracks.length} músicas</span>
                        <span>{formatPlaylistDuration(playlist.duration)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="smart" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-radio-purple" />
                <span>Criação Inteligente de Playlists</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  onClick={() => createSmartPlaylist('ai')}
                  className="bg-radio-purple hover:bg-radio-purple/80 h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <Zap className="w-6 h-6" />
                  <span className="text-xs">IA Geradas</span>
                </Button>
                
                <Button
                  onClick={() => createSmartPlaylist('trending')}
                  className="bg-radio-cyan hover:bg-radio-cyan/80 h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-xs">Trending</span>
                </Button>
                
                <Button
                  onClick={() => createSmartPlaylist('genre')}
                  className="bg-radio-green hover:bg-radio-green/80 h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <Filter className="w-6 h-6" />
                  <span className="text-xs">Por Gênero</span>
                </Button>
                
                <Button
                  onClick={() => createSmartPlaylist('mood')}
                  className="bg-radio-pink hover:bg-radio-pink/80 h-auto py-4 flex flex-col items-center space-y-2"
                >
                  <Heart className="w-6 h-6" />
                  <span className="text-xs">Favoritas</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPlaylist;
