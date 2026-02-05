import { useState, useEffect, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

interface UseScrambleTextOptions {
  text: string;
  scrambleOnHover?: boolean;
  duration?: number;
  scrambleSpeed?: number;
}

export function useScrambleText({ 
  text, 
  scrambleOnHover = true,
  duration = 1000,
  scrambleSpeed = 50
}: UseScrambleTextOptions) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    let iterations = 0;
    const maxIterations = Math.ceil(duration / scrambleSpeed);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            // Постепенно раскрываем буквы
            if (index < iterations / 3) {
              return text[index];
            }
            
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iterations++;

      if (iterations >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, scrambleSpeed);
  }, [text, duration, scrambleSpeed, isScrambling]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayText(text);
    setIsScrambling(false);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return {
    displayText,
    isScrambling,
    scramble,
    reset,
    handlers: {
      onMouseEnter: scrambleOnHover ? scramble : () => {},
      onMouseLeave: scrambleOnHover ? reset : () => {}
    }
  };
}

