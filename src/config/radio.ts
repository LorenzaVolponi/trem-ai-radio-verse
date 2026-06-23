export type RadioStreamMetadata = {
  stationName: string;
  description: string;
  codec: 'mp3' | 'aac' | 'hls';
  bitrate: string;
  homepageUrl: string;
};

export type RadioStreamFallback = {
  label: string;
  streamUrl: string;
  codec: RadioStreamMetadata['codec'];
};

export type RadioStreamConfig = {
  streamUrl: string;
  fallback: RadioStreamFallback;
  metadata: RadioStreamMetadata;
};

export const radioStreamConfig: RadioStreamConfig = {
  streamUrl: import.meta.env.VITE_RADIO_STREAM_URL ?? 'https://stream.zeno.fm/0r0xa792kwzuv',
  fallback: {
    label: 'Stream MP3/AAC direto',
    streamUrl: import.meta.env.VITE_RADIO_FALLBACK_URL ?? 'https://stream.zeno.fm/0r0xa792kwzuv',
    codec: 'mp3',
  },
  metadata: {
    stationName: 'Trem AI Radio Verse',
    description: 'Transmissão ao vivo 24/7 com programação gerada por IA.',
    codec: 'mp3',
    bitrate: '320kbps',
    homepageUrl: 'https://trem-ai-radio-verse.local',
  },
};
