import React from 'react';
import './Footer.css';

interface FooterProps {
  scrollProgress?: number;
}

export default function Footer({ scrollProgress = 0 }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <span className="footer__copyright pixel-font">
            AUTOMATIC STABLE SYSTEM © 2026. BUILT ON SOLANA.
          </span>
        </div>

        <div className="footer__links">
          <a href="https://x.com/lilisoldev" target="_blank" rel="noopener noreferrer" className="footer__link pixel-font">
            TWITTER
          </a>
        </div>

      </div>
    </footer>
  );
}
