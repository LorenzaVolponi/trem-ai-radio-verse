
import React, { useState, useEffect } from 'react';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';
import RadioHeader from '@/components/RadioHeader';
import AutoStartNotification from '@/components/AutoStartNotification';
import PlaylistQueue from '@/components/PlaylistQueue';
import RealTimeStats from '@/components/RealTimeStats';
import RadioFooter from '@/components/RadioFooter';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import { Button } from '@/components/ui/button';

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

      <main className="container relative z-10 mx-auto px-4 sm:px-6">
        <HeroSection />

        <section id="player" className="scroll-mt-20 py-10 sm:py-14">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Player ao vivo</span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Ouça a rádio IA em ação.</h2>
            <p className="mt-4 text-slate-300">
              O player é o centro da experiência: demonstra qualidade de transmissão, voz sintética,
              programação contínua e métricas que sustentam decisões comerciais.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400" asChild>
                <a href="#player">Ouvir agora</a>
              </Button>
              <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild>
                <a href="#planos">Criar minha rádio IA</a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-6">
              <LiveAudioPlayer 
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                audioLevel={audioLevel}
              />
            </div>

            <aside className="space-y-6">
              <RealTimeStats currentListeners={currentListeners} />
              <PlaylistQueue />
            </aside>
          </div>
        </section>

        <FeatureGrid />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <RadioFooter />
    </div>
    </>
  );
};

export default Index;
