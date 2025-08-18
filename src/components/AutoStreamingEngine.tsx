
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import StreamingStatusCard from './StreamingStatusCard';
import CurrentTrackDisplay from './CurrentTrackDisplay';
import StreamingMetrics from './StreamingMetrics';
import SystemHealthMonitor from './SystemHealthMonitor';
import AIContentStatus from './AIContentStatus';

interface StreamingState {
  isLive: boolean;
  autoMode: boolean;
  currentTrack: {
    title: string;
    artist: string;
    duration: number;
    elapsed: number;
  };
  listeners: number;
  quality: string;
  bitrate: number;
  latency: number;
}

const AutoStreamingEngine = () => {
  const [streamState, setStreamState] = useState<StreamingState>({
    isLive: true,
    autoMode: true,
    currentTrack: {
      title: "Voz do Amanhã Premium",
      artist: "IA Vocal Elite",
      duration: 255,
      elapsed: 0
    },
    listeners: 1847,
    quality: 'Ultra HD',
    bitrate: 320,
    latency: 78
  });

  const [audioLevel, setAudioLevel] = useState(0);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    bandwidth: 8.5,
    uptime: 86400
  });

  const { toast } = useToast();

  const startAutoStreaming = useCallback(() => {
    setStreamState(prev => ({ ...prev, isLive: true }));
    toast({
      title: "Transmissão Iniciada Automaticamente",
      description: "Sistema autogerenciável ativo 24/7",
    });
  }, [toast]);

  // Auto-start streaming when component mounts or when auto mode is enabled
  useEffect(() => {
    if (streamState.autoMode) {
      startAutoStreaming();
    }
  }, [startAutoStreaming, streamState.autoMode]);

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamState(prev => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 20) - 10,
        latency: Math.max(50, Math.min(120, prev.latency + (Math.random() - 0.5) * 10)),
        currentTrack: {
          ...prev.currentTrack,
          elapsed: prev.currentTrack.elapsed + 1
        }
      }));

      setAudioLevel(Math.random() * 100);
      
      setSystemHealth(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 3)),
        bandwidth: Math.max(5, Math.min(15, prev.bandwidth + (Math.random() - 0.5) * 1)),
        uptime: prev.uptime + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleAutoMode = () => {
    setStreamState(prev => ({ ...prev, autoMode: !prev.autoMode }));
    if (!streamState.autoMode) {
      startAutoStreaming();
    }
  };

  return (
    <div className="space-y-6">
      <StreamingStatusCard 
        isLive={streamState.isLive}
        autoMode={streamState.autoMode}
        onToggleAutoMode={toggleAutoMode}
      />

      <CurrentTrackDisplay 
        currentTrack={streamState.currentTrack}
        audioLevel={audioLevel}
      />

      <StreamingMetrics 
        listeners={streamState.listeners}
        bitrate={streamState.bitrate}
        quality={streamState.quality}
        latency={streamState.latency}
        uptime={systemHealth.uptime}
      />

      <SystemHealthMonitor systemHealth={systemHealth} />

      <AIContentStatus />
    </div>
  );
};

export default AutoStreamingEngine;
