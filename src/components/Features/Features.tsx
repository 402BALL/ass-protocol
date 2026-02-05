import React from 'react';
import PixelText from '../PixelText';
import './Features.css';

const FEATURES = [
  {
    title: '5 MIN HOLD RULE',
    description: 'Anti-sniper protection: traders must hold at least 5 minutes to qualify for compensation',
    icon: '⏱'
  },
  {
    title: 'FIFO ACCOUNTING',
    description: 'First-in-first-out lot tracking ensures fair and transparent settlement',
    icon: '📊'
  },
  {
    title: 'DAILY LIMITS',
    description: 'Smart caps per position, per user, and globally to keep the protocol solvent',
    icon: '🔒'
  },
  {
    title: 'RESERVE RATIO',
    description: '20% of pool always locked as safety reserve for extreme market conditions',
    icon: '🛡'
  },
  {
    title: 'PYTH ORACLE',
    description: 'Real-time SOL/USD price feed from Pyth Network with staleness checks',
    icon: '📡'
  },
  {
    title: 'NO USER FEES',
    description: 'Traders pay nothing extra — all protection funded by creator fees',
    icon: '💎'
  }
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__header">
        <span className="features__label pixel-font">RISK MANAGEMENT</span>
        <h2 className="features__title">
          <PixelText 
            text="BUILT-IN SAFEGUARDS" 
            pixelSize={3} 
            color="var(--text-primary)"
          />
        </h2>
      </div>

      <div className="features__grid">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="features__item">
            <div className="features__item-icon">{feature.icon}</div>
            <h3 className="features__item-title pixel-font">{feature.title}</h3>
            <p className="features__item-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

