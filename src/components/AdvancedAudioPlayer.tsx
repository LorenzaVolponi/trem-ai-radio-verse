
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Repeat,
  Shuffle,
  Download,
  Heart,
  Share2,
  Music,
  Radio,
  Search,
  List,
  Filter
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  file_url: string;
  cover_url?: string;
  duration?: number;
  is_ai_generated: boolean;
  suno_id?: string;
}

interface AdvancedAudioPlayerProps {
  currentTrack?: Track;
  isLive?: boolean;
}

const AdvancedAudioPlayer: React.FC<AdvancedAudioPlayerProps> = ({ 
  currentTrack, 
  isLive = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [filteredPlaylist, setFilteredPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());

  const audioRef = useRef<HTMLAudioElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadTracks = useCallback(async () => {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading tracks:', error);
      return;
    }

    setPlaylist(data || []);
  }, []);

  const loadLikedTracks = useCallback(async () => {
    if (!user) return;

    // This would come from a likes table in a real implementation
    // For now, we'll use localStorage
    const liked = localStorage.getItem(`liked_tracks_${user.id}`);
    if (liked) {
      setLikedTracks(new Set(JSON.parse(liked)));
    }
  }, [user]);

  useEffect(() => {
    loadTracks();
    loadLikedTracks();
  }, [loadTracks, loadLikedTracks]);

  // Filter playlist based on search and genre
  useEffect(() => {
    let filtered = playlist;

    if (searchTerm) {
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genreFilter !== 'all') {
      filtered = filtered.filter(track => track.genre === genreFilter);
    }

    setFilteredPlaylist(filtered);
  }, [playlist, searchTerm, genreFilter]);

  const playTrack = async (track: Track, trackIndex?: number) => {
    if (!audioRef.current) return;

    try {
      audioRef.current.src = track.file_url;
      audioRef.current.load();
      
      await audioRef.current.play();
      setIsPlaying(true);
      
      if (trackIndex !== undefined) {
        setCurrentTrackIndex(trackIndex);
      }

      // Log listening stats
      await supabase.from('listening_stats').insert({
        user_id: user?.id,
        track_id: track.id,
        source: 'web'
      });

    } catch (error) {
      console.error('Error playing track:', error);
      toast({
        title: "Erro",
        description: "Não foi possível reproduzir a música.",
        variant: "destructive",
      });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipNext = () => {
    if (filteredPlaylist.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * filteredPlaylist.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % filteredPlaylist.length;
    }

    playTrack(filteredPlaylist[nextIndex], nextIndex);
  };

  const skipPrevious = () => {
    if (filteredPlaylist.length === 0) return;

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * filteredPlaylist.length);
    } else {
      prevIndex = currentTrackIndex === 0 ? filteredPlaylist.length - 1 : currentTrackIndex - 1;
    }

    playTrack(filteredPlaylist[prevIndex], prevIndex);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (isRepeated) {
      audioRef.current?.play();
    } else {
      skipNext();
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const toggleLike = async (trackId: string) => {
    if (!user) return;

    const newLikedTracks = new Set(likedTracks);
    if (likedTracks.has(trackId)) {
      newLikedTracks.delete(trackId);
    } else {
      newLikedTracks.add(trackId);
    }

    setLikedTracks(newLikedTracks);
    localStorage.setItem(`liked_tracks_${user.id}`, JSON.stringify([...newLikedTracks]));

    toast({
      title: likedTracks.has(trackId) ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${currentTrack?.title} foi ${likedTracks.has(trackId) ? 'removido dos' : 'adicionado aos'} seus favoritos.`,
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getGenres = () => {
    const genres = [...new Set(playlist.map(track => track.genre).filter(Boolean))];
    return genres;
  };

  const activeTrack = currentTrack || (filteredPlaylist.length > 0 ? filteredPlaylist[currentTrackIndex] : null);

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Main Player */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-6">
          <div className="space-y-6">
            
            {/* Track Info */}
            {activeTrack && (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-20 h-20 bg-gradient-to-br from-radio-purple via-radio-pink to-radio-cyan rounded-xl flex items-center justify-center shadow-lg">
                    {activeTrack.cover_url ? (
                      <img 
                        src={activeTrack.cover_url} 
                        alt={activeTrack.title} 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Music className="w-8 h-8 text-white" />
                    )}
                  </div>
                  {isLive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-radio-dark animate-ping"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white truncate">{activeTrack.title}</h3>
                  <p className="text-gray-300 truncate">{activeTrack.artist}</p>
                  {activeTrack.album && (
                    <p className="text-sm text-gray-400 truncate">{activeTrack.album}</p>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-1">
                    {activeTrack.is_ai_generated && (
                      <Badge variant="outline" className="border-radio-purple/50 text-radio-purple text-xs">
                        <Radio className="w-2 h-2 mr-1" />
                        IA
                      </Badge>
                    )}
                    {activeTrack.genre && (
                      <Badge variant="outline" className="border-radio-cyan/50 text-radio-cyan text-xs">
                        {activeTrack.genre}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(activeTrack.id)}
                    className={`${likedTracks.has(activeTrack.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
                  >
                    <Heart className={`w-5 h-5 ${likedTracks.has(activeTrack.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {!isLive && (
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  onValueChange={handleSeek}
                  max={duration || 100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`${isShuffled ? 'text-radio-purple' : 'text-gray-400'} hover:text-white`}
                >
                  <Shuffle className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={skipPrevious}
                  className="text-gray-400 hover:text-white"
                  disabled={isLive}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                <Button
                  onClick={togglePlayPause}
                  size="icon"
                  className="w-12 h-12 bg-radio-purple hover:bg-radio-purple/80 text-white rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={skipNext}
                  className="text-gray-400 hover:text-white"
                  disabled={isLive}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRepeated(!isRepeated)}
                  className={`${isRepeated ? 'text-radio-purple' : 'text-gray-400'} hover:text-white`}
                  disabled={isLive}
                >
                  <Repeat className="w-4 h-4" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2 w-32">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-gray-400 hover:text-white"
                >
                  {isMuted || volume[0] === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Slider
                  value={isMuted ? [0] : volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="text-gray-400 hover:text-white"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>

            {/* Live Status */}
            {isLive && (
              <div className="flex items-center justify-center space-x-4 p-4 bg-black/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">TRANSMISSÃO AO VIVO</span>
                </div>
                <div className="text-sm text-gray-400">|</div>
                <div className="text-sm text-gray-400">Qualidade: 320kbps</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Playlist Panel */}
      {showPlaylist && (
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar músicas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 glass-effect border-white/20 bg-white/5 rounded-md text-white placeholder-gray-400"
                  />
                </div>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="w-32 glass-effect border-white/20 bg-white/5">
                    <SelectValue placeholder="Gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {getGenres().map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Track List */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredPlaylist.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track, index)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentTrackIndex === index ? 'bg-radio-purple/20 border border-radio-purple/30' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-radio-purple to-radio-cyan rounded-md flex items-center justify-center">
                      {track.cover_url ? (
                        <img 
                          src={track.cover_url} 
                          alt={track.title} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <Music className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{track.title}</p>
                      <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {track.is_ai_generated && (
                        <Badge variant="outline" className="border-radio-purple/50 text-radio-purple text-xs">
                          IA
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(track.id);
                        }}
                        className={`w-6 h-6 ${likedTracks.has(track.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
                      >
                        <Heart className={`w-3 h-3 ${likedTracks.has(track.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedAudioPlayer;
