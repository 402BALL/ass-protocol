import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
  duration?: number;
}

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateRandomString(length: number): string {
  return Array.from({ length }, () => 
    RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
  ).join('');
}

function numberToBinary(num: number, padding: number = 7): string {
  return num.toString(2).padStart(padding, '0');
}

export default function Loader({ onComplete, duration = 3000 }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [binaryCode, setBinaryCode] = useState('0000000');
  const [scrambleText, setScrambleText] = useState(generateRandomString(20));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(newProgress);
      setBinaryCode(numberToBinary(newProgress));
      
      if (now >= endTime) {
        clearInterval(progressInterval);
      }
    }, 50);

    const scrambleInterval = setInterval(() => {
      setScrambleText(generateRandomString(20));
    }, 100);

    const completeTimeout = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(scrambleInterval);
      
      gsap.to('.loader-overlay', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsVisible(false);
          onComplete();
        }
      });
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(scrambleInterval);
      clearTimeout(completeTimeout);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-binary">
          {binaryCode}
        </div>
        <div className="loader-scramble">
          {scrambleText}
        </div>
        <div className="loader-progress-text">
          LOADING...
        </div>
      </div>
    </div>
  );
}
