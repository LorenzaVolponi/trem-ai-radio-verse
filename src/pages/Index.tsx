
import React, { useState, useEffect } from 'react';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';
import RadioHeader from '@/components/RadioHeader';
import AutoStartNotification from '@/components/AutoStartNotification';
import StreamingInfoCard from '@/components/StreamingInfoCard';
import PlaylistQueue from '@/components/PlaylistQueue';
import RealTimeStats from '@/components/RealTimeStats';
import AdminAccessCard from '@/components/AdminAccessCard';
import RadioFooter from '@/components/RadioFooter';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const [currentListeners, setCurrentListeners] = useState(2847);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Voz do Amanhã Premium",
    artist: "IA Vocal Elite",
    duration: 255,
    elapsed: 0
  });
  const [audioLevel, setAudioLevel] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    aiEngine: 'online',
    streaming: 'optimal',
    voiceCloning: 'active',
    musicGeneration: 'generating'
  });
  
  // Real-time listeners and system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentListeners(prev => prev + Math.floor(Math.random() * 20) - 10);
      setAudioLevel(Math.random() * 100);
      
      // Update track progress
      setCurrentTrack(prev => ({
        ...prev,
        elapsed: prev.elapsed >= prev.duration ? 0 : prev.elapsed + 1
      }));
      
      // Simulate system status changes
      setSystemStatus(prev => ({
        ...prev,
        musicGeneration: Math.random() > 0.7 ? 'generating' : 'standby'
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <RadioHeader currentListeners={currentListeners} />
      <AutoStartNotification />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Enhanced Player Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Audio Player */}
            <LiveAudioPlayer 
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              audioLevel={audioLevel}
            />

            <StreamingInfoCard />

            <section className="glass-effect rounded-2xl border border-white/10 p-6 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-radio-cyan font-semibold">Rádio online com IA</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Rádio Trem AI: música gerada por inteligência artificial para marcas, ouvintes e programação 24/7</h1>
              <p className="text-gray-300 leading-relaxed">
                A Rádio Trem AI combina rádio online ao vivo, inteligência artificial generativa, locução sintética e curadoria musical automatizada para entregar uma experiência de áudio moderna, escalável e sempre disponível.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <strong className="block text-white mb-2">Transmissão inteligente</strong>
                  Programação de rádio 24 horas com trilhas, vinhetas e conteúdos criados por IA.
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <strong className="block text-white mb-2">Conteúdo comercial</strong>
                  Soluções de áudio branding, spots publicitários e campanhas para rádio digital.
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <strong className="block text-white mb-2">SEO para áudio</strong>
                  Presença otimizada para buscas por rádio com IA, música artificial e streaming online.
                </div>
              </div>
            </section>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <PlaylistQueue />
            <RealTimeStats currentListeners={currentListeners} />
            <AdminAccessCard />
          </div>
        </div>
      </main>

      <RadioFooter />
    </div>
    </>
  );
};

export default Index;
