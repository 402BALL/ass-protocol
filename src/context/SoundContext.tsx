import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { soundManager } from '../lib/soundManager';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSound: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? saved === 'true' : true; // default on
  });

  useEffect(() => {
    soundManager.setEnabled(isSoundEnabled);
    localStorage.setItem('soundEnabled', String(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  const setSound = useCallback((enabled: boolean) => {
    setIsSoundEnabled(enabled);
  }, []);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, setSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
}

