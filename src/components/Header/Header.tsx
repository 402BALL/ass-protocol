import React, { useState } from 'react';
import PixelText from '../PixelText';
import { PixelMoon, PixelSun, PixelSound, PixelSoundOff } from '../PixelIcons/PixelIcons';
import { useScrambleText } from '../../hooks/useScrambleText';
import { useSoundContext } from '../../context/SoundContext';
import { useSound } from '../../hooks/useSound';
import './Header.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate?: (page: string) => void;
}

export default function Header({ theme, onToggleTheme, onNavigate }: HeaderProps) {
  const [logoText, setLogoText] = useState('A.S.S.');
  const { isSoundEnabled, toggleSound } = useSoundContext();
  const { playHover, playNavClick, playToggle, playScramble } = useSound();

  const howItWorksNav = useScrambleText({ text: 'HOW IT WORKS', duration: 500 });
  const tokensNav = useScrambleText({ text: 'TOKENS', duration: 500 });
  const connectNav = useScrambleText({ text: 'CONNECT', duration: 500 });

  const handleLogoHover = () => {
    playScramble();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iterations = 0;
    const originalText = 'A.S.S.';
    
    const interval = setInterval(() => {
      setLogoText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iterations += 1/3;
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        setLogoText(originalText);
      }
    }, 30);
  };

  const handleLogoLeave = () => {
    setLogoText('A.S.S.');
  };

  const handleNavHover = () => {
    playHover();
  };

  const handleNavClick = (page: string) => {
    playNavClick();
    onNavigate?.(page);
  };

  const handleThemeToggle = () => {
    playToggle();
    onToggleTheme();
  };

  const handleSoundToggle = () => {
    // Play toggle sound BEFORE disabling (so user hears it)
    if (isSoundEnabled) {
      playToggle();
    }
    toggleSound();
    // Play sound after enabling (so user hears it's on)
    if (!isSoundEnabled) {
      setTimeout(() => playToggle(), 50);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div 
          className="header__logo"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <PixelText 
            text={logoText} 
            pixelSize={4} 
            color="var(--text-primary)"
            bold
          />
        </div>

        <nav className="header__nav">
          <button 
            className="header__nav-item"
            onClick={() => handleNavClick('how-it-works')}
            onMouseEnter={() => { handleNavHover(); howItWorksNav.handlers.onMouseEnter(); }}
            onMouseLeave={howItWorksNav.handlers.onMouseLeave}
          >
            <PixelText 
              text={howItWorksNav.displayText} 
              pixelSize={3} 
              color="var(--text-primary)"
              bold
            />
          </button>
          
          <button 
            className="header__nav-item"
            onClick={() => handleNavClick('tokens')}
            onMouseEnter={() => { handleNavHover(); tokensNav.handlers.onMouseEnter(); }}
            onMouseLeave={tokensNav.handlers.onMouseLeave}
          >
            <PixelText 
              text={tokensNav.displayText} 
              pixelSize={3} 
              color="var(--text-primary)"
              bold
            />
          </button>
          
          <button 
            className="header__nav-item"
            onClick={() => handleNavClick('connect')}
            onMouseEnter={() => { handleNavHover(); connectNav.handlers.onMouseEnter(); }}
            onMouseLeave={connectNav.handlers.onMouseLeave}
          >
            <PixelText 
              text={connectNav.displayText} 
              pixelSize={3} 
              color="var(--text-primary)"
              bold
            />
          </button>

          <button 
            className="header__theme-toggle"
            onClick={handleThemeToggle}
            onMouseEnter={playHover}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <PixelSun size={18} /> : <PixelMoon size={18} />}
          </button>

          <button 
            className="header__sound-toggle" 
            onClick={handleSoundToggle}
            onMouseEnter={playHover}
            aria-label="Toggle sound"
          >
            {isSoundEnabled ? <PixelSound size={18} /> : <PixelSoundOff size={18} />}
          </button>

          <button 
            className="header__lang-toggle" 
            onMouseEnter={playHover}
            aria-label="Change language"
          >
            <span className="lang-text">EN</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
