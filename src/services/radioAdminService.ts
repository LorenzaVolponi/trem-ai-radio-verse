import { supabase } from '@/integrations/supabase/client';

export type ProgramType = 'live' | 'ai-generated' | 'music-only';
export type ProgramStatus = 'active' | 'scheduled' | 'completed';

export interface RadioProgram {
  id: string;
  name: string;
  host: string;
  startTime: string;
  duration: number;
  genre: string;
  type: ProgramType;
  status: ProgramStatus;
  listeners?: number;
  engagement?: number;
}

export interface Track { id: string; title: string; artist: string; duration: number; genre: string; status: 'draft' | 'ready' | 'published'; }
export interface Jingle { id: string; title: string; category: 'opening' | 'transition' | 'closing' | 'station-id'; duration: number; audioUrl?: string; status: 'draft' | 'ready' | 'published'; }
export interface Advertisement { id: string; sponsor: string; title: string; duration: number; startsAt?: string; endsAt?: string; status: 'draft' | 'ready' | 'published'; }
export interface StreamSettings { isStreaming: boolean; autoMode: boolean; streamQuality: number; bufferSize: number; crossfadeDuration: number; }
export interface AIContentSettings { voiceSettings: { selectedVoice: string; emotionalTone: number; speechSpeed: number; pronunciation: number; }; musicSettings: { genre: string; mood: string; duration: number; bpm: number; }; }
export interface RadioEvent { id: string; title: string; type: 'program' | 'track' | 'jingle' | 'advertisement' | 'stream' | 'ai-content' | 'publication'; description: string; createdAt: string; }
export interface ScheduleAutomationSettings { autoScheduling: boolean; adaptiveContent: boolean; }
export interface RadioAdminState { programs: RadioProgram[]; tracks: Track[]; jingles: Jingle[]; advertisements: Advertisement[]; streamSettings: StreamSettings; aiContentSettings: AIContentSettings; scheduleAutomation: ScheduleAutomationSettings; events: RadioEvent[]; activePublication?: { id: string; publishedAt: string; summary: string; }; }
export type PersistStatus = 'idle' | 'loading' | 'saving' | 'saved' | 'error';

const STATE_KEY = 'radio-admin-state';
const LOCAL_STORAGE_KEY = 'trem-radio-admin-state';
const TABLE_NAME = 'radio_admin_state';

export const defaultRadioAdminState: RadioAdminState = {
  programs: [
    { id: '1', name: 'Despertar com IA', host: 'Voz Aurora', startTime: '06:00', duration: 180, genre: 'Matinal', type: 'ai-generated', status: 'completed', listeners: 1247, engagement: 87 },
    { id: '2', name: 'Música Contínua IA', host: 'Sistema Automático', startTime: '09:00', duration: 120, genre: 'Variedades', type: 'music-only', status: 'active', listeners: 2341, engagement: 92 },
    { id: '3', name: 'Programa Interativo', host: 'Voz Creator', startTime: '14:00', duration: 90, genre: 'Talk Show', type: 'ai-generated', status: 'scheduled', listeners: 0, engagement: 0 },
    { id: '4', name: 'Noite Eletrônica IA', host: 'Voz Nexus', startTime: '20:00', duration: 240, genre: 'Eletrônica', type: 'ai-generated', status: 'scheduled', listeners: 0, engagement: 0 }
  ],
  tracks: [{ id: 'track-1', title: 'Cosmic Intro', artist: 'Trem AI', duration: 180, genre: 'Eletrônica', status: 'ready' }],
  jingles: [{ id: 'jingle-1', title: 'Prefixo Trem AI', category: 'station-id', duration: 12, status: 'ready' }],
  advertisements: [{ id: 'ad-1', sponsor: 'Parceiro Premium', title: 'Chamada Institucional', duration: 30, status: 'draft' }],
  streamSettings: { isStreaming: true, autoMode: true, streamQuality: 320, bufferSize: 8, crossfadeDuration: 3 },
  aiContentSettings: { voiceSettings: { selectedVoice: 'Voz Aurora Premium', emotionalTone: 85, speechSpeed: 70, pronunciation: 90 }, musicSettings: { genre: 'Eletrônica Cósmica', mood: 'Energético', duration: 180, bpm: 128 } },
  scheduleAutomation: { autoScheduling: true, adaptiveContent: true },
  events: []
};

const getLocalState = (): RadioAdminState | null => {
  try { const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY); return raw ? { ...defaultRadioAdminState, ...JSON.parse(raw) } : null; } catch { return null; }
};
const setLocalState = (state: RadioAdminState) => window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));

export const appendEvent = (state: RadioAdminState, event: Omit<RadioEvent, 'id' | 'createdAt'>): RadioAdminState => ({
  ...state,
  events: [{ ...event, id: `event-${Date.now()}`, createdAt: new Date().toISOString() }, ...state.events].slice(0, 25)
});

export async function loadRadioAdminState(): Promise<RadioAdminState> {
  const { data, error } = await supabase.from(TABLE_NAME as never).select('payload').eq('id', STATE_KEY).maybeSingle();
  if (error) return getLocalState() ?? defaultRadioAdminState;
  const payload = (data as { payload?: RadioAdminState } | null)?.payload;
  const state = payload ? { ...defaultRadioAdminState, ...payload } : getLocalState() ?? defaultRadioAdminState;
  setLocalState(state);
  return state;
}

export async function saveRadioAdminState(state: RadioAdminState): Promise<{ persistedToSupabase: boolean; error?: string }> {
  setLocalState(state);
  const { error } = await supabase.from(TABLE_NAME as never).upsert({ id: STATE_KEY, payload: state, updated_at: new Date().toISOString() } as never);
  return error ? { persistedToSupabase: false, error: error.message } : { persistedToSupabase: true };
}
