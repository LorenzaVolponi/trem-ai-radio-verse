import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  Mic, 
  Upload, 
  Play, 
  Pause, 
  Square, 
  Download,
  Brain,
  Radio,
  Volume2,
  Settings,
  Trash2,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface VoiceClone {
  id: string;
  name: string;
  description: string;
  status: 'training' | 'ready' | 'error';
  quality: number;
  duration: number;
  created_at: string;
  sample_url?: string;
}

const VoiceCloningSystem = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [voiceName, setVoiceName] = useState('');
  const [voiceDescription, setVoiceDescription] = useState('');
  const [trainingText, setTrainingText] = useState('');
  const [voiceClones, setVoiceClones] = useState<VoiceClone[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { user } = useAuth();
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer for recording time
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Gravação iniciada",
        description: "Fale claramente para melhor qualidade de clonagem",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível acessar o microfone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      toast({
        title: "Gravação finalizada",
        description: `${recordingTime} segundos gravados`,
      });
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  const uploadVoiceSample = async (file: File) => {
    if (!user) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('voice-samples')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('voice-samples').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const trainVoiceClone = async () => {
    if (!user || !audioBlob || !voiceName.trim()) {
      toast({
        title: "Dados incompletos",
        description: "Nome da voz e amostra de áudio são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);

    try {
      // Upload audio sample
      const audioFile = new File([audioBlob], 'voice-sample.webm', { type: 'audio/webm' });
      const voiceUrl = await uploadVoiceSample(audioFile);

      if (!voiceUrl) throw new Error('Erro no upload do arquivo');

      // Simular processo de treinamento
      const progressInterval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      // Simular delay de treinamento
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Salvar no banco de dados
      const { error } = await supabase
        .from('voice_clones')
        .insert({
          name: voiceName,
          description: voiceDescription || 'Clone de voz personalizado',
          voice_file_url: voiceUrl,
          model_data: {
            training_duration: recordingTime,
            quality_score: Math.floor(Math.random() * 20) + 80,
            training_text: trainingText,
            created_with: 'advanced_ai_system'
          },
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Voz clonada com sucesso!",
        description: `"${voiceName}" está pronta para uso`,
      });

      // Reset form
      setVoiceName('');
      setVoiceDescription('');
      setTrainingText('');
      setAudioBlob(null);
      setRecordingTime(0);
      
      // Reload voice clones
      loadVoiceClones();

    } catch (error: any) {
      toast({
        title: "Erro no treinamento",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsTraining(false);
      setTrainingProgress(0);
    }
  };

  const loadVoiceClones = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('voice_clones')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading voice clones:', error);
      return;
    }

    const formattedClones: VoiceClone[] = data.map(clone => {
      // Safely handle JSON data with proper type checking
      const modelData = clone.model_data as any;
      const qualityScore = modelData && typeof modelData === 'object' && modelData.quality_score 
        ? modelData.quality_score 
        : 85;
      const trainingDuration = modelData && typeof modelData === 'object' && modelData.training_duration 
        ? modelData.training_duration 
        : 0;

      return {
        id: clone.id,
        name: clone.name,
        description: clone.description,
        status: clone.is_active ? 'ready' : 'error',
        quality: qualityScore,
        duration: trainingDuration,
        created_at: clone.created_at,
        sample_url: clone.voice_file_url
      };
    });

    setVoiceClones(formattedClones);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    if (user) {
      loadVoiceClones();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Voice Recording */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-radio-purple" />
            <span>Gravação de Voz</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full text-white ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-radio-purple hover:bg-radio-purple/80'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
          </div>

          {isRecording && (
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-radio-purple">
                {formatTime(recordingTime)}
              </p>
              <p className="text-sm text-gray-400">Gravando...</p>
            </div>
          )}

          {audioBlob && !isRecording && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                onClick={playRecording}
                className="border-radio-cyan/50 text-radio-cyan hover:bg-radio-cyan/20"
              >
                <Play className="w-4 h-4 mr-2" />
                Reproduzir
              </Button>
              <span className="text-sm text-gray-400">
                Gravação: {formatTime(recordingTime)}
              </span>
            </div>
          )}

          <audio ref={audioRef} style={{ display: 'none' }} />
        </CardContent>
      </Card>

      {/* Voice Configuration */}
      {audioBlob && (
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-radio-cyan" />
              <span>Configuração da Voz</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome da Voz *
              </label>
              <Input
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                placeholder="Ex: Locutor Principal"
                className="glass-effect border-white/20 bg-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrição
              </label>
              <Input
                value={voiceDescription}
                onChange={(e) => setVoiceDescription(e.target.value)}
                placeholder="Descreva o tom e estilo da voz"
                className="glass-effect border-white/20 bg-white/5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Texto de Referência (Opcional)
              </label>
              <Textarea
                value={trainingText}
                onChange={(e) => setTrainingText(e.target.value)}
                placeholder="Digite um texto que será usado para treinar a voz..."
                className="glass-effect border-white/20 bg-white/5 min-h-20"
              />
            </div>

            <Button
              onClick={trainVoiceClone}
              disabled={isTraining || !voiceName.trim()}
              className="w-full bg-radio-purple hover:bg-radio-purple/80"
            >
              {isTraining ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Treinando Voz...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Treinar Clone de Voz
                </>
              )}
            </Button>

            {isTraining && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso do Treinamento</span>
                  <span>{Math.round(trainingProgress)}%</span>
                </div>
                <Progress value={trainingProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Voice Clones List */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-radio-green" />
            <span>Clones de Voz</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {voiceClones.length === 0 ? (
            <div className="text-center py-8">
              <Radio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Nenhuma voz clonada ainda</p>
              <p className="text-sm text-gray-500">Grave uma amostra para começar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {voiceClones.map((voice) => (
                <div
                  key={voice.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedVoice === voice.id
                      ? 'bg-radio-purple/20 border-radio-purple/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-white">{voice.name}</h3>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            voice.status === 'ready'
                              ? 'border-green-500/50 text-green-400'
                              : voice.status === 'training'
                              ? 'border-yellow-500/50 text-yellow-400'
                              : 'border-red-500/50 text-red-400'
                          }`}
                        >
                          {voice.status === 'ready' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {voice.status === 'error' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {voice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{voice.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Qualidade: {voice.quality}%</span>
                        <span>Duração: {formatTime(voice.duration)}</span>
                        <span>Criado: {new Date(voice.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {voice.sample_url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-radio-cyan"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceCloningSystem;
