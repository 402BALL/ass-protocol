import React, { useState, useEffect } from 'react';
import PixelText from '../PixelText';
import { useSound } from '../../hooks/useSound';
import './ArticlePage.css';

interface ArticlePageProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  accentColor?: string;
  onBack: () => void;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}';

export default function ArticlePage({
  title,
  subtitle,
  content,
  accentColor = '#00CED1',
  onBack
}: ArticlePageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [scrambledText, setScrambledText] = useState('BACK');
  const { playHover, playBack, playScramble, playTransition } = useSound();

  useEffect(() => {
    if (isHovered) {
      let iterations = 0;
      const maxIterations = 15;
      const text = 'BACK';
      
      const interval = setInterval(() => {
        const result = text
          .split('')
          .map((char, index) => {
            if (index < iterations / 3) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        
        setScrambledText(result);
        iterations++;
        
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setScrambledText(text);
        }
      }, 40);
      
      return () => clearInterval(interval);
    } else {
      setScrambledText('BACK');
    }
  }, [isHovered]);

  return (
    <div className="article-page">
      <header className="article-header">
        <button 
          className="article-back" 
          onClick={() => { playBack(); playTransition(); onBack(); }}
          onMouseEnter={() => { setIsHovered(true); playHover(); playScramble(); }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="article-back__icon">◀</span>
          <span className="article-back__text">{scrambledText}</span>
        </button>
      </header>

      <main className="article-content">
        <div className="article-container">
          {subtitle && (
            <p className="article-subtitle" style={{ color: accentColor }}>
              {subtitle}
            </p>
          )}
          
          <h1 className="article-title">{title}</h1>
          
          <div className="article-body">
            {content}
          </div>
        </div>
      </main>
    </div>
  );
}

