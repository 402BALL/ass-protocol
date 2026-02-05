import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Loader from './components/Loader';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import AdminPanel from './components/AdminPanel';
import { useTheme } from './hooks/useTheme';
import { useActiveColor } from './hooks/useActiveColor';
import { useSound } from './hooks/useSound';
import { ARTICLES } from './data/articles';
import type { CardColor } from './types';
import './styles/globals.css';

// A.S.S. (Automatic Stable System) контент для карточек
const SECTIONS = [
  {
    id: '1',
    title: 'PROTECT TRADERS FROM SOL PRICE DROPS',
    subtitle: 'A.S.S. PROTOCOL',
    date: 'SOLANA PROTOCOL',
    tags: ['DeFi', 'PUMP.FUN'],
    color: 'cyan' as CardColor,
    size: 'hero' as const,
    isPrivate: false,
    image: '/images/cards/hero.png'
  },
  {
    id: '2',
    title: 'CONNECT YOUR TOKEN',
    subtitle: 'FOR CREATORS',
    date: 'GET STARTED',
    tags: ['ONBOARDING', 'PUMP.FUN'],
    color: 'orange' as CardColor,
    size: 'medium' as const,
    image: '/images/cards/connect-token.png'
  },
  {
    id: '3',
    title: 'LAUNCH NEW TOKEN',
    subtitle: 'LAUNCHPAD',
    date: 'COMING SOON',
    tags: ['CREATE', 'PROTECTED'],
    color: 'lime' as CardColor,
    size: 'medium' as const,
    image: '/images/cards/launch-token.png'
  },
  {
    id: '4',
    title: 'HOW PROTECTION WORKS',
    subtitle: 'LEARN',
    date: 'STEP BY STEP',
    tags: ['GUIDE', 'DOCUMENTATION'],
    color: 'pink' as CardColor,
    size: 'medium' as const,
    image: '/images/cards/how-protection.png'
  },
  {
    id: '5',
    title: 'POOL STATS & TVL',
    subtitle: 'ANALYTICS',
    date: 'REAL-TIME',
    tags: ['USDC POOL', 'METRICS'],
    color: 'blue' as CardColor,
    size: 'medium' as const,
    image: '/images/cards/pool-stats.png'
  },
  {
    id: '6',
    title: 'COMPENSATION FORMULA',
    subtitle: 'TECHNICAL',
    date: 'HOW PAYOUTS WORK',
    tags: ['MATH', 'FIFO'],
    color: 'yellow' as CardColor,
    size: 'small' as const,
    image: '/images/cards/compensation-formula.png'
  },
  {
    id: '7',
    title: 'RISK MANAGEMENT',
    subtitle: 'SAFEGUARDS',
    date: 'LIMITS & RESERVE',
    tags: ['SECURITY', 'CAPS'],
    color: 'coral' as CardColor,
    size: 'small' as const,
    image: '/images/cards/risk-management.png'
  },
  {
    id: '8',
    title: 'PROTECTED TOKENS LIST',
    subtitle: 'EXPLORE',
    date: 'LIVE DATA',
    tags: ['TOKENS', 'STATS'],
    color: 'purple' as CardColor,
    size: 'small' as const,
    image: '/images/cards/tokens-list.png'
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { setColor, clearColor } = useActiveColor();
  const { playTransition } = useSound();

  // Секретный доступ к админке
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+A
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
        e.preventDefault();
        setShowAdmin(true);
      }
    };
    
    // Проверяем URL при загрузке и изменении
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
        setShowAdmin(true);
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        '.card',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [isLoading]);

  const handleCardHover = (cardId: string | null, color: CardColor | null) => {
    if (color && cardId) {
      setColor(color);
      setHoveredCardId(cardId);
    } else {
      clearColor();
      setHoveredCardId(null);
    }
  };

  const handleCardClick = (id: string) => {
    playTransition();
    setActiveArticle(id);
    window.scrollTo(0, 0);
  };

  const handleBackFromArticle = () => {
    playTransition();
    setActiveArticle(null);
  };

  // Если открыта админка
  if (showAdmin) {
    return (
      <div className="app">
        <AdminPanel onBack={() => setShowAdmin(false)} />
      </div>
    );
  }

  // Если открыта статья — показываем её
  if (activeArticle && ARTICLES[activeArticle]) {
    const article = ARTICLES[activeArticle];
    return (
      <div className="app">
        <ArticlePage
          title={article.title}
          subtitle={article.subtitle}
          content={article.content}
          accentColor={article.accentColor}
          onBack={handleBackFromArticle}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {isLoading && (
        <Loader 
          onComplete={() => setIsLoading(false)} 
          duration={2500}
        />
      )}

      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onNavigate={(page) => {
          playTransition();
          // Map nav items to article IDs
          const navMap: Record<string, string> = {
            'how-it-works': '4',
            'tokens': '8',
            'connect': '2'
          };
          if (navMap[page]) {
            setActiveArticle(navMap[page]);
            window.scrollTo(0, 0);
          }
        }}
      />

      <main className="main-content">
        <div className="container">
          <div className={`card-grid ${hoveredCardId ? 'card-grid--has-hover' : ''}`}>
            {SECTIONS.map((section) => (
              <Card
                key={section.id}
                id={section.id}
                title={section.title}
                subtitle={section.subtitle}
                date={section.date}
                tags={section.tags}
                color={section.color}
                size={section.size}
                isPrivate={section.isPrivate}
                isDimmed={hoveredCardId !== null && hoveredCardId !== section.id}
                image={section.image}
                onHover={(color) => handleCardHover(color ? section.id : null, color)}
                onClick={() => handleCardClick(section.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer scrollProgress={scrollProgress} />
    </div>
  );
}

export default App;
