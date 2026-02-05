import React, { useState, useEffect } from 'react';
import PixelText from '../PixelText';
import './Stats.css';

const STATS = [
  {
    label: 'POOL TVL',
    value: '$127,450',
    suffix: 'USDC',
    change: '+12.5%'
  },
  {
    label: 'TOTAL PAYOUTS',
    value: '$89,230',
    suffix: 'USDC',
    change: null
  },
  {
    label: 'PROTECTED TOKENS',
    value: '42',
    suffix: 'TOKENS',
    change: '+3 today'
  },
  {
    label: 'ACTIVE TRADERS',
    value: '1,847',
    suffix: 'USERS',
    change: null
  }
];

export default function Stats() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="stats-section">
      <div className="stats__header">
        <span className="stats__label pixel-font">LIVE METRICS</span>
        <h2 className="stats__title">
          <PixelText 
            text="PROTOCOL STATS" 
            pixelSize={3} 
            color="var(--text-primary)"
          />
        </h2>
      </div>

      <div className="stats__grid">
        {STATS.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`stats__item ${animated ? 'stats__item--animated' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="stats__item-label pixel-font">{stat.label}</span>
            <div className="stats__item-value">
              <span className="stats__item-number">{stat.value}</span>
              <span className="stats__item-suffix pixel-font">{stat.suffix}</span>
            </div>
            {stat.change && (
              <span className="stats__item-change pixel-font">{stat.change}</span>
            )}
          </div>
        ))}
      </div>

      <div className="stats__disclaimer pixel-font">
        * Stats are for demonstration purposes. Real data coming soon.
      </div>
    </section>
  );
}

