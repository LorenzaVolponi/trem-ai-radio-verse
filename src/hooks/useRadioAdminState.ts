import { useCallback, useEffect, useState } from 'react';
import { appendEvent, defaultRadioAdminState, loadRadioAdminState, PersistStatus, RadioAdminState, saveRadioAdminState } from '@/services/radioAdminService';

export const useRadioAdminState = () => {
  const [state, setState] = useState<RadioAdminState>(defaultRadioAdminState);
  const [status, setStatus] = useState<PersistStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    loadRadioAdminState()
      .then((loaded) => {
        if (!mounted) return;
        setState(loaded);
        setStatus('idle');
      })
      .catch((loadError: Error) => {
        if (!mounted) return;
        setError(loadError.message);
        setStatus('error');
      });
    return () => { mounted = false; };
  }, []);

  const persist = useCallback(async (nextState: RadioAdminState) => {
    setState(nextState);
    setStatus('saving');
    setError(null);
    const result = await saveRadioAdminState(nextState);
    setLastSavedAt(new Date().toISOString());
    if (result.persistedToSupabase) {
      setStatus('saved');
    } else {
      setStatus('error');
      setError(`Salvo localmente; Supabase indisponível: ${result.error}`);
    }
  }, []);

  const updateAndPersist = useCallback((updater: (current: RadioAdminState) => RadioAdminState) => {
    setState((current) => {
      const nextState = updater(current);
      void persist(nextState);
      return nextState;
    });
  }, [persist]);

  const publish = useCallback(() => {
    updateAndPersist((current) => appendEvent({
      ...current,
      activePublication: {
        id: `publication-${Date.now()}`,
        publishedAt: new Date().toISOString(),
        summary: `${current.programs.length} programas, ${current.tracks.length} faixas, ${current.jingles.length} vinhetas e ${current.advertisements.length} anúncios publicados.`
      }
    }, {
      type: 'publication',
      title: 'Programação publicada',
      description: 'Alterações revisadas e ativadas na grade pública.'
    }));
  }, [updateAndPersist]);

  return { state, setState, updateAndPersist, persist, publish, status, error, lastSavedAt };
};
