import React, { useState } from 'react';
import PixelText from '../PixelText';
import { useScrambleText } from '../../hooks/useScrambleText';
import './ConnectToken.css';

export default function ConnectToken() {
  const [tokenAddress, setTokenAddress] = useState('');
  const connectText = useScrambleText({ text: 'CONNECT TOKEN', duration: 500 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Connecting token:', tokenAddress);
    // TODO: Implement actual token connection
  };

  return (
    <section className="connect-token" id="connect">
      <div className="connect-token__content">
        <div className="connect-token__info">
          <span className="connect-token__label pixel-font">FOR CREATORS</span>
          <h2 className="connect-token__title">
            <PixelText 
              text="CONNECT YOUR TOKEN" 
              pixelSize={3} 
              color="var(--text-primary)"
            />
          </h2>
          <p className="connect-token__description">
            Already have a token on Pump.fun? Connect it to A.S.S. 
            and give your traders built-in protection from SOL price drops.
          </p>

          <div className="connect-token__steps">
            <div className="connect-token__step">
              <span className="connect-token__step-number pixel-font">1</span>
              <span className="connect-token__step-text">Go to Pump.fun → Edit Distribution</span>
            </div>
            <div className="connect-token__step">
              <span className="connect-token__step-number pixel-font">2</span>
              <span className="connect-token__step-text">Set protocol wallet as 100% recipient</span>
            </div>
            <div className="connect-token__step">
              <span className="connect-token__step-number pixel-font">3</span>
              <span className="connect-token__step-text">Enter token address below and connect</span>
            </div>
          </div>
        </div>

        <form className="connect-token__form" onSubmit={handleSubmit}>
          <div className="connect-token__form-header pixel-font">
            TOKEN DETAILS
          </div>
          
          <div className="connect-token__form-body">
            <div className="connect-token__field">
              <label className="connect-token__field-label pixel-font">
                TOKEN MINT / CA
              </label>
              <input
                type="text"
                className="connect-token__field-input"
                placeholder="Enter Solana token address..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>

            <div className="connect-token__protocol-wallet">
              <span className="connect-token__wallet-label pixel-font">PROTOCOL WALLET</span>
              <code className="connect-token__wallet-address">
                CRFee...xxxx
              </code>
              <button type="button" className="connect-token__copy-btn pixel-font">
                COPY
              </button>
            </div>

            <button 
              type="submit" 
              className="connect-token__submit"
              {...connectText.handlers}
            >
              <PixelText 
                text={connectText.displayText} 
                pixelSize={2} 
                color="var(--bg-primary)"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

