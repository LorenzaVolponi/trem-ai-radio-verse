
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import StreamingStatusCard from './StreamingStatusCard';
import CurrentTrackDisplay from './CurrentTrackDisplay';
import StreamingMetrics from './StreamingMetrics';
import SystemHealthMonitor from './SystemHealthMonitor';
import AIContentStatus from './AIContentStatus';
import { demoMode, fetchTransmissionMetrics } from '@/services/metrics';

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
    listeners: 0,
    quality: 'Ultra HD',
    bitrate: 320,
    latency: 0
  });

  const [audioLevel, setAudioLevel] = useState(0);
  const [isDemoMetrics, setIsDemoMetrics] = useState(demoMode);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    bandwidth: 8.5,
    uptime: 86400
  });

  const { toast } = useToast();



  // Real-time metrics from metrics service (or explicit demo data)
  useEffect(() => {
    let active = true;

    const updateMetrics = async () => {
      const metrics = await fetchTransmissionMetrics();
      if (!active) return;

      setStreamState(prev => ({
        ...prev,
        listeners: metrics.listeners,
        latency: metrics.latencyMs,
        currentTrack: {
          ...prev.currentTrack,
          elapsed: prev.currentTrack.elapsed + 1
        }
      }));

      setAudioLevel(metrics.audioLevel);
      setIsDemoMetrics(metrics.isDemo);
      setSystemHealth(prev => ({
        ...prev,
        uptime: metrics.uptimeSeconds
      }));
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 1000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const startAutoStreaming = useCallback(() => {
    setStreamState(prev => ({ ...prev, isLive: true }));
    toast({
      title: "Transmissão Iniciada Automaticamente",
      description: "Sistema autogerenciável ativo 24/7",
    });
  }, [toast]);

  // Auto-start streaming when component mounts
  useEffect(() => {
    if (streamState.autoMode) {
      startAutoStreaming();
    }
  }, [startAutoStreaming, streamState.autoMode]);

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
        isDemo={isDemoMetrics}
      />

      <SystemHealthMonitor systemHealth={systemHealth} />

      <AIContentStatus />
    </div>
  );
};

export default AutoStreamingEngine;
