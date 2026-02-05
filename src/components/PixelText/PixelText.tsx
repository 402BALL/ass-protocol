import React, { useEffect, useRef, useState } from 'react';
import './PixelText.css';

const PIXEL_FONT: Record<string, string[]> = {
  'A': ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  'B': ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  'C': ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  'D': ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  'E': ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  'F': ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  'G': ['01110', '10001', '10000', '10111', '10001', '10001', '01110'],
  'H': ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  'I': ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  'J': ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  'K': ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  'L': ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  'M': ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  'N': ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  'O': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  'P': ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  'Q': ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  'R': ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  'S': ['01110', '10001', '10000', '01110', '00001', '10001', '01110'],
  'T': ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  'U': ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  'V': ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  'W': ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  'X': ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  'Y': ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  'Z': ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10011', '10101', '10101', '10101', '11001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  '3': ['01110', '10001', '00001', '00110', '00001', '10001', '01110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
  ':': ['00000', '01100', '01100', '00000', '01100', '01100', '00000'],
};

interface PixelTextProps {
  text: string;
  color?: string;
  pixelSize?: number;
  className?: string;
  bold?: boolean;
}

export default function PixelText({ 
  text, 
  color = '#ffffff', 
  pixelSize = 3,
  className = '',
  bold = false
}: PixelTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorTrigger, setColorTrigger] = useState(0);

  // Слушаем изменения темы и активного цвета
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-active-color') {
          // Триггерим перерисовку
          setColorTrigger(prev => prev + 1);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const upperText = text.toUpperCase();
    const charWidth = 5;
    const charHeight = 7;
    const spacing = 1;
    
    const totalWidth = upperText.length * (charWidth + spacing) * pixelSize;
    const totalHeight = charHeight * pixelSize;
    
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Карта активных цветов
    const activeColorMap: Record<string, string> = {
      yellow: '#FBC92B',
      pink: '#FF1493',
      blue: '#4285f4',
      cyan: '#00CED1',
      coral: '#FF6B6B',
      purple: '#9B59B6',
      orange: '#FF8C00',
      lime: '#32CD32'
    };

    // Получаем цвет
    let fillColor = color;
    if (color.startsWith('var(')) {
      const varName = color.slice(4, -1);
      const activeColor = document.documentElement.getAttribute('data-active-color');
      
      // Если есть активный цвет и запрашивается --text-primary, используем его
      if (activeColor && varName === '--text-primary' && activeColorMap[activeColor]) {
        fillColor = activeColorMap[activeColor];
      } else {
        // Иначе читаем CSS переменную
        fillColor = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        if (!fillColor) {
          // Fallback для темы
          const theme = document.documentElement.getAttribute('data-theme');
          fillColor = theme === 'dark' ? '#ffffff' : '#000000';
        }
      }
    }

    ctx.fillStyle = fillColor;

    // Размер пикселя и зазор
    const gap = bold ? 0 : 1;
    const actualPixelSize = pixelSize;

    for (let charIndex = 0; charIndex < upperText.length; charIndex++) {
      const char = upperText[charIndex];
      const charData = PIXEL_FONT[char] || PIXEL_FONT[' '];
      const offsetX = charIndex * (charWidth + spacing) * actualPixelSize;

      for (let row = 0; row < charData.length; row++) {
        for (let col = 0; col < charData[row].length; col++) {
          if (charData[row][col] === '1') {
            ctx.fillRect(
              offsetX + col * actualPixelSize,
              row * actualPixelSize,
              actualPixelSize - gap,
              actualPixelSize - gap
            );
          }
        }
      }
    }
  }, [text, color, pixelSize, colorTrigger, bold]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pixel-text-canvas ${className}`}
    />
  );
}
