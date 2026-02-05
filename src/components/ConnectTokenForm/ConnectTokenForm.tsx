import React, { useState } from 'react';
import { submitTokenRequest } from '../../lib/supabase';
import { useSound } from '../../hooks/useSound';
import './ConnectTokenForm.css';

const PROTOCOL_WALLET = '899G4hYaDdbuSujxKw4f6k8N9Fp5MURXEasJFyBdPDq7';

export default function ConnectTokenForm() {
  const [formData, setFormData] = useState({
    ca: '',
    name: '',
    ticker: '',
    twitter: '',
    website: '',
    telegram: ''
  });
  const [feesConfirmed, setFeesConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { playClick, playSuccess, playError, playHover } = useSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    
    if (!feesConfirmed) {
      setError('Please confirm that you have set the fees');
      playError();
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitTokenRequest(formData);
      setSubmitted(true);
      playSuccess();
    } catch (err) {
      console.error('Error submitting:', err);
      setError('Error submitting request. Please try again.');
      playError();
    }
    
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="connect-form__success">
        <h3>REQUEST SUBMITTED!</h3>
        <p>Your token connection request has been received. 
        We will review it and add your token to the Protected list soon.</p>
      </div>
    );
  }

  return (
    <form className="connect-form" onSubmit={handleSubmit}>
      <div className="connect-form__group">
        <label className="connect-form__label">CONTRACT ADDRESS (CA) *</label>
        <input 
          type="text" 
          className="connect-form__input" 
          placeholder="Enter token CA..."
          value={formData.ca}
          onChange={e => setFormData({...formData, ca: e.target.value})}
          required
        />
      </div>

      <div className="connect-form__group">
        <label className="connect-form__label">TOKEN NAME *</label>
        <input 
          type="text" 
          className="connect-form__input" 
          placeholder="e.g. My Awesome Token"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="connect-form__group">
        <label className="connect-form__label">TICKER *</label>
        <input 
          type="text" 
          className="connect-form__input" 
          placeholder="e.g. $MAT"
          value={formData.ticker}
          onChange={e => setFormData({...formData, ticker: e.target.value})}
          required
        />
      </div>

      <div className="connect-form__group">
        <label className="connect-form__label">X (TWITTER)</label>
        <input 
          type="text" 
          className="connect-form__input" 
          placeholder="https://x.com/..."
          value={formData.twitter}
          onChange={e => setFormData({...formData, twitter: e.target.value})}
        />
      </div>

      <div className="connect-form__group">
        <label className="connect-form__label">WEBSITE</label>
        <input 
          type="text" 
          className="connect-form__input" 
          placeholder="https://..."
          value={formData.website}
          onChange={e => setFormData({...formData, website: e.target.value})}
        />
      </div>

      <div className="connect-form__group">
        <label className="connect-form__label">TELEGRAM</label>
        <input 
          type="text" 
          className="connect-form__input" 
          placeholder="https://t.me/..."
          value={formData.telegram}
          onChange={e => setFormData({...formData, telegram: e.target.value})}
        />
      </div>

      <div className="connect-form__wallet">
        <label className="connect-form__label">PROTOCOL WALLET FOR FEES</label>
        <div className="connect-form__wallet-address">{PROTOCOL_WALLET}</div>
        <p className="connect-form__wallet-hint">
          Set 100% of creator fees to this wallet on Pump.fun before submitting
        </p>
      </div>

      <div className="connect-form__checkbox-group">
        <input 
          type="checkbox" 
          id="fees-confirm" 
          className="connect-form__checkbox"
          checked={feesConfirmed}
          onChange={e => setFeesConfirmed(e.target.checked)}
          required
        />
        <label htmlFor="fees-confirm" className="connect-form__checkbox-label">
          I confirm that I have set 100% creator fees to the protocol wallet
        </label>
      </div>

      {error && <div className="connect-form__error">{error}</div>}

      <button 
        type="submit" 
        className="connect-form__submit"
        disabled={submitting}
        onMouseEnter={playHover}
      >
        {submitting ? 'SUBMITTING...' : 'CONNECT TOKEN'}
      </button>
    </form>
  );
}

