
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LiveAudioPlayer from '@/components/LiveAudioPlayer';
import AdminLogin from '@/components/AdminLogin';
import RadioDashboard from '@/components/RadioDashboard';
import RadioHeader from '@/components/RadioHeader';
import AutoStartNotification from '@/components/AutoStartNotification';
import StreamingInfoCard from '@/components/StreamingInfoCard';
import PlaylistQueue from '@/components/PlaylistQueue';
import RealTimeStats from '@/components/RealTimeStats';
import AdminAccessCard from '@/components/AdminAccessCard';
import RadioFooter from '@/components/RadioFooter';

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
  
  const { isAuthenticated } = useAuth();

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

  // Show admin dashboard if authenticated
  if (isAuthenticated) {
    return <RadioDashboard />;
  }

  // Show admin login if admin parameter is present
  if (window.location.search.includes('admin')) {
    return <AdminLogin />;
  }

  return (
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
  );
};

export default Index;
