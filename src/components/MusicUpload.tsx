
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { Upload, Music, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MusicUpload = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [sunoId, setSunoId] = useState('');
  const [sunoUrl, setSunoUrl] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'suno'>('file');
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileUpload = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user?.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSunoImport = async () => {
    if (!sunoUrl) return null;
    
    try {
      // Extrair ID do Suno da URL se necessário
      const urlParts = sunoUrl.split('/');
      const extractedId = urlParts[urlParts.length - 1] || sunoId;
      
      // Aqui você implementaria a integração com a API do Suno
      // Por enquanto, retornamos a URL fornecida
      return {
        audioUrl: sunoUrl,
        sunoId: extractedId
      };
    } catch (error) {
      throw new Error('Erro ao importar do Suno');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      let audioUrl = '';
      let coverUrl = '';
      let finalSunoId = '';

      if (uploadMethod === 'suno') {
        const sunoData = await handleSunoImport();
        if (sunoData) {
          audioUrl = sunoData.audioUrl;
          finalSunoId = sunoData.sunoId;
        }
      } else {
        if (!audioFile) {
          throw new Error('Arquivo de áudio é obrigatório');
        }
        audioUrl = await handleFileUpload(audioFile, 'audio-files');
      }

      if (coverFile) {
        coverUrl = await handleFileUpload(coverFile, 'cover-images');
      }

      const { error } = await supabase
        .from('tracks')
        .insert({
          title,
          artist,
          album,
          genre,
          file_url: audioUrl,
          cover_url: coverUrl,
          suno_id: finalSunoId,
          is_ai_generated: uploadMethod === 'suno',
          created_by: user.id,
          metadata: {
            upload_method: uploadMethod,
            original_filename: audioFile?.name
          }
        });

      if (error) throw error;

      toast({
        title: "Música adicionada!",
        description: "Sua música foi adicionada com sucesso à biblioteca.",
      });

      // Reset form
      setTitle('');
      setArtist('');
      setAlbum('');
      setGenre('');
      setSunoId('');
      setSunoUrl('');
      setAudioFile(null);
      setCoverFile(null);

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

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Music className="w-5 h-5 text-radio-purple" />
          <span>Adicionar Música</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Method Selection */}
          <div className="flex space-x-2">
            <Button
              variant={uploadMethod === 'file' ? 'default' : 'outline'}
              onClick={() => setUploadMethod('file')}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Arquivo
            </Button>
            <Button
              variant={uploadMethod === 'suno' ? 'default' : 'outline'}
              onClick={() => setUploadMethod('suno')}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Importar do Suno
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="glass-effect border-white/20 bg-white/5"
                />
              </div>
              <div>
                <Label htmlFor="artist">Artista *</Label>
                <Input
                  id="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                  className="glass-effect border-white/20 bg-white/5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="album">Álbum</Label>
                <Input
                  id="album"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  className="glass-effect border-white/20 bg-white/5"
                />
              </div>
              <div>
                <Label htmlFor="genre">Gênero</Label>
                <Input
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="glass-effect border-white/20 bg-white/5"
                />
              </div>
            </div>

            {/* Upload Method Specific Fields */}
            {uploadMethod === 'suno' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sunoUrl">URL do Suno *</Label>
                  <Input
                    id="sunoUrl"
                    value={sunoUrl}
                    onChange={(e) => setSunoUrl(e.target.value)}
                    placeholder="https://suno.com/song/..."
                    required
                    className="glass-effect border-white/20 bg-white/5"
                  />
                </div>
                <div>
                  <Label htmlFor="sunoId">ID do Suno (opcional)</Label>
                  <Input
                    id="sunoId"
                    value={sunoId}
                    onChange={(e) => setSunoId(e.target.value)}
                    placeholder="ID específico se diferente da URL"
                    className="glass-effect border-white/20 bg-white/5"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="audioFile">Arquivo de Áudio *</Label>
                <Input
                  id="audioFile"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  required
                  className="glass-effect border-white/20 bg-white/5"
                />
              </div>
            )}

            {/* Cover Image */}
            <div>
              <Label htmlFor="coverFile">Imagem de Capa (opcional)</Label>
              <Input
                id="coverFile"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="glass-effect border-white/20 bg-white/5"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-radio-purple hover:bg-radio-purple/80"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Music className="mr-2 h-4 w-4" />
              )}
              Adicionar Música
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicUpload;
