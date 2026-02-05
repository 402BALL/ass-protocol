import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import PixelText from '../PixelText';
import { useSound } from '../../hooks/useSound';
import type { CardSize, CardColor } from '../../types';
import './Card.css';

interface CardProps {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  image?: string;
  size?: CardSize;
  color: CardColor;
  isPrivate?: boolean;
  isDimmed?: boolean; // true если другая карточка hovered
  onHover?: (color: CardColor | null) => void;
  onClick?: () => void;
}

const COLOR_MAP: Record<CardColor, string> = {
  yellow: '#FBC92B',
  pink: '#FF1493',
  blue: '#4285f4',
  cyan: '#00CED1',
  coral: '#FF6B6B',
  purple: '#9B59B6',
  orange: '#FF8C00',
  lime: '#32CD32'
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>[]{}';

// Функция для scramble анимации (не хук, можно вызывать где угодно)
function scrambleText(
  text: string, 
  setFn: (val: string) => void, 
  delay: number = 0
): () => void {
  let iterations = 0;
  const maxIterations = 20;
  let intervalId: ReturnType<typeof setInterval>;

  const timeoutId = setTimeout(() => {
    intervalId = setInterval(() => {
      const result = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations / 2) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      
      setFn(result);
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(intervalId);
        setFn(text);
      }
    }, 40);
  }, delay);

  return () => {
    clearTimeout(timeoutId);
    if (intervalId) clearInterval(intervalId);
  };
}

// Компонент для тега с scramble эффектом
function ScrambleTag({ 
  tag, 
  isHovered, 
  isDimmed,
  delay,
  accentColor
}: { 
  tag: string; 
  isHovered: boolean;
  isDimmed: boolean;
  delay: number;
  accentColor: string;
}) {
  const [displayText, setDisplayText] = useState(tag);

  useEffect(() => {
    if (isHovered) {
      setDisplayText('');
      const cleanup = scrambleText(tag, setDisplayText, delay);
      return cleanup;
    } else {
      setDisplayText(tag);
    }
  }, [tag, isHovered, delay]);

  const textColor = isHovered ? accentColor : isDimmed ? '#555' : 'var(--text-primary)';

  return (
    <span 
      className="card__tag pixel-font"
      style={{ 
        backgroundColor: isHovered ? 'rgba(0,0,0,0.5)' : 'var(--bg-secondary)',
        color: textColor,
        borderColor: isHovered ? accentColor : 'transparent'
      }}
    >
      ■ {displayText}
    </span>
  );
}

export default function Card({
  id,
  title,
  subtitle,
  date,
  tags,
  image,
  size = 'medium',
  color,
  isPrivate = false,
  isDimmed = false,
  onHover,
  onClick
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { playCardHover, playCardLeave, playClick, playScramble } = useSound();
  
  // Состояния для scramble текстов
  const [scrambledId, setScrambledId] = useState('');
  const [scrambledSubtitle, setScrambledSubtitle] = useState('');
  const [scrambledTitle, setScrambledTitle] = useState('');
  const [scrambledDate, setScrambledDate] = useState('');

  const binaryId = parseInt(id).toString(2).padStart(8, '0');

  // Эффект для запуска scramble анимаций
  useEffect(() => {
    if (isHovered) {
      const cleanups: (() => void)[] = [];
      
      setScrambledId('');
      setScrambledSubtitle('');
      setScrambledTitle('');
      setScrambledDate('');

      cleanups.push(scrambleText(binaryId, setScrambledId, 0));
      if (subtitle) cleanups.push(scrambleText(subtitle, setScrambledSubtitle, 50));
      cleanups.push(scrambleText(title, setScrambledTitle, 100));
      cleanups.push(scrambleText(date, setScrambledDate, 200));

      return () => cleanups.forEach(cleanup => cleanup());
    } else {
      setScrambledId(binaryId);
      setScrambledSubtitle(subtitle || '');
      setScrambledTitle(title);
      setScrambledDate(date);
    }
  }, [isHovered, binaryId, subtitle, title, date]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(color);
    playCardHover();
    playScramble();

    if (imageRef.current) {
      // Останавливаем предыдущую анимацию
      gsap.killTweensOf(imageRef.current);
      
      // Глитч-эффект появления
      const img = imageRef.current;
      let step = 0;
      const totalSteps = 8;
      
      const baseFilter = 'blur(5px) brightness(0.6)';
      
      const glitchIn = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        
        // Случайные сдвиги и искажения
        const offsetX = (Math.random() - 0.5) * 20 * (1 - progress);
        const offsetY = (Math.random() - 0.5) * 10 * (1 - progress);
        const skew = (Math.random() - 0.5) * 5 * (1 - progress);
        
        img.style.opacity = String(progress);
        img.style.transform = `translate(${offsetX}px, ${offsetY}px) skewX(${skew}deg) scale(${0.95 + progress * 0.05})`;
        img.style.filter = `${baseFilter} brightness(${1 + (1 - progress) * 0.5}) contrast(${1 + (1 - progress) * 0.3})`;
        
        if (step >= totalSteps) {
          clearInterval(glitchIn);
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
          img.style.filter = baseFilter;
        }
      }, 40);
      
      // Сохраняем interval для очистки
      (img as any)._glitchInterval = glitchIn;
    }

    // Только меняем цвет рамки, фон остаётся прозрачным
    if (cardRef.current) {
      cardRef.current.style.borderColor = COLOR_MAP[color];
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
    playCardLeave();

    if (imageRef.current) {
      const img = imageRef.current;
      
      // Очищаем предыдущий interval если есть
      if ((img as any)._glitchInterval) {
        clearInterval((img as any)._glitchInterval);
      }
      gsap.killTweensOf(img);
      
      // Быстрый глитч-эффект исчезновения
      let step = 0;
      const totalSteps = 5;
      const baseFilter = 'blur(5px) brightness(0.6)';
      
      const glitchOut = setInterval(() => {
        step++;
        const progress = 1 - (step / totalSteps);
        
        // Случайные сдвиги
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 15;
        
        img.style.opacity = String(Math.max(0, progress));
        img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${0.9 + progress * 0.1})`;
        img.style.filter = `${baseFilter} brightness(${1 + (1 - progress)}) contrast(${1.5 - progress * 0.5})`;
        
        if (step >= totalSteps) {
          clearInterval(glitchOut);
          img.style.opacity = '0';
          img.style.transform = 'scale(0.95)';
          img.style.filter = baseFilter;
        }
      }, 30);
      
      (img as any)._glitchInterval = glitchOut;
    }

    // Сбрасываем inline стиль, CSS возьмёт --border-color
    if (cardRef.current) {
      cardRef.current.style.borderColor = '';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card card--${size} ${isHovered ? 'card--hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => { playClick(); onClick?.(); }}
      style={{ '--card-color': COLOR_MAP[color] } as React.CSSProperties}
    >
      <div 
        ref={imageRef} 
        className="card__image"
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      />

      <div className="card__content">
        {isPrivate && (
          <div className="card__badge">
            <span className="card__badge-icon">🔒</span>
            <span className="pixel-font">PRIVATE</span>
          </div>
        )}

        <div className="card__info">
          {/* Бинарный ID только когда НЕ hovered */}
          {!isHovered && (
            <div className="card__id">
              <PixelText 
                text={binaryId} 
                pixelSize={size === 'hero' ? 3 : size === 'medium' ? 2 : 1} 
                color={isDimmed ? '#555' : 'var(--text-primary)'}
              />
            </div>
          )}

          <h2 
            className={`card__title card__title--${size}`}
            style={isHovered ? { color: COLOR_MAP[color] } : isDimmed ? { color: '#555' } : undefined}
          >
            {/* Subtitle появляется только при hover */}
            {subtitle && isHovered && (
              <span 
                className="card__subtitle"
                style={{ color: COLOR_MAP[color] }}
              >
                {scrambledSubtitle}
              </span>
            )}
            <span>{isHovered ? scrambledTitle : title}</span>
          </h2>

          <div className="card__date">
            <PixelText 
              text={isHovered ? scrambledDate || ' ' : date} 
              pixelSize={size === 'hero' ? 2 : 1} 
              color={isHovered ? COLOR_MAP[color] : isDimmed ? '#555' : 'var(--text-secondary)'}
            />
          </div>

          <div className="card__tags">
            {tags.map((tag, index) => (
              <ScrambleTag 
                key={index}
                tag={tag}
                isHovered={isHovered}
                isDimmed={isDimmed}
                delay={300 + index * 50}
                accentColor={COLOR_MAP[color]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
