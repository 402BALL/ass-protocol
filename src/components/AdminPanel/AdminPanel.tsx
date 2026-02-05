import React, { useState, useEffect } from 'react';
import { 
  getTokenRequests, 
  updateTokenRequest, 
  deleteTokenRequest,
  getProtectedTokens,
  addProtectedToken,
  updateProtectedToken,
  deleteProtectedToken
} from '../../lib/supabase';
import type { TokenRequest, ProtectedToken } from '../../lib/supabase';
import './AdminPanel.css';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'tokens'>('requests');
  const [requests, setRequests] = useState<TokenRequest[]>([]);
  const [tokens, setTokens] = useState<ProtectedToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newToken, setNewToken] = useState({
    ca: '',
    name: '',
    ticker: '',
    twitter: '',
    website: '',
    telegram: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [requestsData, tokensData] = await Promise.all([
        getTokenRequests(),
        getProtectedTokens()
      ]);
      setRequests(requestsData || []);
      setTokens(tokensData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleApproveRequest = async (request: TokenRequest) => {
    try {
      // Добавляем в protected_tokens
      await addProtectedToken({
        ca: request.ca,
        name: request.name,
        ticker: request.ticker,
        twitter: request.twitter,
        website: request.website,
        telegram: request.telegram,
        status: 'active',
        fees_to_pool: 0,
        paid_out: 0
      });
      
      // Обновляем статус заявки
      await updateTokenRequest(request.id!, { status: 'approved' });
      
      loadData();
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Error approving request');
    }
  };

  const handleRejectRequest = async (id: number) => {
    try {
      await updateTokenRequest(id, { status: 'rejected' });
      loadData();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleDeleteRequest = async (id: number) => {
    if (confirm('Delete this request?')) {
      try {
        await deleteTokenRequest(id);
        loadData();
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  const handleDeleteToken = async (id: number) => {
    if (confirm('Delete this token?')) {
      try {
        await deleteProtectedToken(id);
        loadData();
      } catch (error) {
        console.error('Error deleting token:', error);
      }
    }
  };

  const handleToggleTokenStatus = async (token: ProtectedToken) => {
    try {
      await updateProtectedToken(token.id!, { 
        status: token.status === 'active' ? 'paused' : 'active' 
      });
      loadData();
    } catch (error) {
      console.error('Error updating token:', error);
    }
  };

  const handleAddToken = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProtectedToken({
        ...newToken,
        status: 'active',
        fees_to_pool: 0,
        paid_out: 0
      });
      setNewToken({ ca: '', name: '', ticker: '', twitter: '', website: '', telegram: '' });
      setShowAddForm(false);
      loadData();
    } catch (error) {
      console.error('Error adding token:', error);
      alert('Error adding token');
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <button className="admin-back" onClick={onBack}>
          ◀ BACK
        </button>
        <h1 className="admin-title">ADMIN PANEL</h1>
      </header>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'requests' ? 'admin-tab--active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          REQUESTS ({requests.filter(r => r.status === 'pending').length})
        </button>
        <button 
          className={`admin-tab ${activeTab === 'tokens' ? 'admin-tab--active' : ''}`}
          onClick={() => setActiveTab('tokens')}
        >
          PROTECTED TOKENS ({tokens.length})
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : activeTab === 'requests' ? (
          <div className="admin-requests">
            {requests.length === 0 ? (
              <div className="admin-empty">No requests yet</div>
            ) : (
              requests.map(request => (
                <div key={request.id} className={`admin-request admin-request--${request.status}`}>
                  <div className="admin-request__info">
                    <div className="admin-request__header">
                      <span className="admin-request__name">{request.name}</span>
                      <span className="admin-request__ticker">{request.ticker}</span>
                      <span className={`admin-request__status admin-request__status--${request.status}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="admin-request__ca">{request.ca}</div>
                    <div className="admin-request__links">
                      {request.twitter && <a href={request.twitter} target="_blank">Twitter</a>}
                      {request.website && <a href={request.website} target="_blank">Website</a>}
                      {request.telegram && <a href={request.telegram} target="_blank">Telegram</a>}
                    </div>
                    <div className="admin-request__date">
                      {new Date(request.created_at!).toLocaleString()}
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="admin-request__actions">
                      <button 
                        className="admin-btn admin-btn--approve"
                        onClick={() => handleApproveRequest(request)}
                      >
                        APPROVE
                      </button>
                      <button 
                        className="admin-btn admin-btn--reject"
                        onClick={() => handleRejectRequest(request.id!)}
                      >
                        REJECT
                      </button>
                    </div>
                  )}
                  
                  <button 
                    className="admin-btn admin-btn--delete"
                    onClick={() => handleDeleteRequest(request.id!)}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="admin-tokens">
            <button 
              className="admin-btn admin-btn--add"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'CANCEL' : '+ ADD TOKEN MANUALLY'}
            </button>

            {showAddForm && (
              <form className="admin-add-form" onSubmit={handleAddToken}>
                <input
                  type="text"
                  placeholder="Contract Address (CA)"
                  value={newToken.ca}
                  onChange={e => setNewToken({...newToken, ca: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Token Name"
                  value={newToken.name}
                  onChange={e => setNewToken({...newToken, name: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Ticker"
                  value={newToken.ticker}
                  onChange={e => setNewToken({...newToken, ticker: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  value={newToken.twitter}
                  onChange={e => setNewToken({...newToken, twitter: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Website URL"
                  value={newToken.website}
                  onChange={e => setNewToken({...newToken, website: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Telegram URL"
                  value={newToken.telegram}
                  onChange={e => setNewToken({...newToken, telegram: e.target.value})}
                />
                <button type="submit" className="admin-btn admin-btn--submit">
                  ADD TOKEN
                </button>
              </form>
            )}

            {tokens.length === 0 ? (
              <div className="admin-empty">No protected tokens yet</div>
            ) : (
              tokens.map(token => (
                <div key={token.id} className={`admin-token admin-token--${token.status}`}>
                  <div className="admin-token__info">
                    <div className="admin-token__header">
                      <span className="admin-token__name">{token.name}</span>
                      <span className="admin-token__ticker">{token.ticker}</span>
                      <span className={`admin-token__status admin-token__status--${token.status}`}>
                        {token.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="admin-token__ca">{token.ca}</div>
                    <div className="admin-token__stats">
                      <span>Fees: ${token.fees_to_pool || 0}</span>
                      <span>Paid: ${token.paid_out || 0}</span>
                    </div>
                  </div>
                  
                  <div className="admin-token__actions">
                    <button 
                      className={`admin-btn ${token.status === 'active' ? 'admin-btn--pause' : 'admin-btn--activate'}`}
                      onClick={() => handleToggleTokenStatus(token)}
                    >
                      {token.status === 'active' ? 'PAUSE' : 'ACTIVATE'}
                    </button>
                    <button 
                      className="admin-btn admin-btn--delete"
                      onClick={() => handleDeleteToken(token.id!)}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

