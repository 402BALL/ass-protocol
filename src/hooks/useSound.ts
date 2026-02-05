import { useCallback } from 'react';
import { soundManager } from '../lib/soundManager';

export function useSound() {
  const playHover = useCallback(() => {
    soundManager.playHover();
  }, []);

  const playClick = useCallback(() => {
    soundManager.playClick();
  }, []);

  const playScramble = useCallback(() => {
    soundManager.playScramble();
  }, []);

  const playCardHover = useCallback(() => {
    soundManager.playCardHover();
  }, []);

  const playCardLeave = useCallback(() => {
    soundManager.playCardLeave();
  }, []);

  const playNavClick = useCallback(() => {
    soundManager.playNavClick();
  }, []);

  const playTransition = useCallback(() => {
    soundManager.playTransition();
  }, []);

  const playBack = useCallback(() => {
    soundManager.playBack();
  }, []);

  const playError = useCallback(() => {
    soundManager.playError();
  }, []);

  const playSuccess = useCallback(() => {
    soundManager.playSuccess();
  }, []);

  const playToggle = useCallback(() => {
    soundManager.playToggle();
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    soundManager.setEnabled(enabled);
  }, []);

  const getEnabled = useCallback(() => {
    return soundManager.getEnabled();
  }, []);

  const setVolume = useCallback((volume: number) => {
    soundManager.setVolume(volume);
  }, []);

  return {
    playHover,
    playClick,
    playScramble,
    playCardHover,
    playCardLeave,
    playNavClick,
    playTransition,
    playBack,
    playError,
    playSuccess,
    playToggle,
    setEnabled,
    getEnabled,
    setVolume,
  };
}

