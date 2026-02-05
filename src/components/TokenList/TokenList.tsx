import React, { useState, useEffect } from 'react';
import { getProtectedTokens, fetchTokenMarketCap } from '../../lib/supabase';
import type { ProtectedToken } from '../../lib/supabase';
import './TokenList.css';

interface TokenWithMcap extends ProtectedToken {
  marketCap?: number | null;
}

function formatNumber(num: number | null | undefined): string {
  if (!num) return '-';
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
  return `$${num.toFixed(0)}`;
}

export default function TokenList() {
  const [tokens, setTokens] = useState<TokenWithMcap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    setLoading(true);
    try {
      const data = await getProtectedTokens();
      
      // Загружаем маркеткап для каждого токена
      const tokensWithMcap = await Promise.all(
        (data || []).map(async (token) => {
          const marketCap = await fetchTokenMarketCap(token.ca);
          return { ...token, marketCap };
        })
      );
      
      setTokens(tokensWithMcap);
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="token-list__loading">Loading tokens...</div>;
  }

  if (tokens.length === 0) {
    return (
      <div className="token-list">
        <div className="token-list__header">
          <span className="token-list__col token-list__col--name">TOKEN</span>
          <span className="token-list__col">STATUS</span>
          <span className="token-list__col">MARKET CAP</span>
          <span className="token-list__col">FEES TO POOL</span>
          <span className="token-list__col">LINKS</span>
        </div>
        <div className="token-list__empty">
          <p>NO PROTECTED TOKENS YET</p>
          <span>Be the first to connect your token!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="token-list">
      <div className="token-list__header">
        <span className="token-list__col token-list__col--name">TOKEN</span>
        <span className="token-list__col">STATUS</span>
        <span className="token-list__col">MARKET CAP</span>
        <span className="token-list__col">FEES TO POOL</span>
        <span className="token-list__col">LINKS</span>
      </div>

      {tokens.map(token => (
        <div key={token.id} className="token-list__item">
          <div className="token-list__col token-list__col--name">
            <div className="token-list__icon">
              {token.ticker?.charAt(0) || '?'}
            </div>
            <div>
              <span className="token-list__token-name">{token.name}</span>
              <span className="token-list__token-ticker">{token.ticker}</span>
            </div>
          </div>
          
          <span className="token-list__col">
            <span className={`token-list__status token-list__status--${token.status}`}>
              {token.status?.toUpperCase()}
            </span>
          </span>
          
          <span className="token-list__col token-list__col--mcap">
            {formatNumber(token.marketCap)}
          </span>
          
          <span className="token-list__col">
            {formatNumber(token.fees_to_pool)}
          </span>
          
          <div className="token-list__col token-list__col--links">
            {token.twitter && (
              <a href={token.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                𝕏
              </a>
            )}
            {token.website && (
              <a href={token.website} target="_blank" rel="noopener noreferrer" title="Website">
                🌐
              </a>
            )}
            {token.telegram && (
              <a href={token.telegram} target="_blank" rel="noopener noreferrer" title="Telegram">
                ✈
              </a>
            )}
            <a 
              href={`https://pump.fun/${token.ca}`} 
              target="_blank" 
              rel="noopener noreferrer"
              title="Pump.fun"
              className="token-list__pump"
            >
              PUMP
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

