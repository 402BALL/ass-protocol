import React from 'react';
import PixelText from '../PixelText';
import { useScrambleText } from '../../hooks/useScrambleText';
import './HeroSection.css';

export default function HeroSection() {
  const ctaText = useScrambleText({ text: 'CONNECT TOKEN', duration: 500 });

  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__badge pixel-font">
          <span className="hero__badge-dot"></span>
          SOLANA PROTOCOL
        </div>
        
        <h1 className="hero__title">
          <PixelText 
            text="PROTECT TRADERS" 
            pixelSize={4} 
            color="var(--text-primary)"
          />
        </h1>
        
        <h2 className="hero__subtitle">
          <PixelText 
            text="FROM SOL PRICE DROPS" 
            pixelSize={3} 
            color="var(--text-primary)"
          />
        </h2>

        <p className="hero__description">
          Token creators route 100% of creator fees to fund a shared USDC pool.
          When SOL drops, traders get compensated automatically.
        </p>

        <div className="hero__actions">
          <button 
            className="hero__cta hero__cta--primary"
            {...ctaText.handlers}
          >
            <PixelText 
              text={ctaText.displayText} 
              pixelSize={2} 
              color="var(--bg-primary)"
            />
          </button>
          
          <a href="#how-it-works" className="hero__cta hero__cta--secondary">
            <PixelText 
              text="LEARN MORE" 
              pixelSize={2} 
              color="var(--text-primary)"
            />
          </a>
        </div>

        <div className="hero__features">
          <div className="hero__feature">
            <span className="hero__feature-icon">◈</span>
            <span className="hero__feature-text pixel-font">NO USER FEES</span>
          </div>
          <div className="hero__feature">
            <span className="hero__feature-icon">◈</span>
            <span className="hero__feature-text pixel-font">AUTO PAYOUTS</span>
          </div>
          <div className="hero__feature">
            <span className="hero__feature-icon">◈</span>
            <span className="hero__feature-text pixel-font">PUMP.FUN NATIVE</span>
          </div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__graphic">
          <div className="hero__graphic-layer hero__graphic-layer--1"></div>
          <div className="hero__graphic-layer hero__graphic-layer--2"></div>
          <div className="hero__graphic-layer hero__graphic-layer--3"></div>
          <div className="hero__graphic-shield">
            <span>◆</span>
          </div>
        </div>
      </div>
    </section>
  );
}

