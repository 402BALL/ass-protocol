import React from 'react';
import PixelText from '../PixelText';
import './HowItWorks.css';

const STEPS = [
  {
    number: '01',
    title: 'CREATOR CONNECTS',
    description: 'Token creator sets 100% creator fees to protocol wallet on Pump.fun',
    icon: '⬡'
  },
  {
    number: '02',
    title: 'FEES ACCUMULATE',
    description: 'All trading fees are converted to USDC and deposited into shared pool',
    icon: '◈'
  },
  {
    number: '03',
    title: 'TRADER BUYS',
    description: 'Trader buys protected token on Pump.fun — no extra steps needed',
    icon: '◇'
  },
  {
    number: '04',
    title: 'AUTO COMPENSATION',
    description: 'If SOL drops and trader held 5+ min, USDC is paid automatically',
    icon: '◆'
  }
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works__header">
        <span className="how-it-works__label pixel-font">PROTOCOL FLOW</span>
        <h2 className="how-it-works__title">
          <PixelText 
            text="HOW IT WORKS" 
            pixelSize={3} 
            color="var(--text-primary)"
          />
        </h2>
      </div>

      <div className="how-it-works__steps">
        {STEPS.map((step, index) => (
          <div key={step.number} className="how-it-works__step">
            <div className="how-it-works__step-number pixel-font">{step.number}</div>
            <div className="how-it-works__step-icon">{step.icon}</div>
            <h3 className="how-it-works__step-title pixel-font">{step.title}</h3>
            <p className="how-it-works__step-description">{step.description}</p>
            {index < STEPS.length - 1 && (
              <div className="how-it-works__step-connector">
                <span>→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="how-it-works__formula">
        <div className="how-it-works__formula-label pixel-font">COMPENSATION FORMULA</div>
        <div className="how-it-works__formula-content">
          <code className="how-it-works__formula-code">
            compensation = (entry_sol_price - exit_sol_price) × sol_amount
          </code>
        </div>
        <p className="how-it-works__formula-note">
          Only paid when SOL price drops and position held ≥ 5 minutes
        </p>
      </div>
    </section>
  );
}

