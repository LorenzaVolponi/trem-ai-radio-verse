export interface TransmissionMetrics {
  listeners: number;
  uptimeSeconds: number;
  latencyMs: number;
  status: 'online' | 'degraded' | 'offline';
  audioLevel: number;
  musicGeneration: 'generating' | 'standby';
  isDemo: boolean;
}

const parseBooleanEnv = (value: string | undefined) =>
  value === 'true' || value === '1' || value === 'yes';

export const demoMode = parseBooleanEnv(import.meta.env.VITE_DEMO_MODE) || !import.meta.env.VITE_METRICS_ENDPOINT;

const metricsEndpoint = import.meta.env.VITE_METRICS_ENDPOINT as string | undefined;
const startedAt = Date.now() - 86_400_000;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const createDemoMetrics = (seed = Date.now()): TransmissionMetrics => {
  const seconds = Math.floor(seed / 1000);
  const wave = Math.sin(seconds / 7);
  const fasterWave = Math.sin(seconds / 3);

  return {
    listeners: Math.round(2847 + wave * 85 + fasterWave * 18),
    uptimeSeconds: Math.floor((seed - startedAt) / 1000),
    latencyMs: Math.round(clamp(78 + wave * 12, 45, 140)),
    status: 'online',
    audioLevel: Math.round(clamp(55 + fasterWave * 35, 0, 100)),
    musicGeneration: seconds % 10 > 6 ? 'generating' : 'standby',
    isDemo: true,
  };
};

export const fetchTransmissionMetrics = async (): Promise<TransmissionMetrics> => {
  if (demoMode || !metricsEndpoint) {
    return createDemoMetrics();
  }

  const response = await fetch(metricsEndpoint, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Falha ao buscar métricas: ${response.status}`);
  }

  const metrics = await response.json();

  return {
    listeners: Number(metrics.listeners ?? 0),
    uptimeSeconds: Number(metrics.uptimeSeconds ?? metrics.uptime ?? 0),
    latencyMs: Number(metrics.latencyMs ?? metrics.latency ?? 0),
    status: metrics.status ?? 'offline',
    audioLevel: Number(metrics.audioLevel ?? 0),
    musicGeneration: metrics.musicGeneration ?? 'standby',
    isDemo: false,
  };
};

export const createVisualizerBars = (count: number, seed = Date.now()) =>
  Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(seed / 100 + index * 1.7);
    return Math.round(clamp(45 + wave * 40, 10, 95));
  });
