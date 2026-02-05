import React from 'react';
import ConnectTokenForm from '../components/ConnectTokenForm';
import TokenList from '../components/TokenList';

export interface ArticleData {
  id: string;
  title: string;
  subtitle?: string;
  accentColor: string;
  comingSoon?: boolean;
  hasForm?: boolean;
  hasTokenList?: boolean;
  content: React.ReactNode;
}

export const ARTICLES: Record<string, ArticleData> = {
  // Hero - Protocol Overview
  '1': {
    id: '1',
    title: 'PROTECT TRADERS FROM SOL PRICE DROPS',
    accentColor: '#00CED1',
    content: (
      <>
        <p className="article-lead">
          <strong>A.S.S. is a Solana protocol that automatically compensates traders 
          when SOL price drops. Trade protected tokens on Pump.fun and get USDC payouts 
          when the market moves against you.</strong>
        </p>

        <h2>THE PROBLEM</h2>
        <p>
          <strong>When you trade memecoins on Pump.fun, you're exposed to two risks: 
          the token price AND the SOL price. Even if your token moons, a SOL crash 
          can wipe out your gains.</strong>
        </p>

        <h2>THE SOLUTION</h2>
        <p>
          <strong>A.S.S. Protocol creates a shared USDC pool funded by creator fees. 
          When you sell a protected token and SOL has dropped since your purchase, 
          you automatically receive USDC compensation.</strong>
        </p>

        <h2>HOW IT WORKS</h2>
        <p>
          <strong>Token creators route 100% of their creator fees to the protocol. 
          These fees are converted to USDC and pooled together. When traders close 
          positions at a loss due to SOL price drops, the protocol pays out from this pool.</strong>
        </p>

        <h2>KEY BENEFITS</h2>
        <p>
          <strong>For Traders:</strong> Free insurance against SOL volatility. 
          Trade memecoins without worrying about the base currency crashing.
        </p>
        <p>
          <strong>For Creators:</strong> Attract more traders to your token. 
          Protected tokens are more appealing to the community.
        </p>

        <h2>PROTECTION LIMITS</h2>
        <p>
          <strong>• Maximum $1,000 per position<br/>
          • Maximum $5,000 per user per day<br/>
          • Global daily limit of $50,000<br/>
          • 30-minute minimum hold time</strong>
        </p>
      </>
    )
  },

  // CONNECT YOUR TOKEN
  '2': {
    id: '2',
    title: 'CONNECT YOUR TOKEN',
    subtitle: 'FOR CREATORS',
    accentColor: '#FF8C00',
    hasForm: true,
    content: (
      <>
        <p className="article-lead">
          <strong>Connect your existing Pump.fun token to A.S.S. Protocol 
          and get the "Protected" badge.</strong>
        </p>

        <ConnectTokenForm />
      </>
    )
  },

  // LAUNCH NEW TOKEN - Coming Soon
  '3': {
    id: '3',
    title: 'LAUNCH NEW TOKEN',
    subtitle: 'LAUNCHPAD',
    accentColor: '#32CD32',
    comingSoon: true,
    content: (
      <>
        <div className="coming-soon">
          <h2 className="coming-soon__title">COMING SOON</h2>
          <p className="coming-soon__text">
            <strong>Launch new tokens directly through our launchpad 
            with automatic trader protection built-in from day one.</strong>
          </p>
        </div>
      </>
    )
  },

  // HOW PROTECTION WORKS
  '4': {
    id: '4',
    title: 'HOW PROTECTION WORKS',
    subtitle: 'LEARN',
    accentColor: '#FF1493',
    content: (
      <>
        <p className="article-lead">
          <strong>A step-by-step breakdown of how A.S.S. protects traders 
          from SOL price drops. From purchase to payout, everything is automatic.</strong>
        </p>

        <h2>STEP 1: YOU BUY A TOKEN</h2>
        <p>
          <strong>When you buy a Protected token on Pump.fun, our Keeper service 
          detects the transaction and records your entry price, SOL amount, 
          and timestamp.</strong>
        </p>

        <h2>STEP 2: HOLD FOR 30 MINUTES</h2>
        <p>
          <strong>To qualify for protection, you must hold the token for at least 
          30 minutes. This anti-sniper rule prevents bot manipulation.</strong>
        </p>

        <h2>STEP 3: SELL YOUR TOKEN</h2>
        <p>
          <strong>When you sell, the Keeper captures the current SOL price. 
          If SOL has dropped since your purchase, compensation is calculated.</strong>
        </p>

        <h2>THE FORMULA</h2>
        <div className="formula">
          Compensation = (Entry SOL Price − Exit SOL Price) × SOL Amount
        </div>

        <h2>EXAMPLE</h2>
        <p>
          <strong>You buy tokens for 1 SOL when SOL = $200.<br/>
          You sell when SOL = $180.<br/>
          Compensation = ($200 − $180) × 1 = $20 USDC</strong>
        </p>
        <p>
          <strong>The $20 USDC is sent to your wallet automatically. 
          No claims, no applications, no waiting.</strong>
        </p>

        <h2>WHERE DOES THE MONEY COME FROM</h2>
        <p>
          <strong>All compensations are paid from the shared USDC pool. 
          This pool is funded by creator fees from all Protected tokens. 
          Creators contribute, traders benefit.</strong>
        </p>
      </>
    )
  },

  // POOL STATS & TVL
  '5': {
    id: '5',
    title: 'POOL STATS & TVL',
    subtitle: 'ANALYTICS',
    accentColor: '#4285f4',
    content: (
      <>
        <p className="article-lead">
          <strong>Track the protocol's health in real-time. Monitor TVL, 
          fee inflows, and compensation payouts across all Protected tokens.</strong>
        </p>

        <h2>WHAT IS THE POOL</h2>
        <p>
          <strong>The USDC Pool is the shared fund that pays trader compensations. 
          It's filled by creator fees from all Protected tokens and depleted 
          by compensation payouts.</strong>
        </p>

        <h2>KEY METRICS</h2>
        <p>
          <strong>• TVL (Total Value Locked) — Total USDC in the pool<br/>
          • Available Balance — USDC available for payouts<br/>
          • Reserved — 20% always locked for stability<br/>
          • Total Paid Out — All-time compensation volume<br/>
          • Today's Payouts — Compensations paid today</strong>
        </p>

        <h2>POOL FLOW</h2>
        <p>
          <strong>1. Traders swap Protected tokens on Pump.fun<br/>
          2. Creator fees accumulate in SOL<br/>
          3. Protocol operator claims fees<br/>
          4. SOL is swapped to USDC via DEX<br/>
          5. USDC deposited to pool</strong>
        </p>

        <h2>TRANSPARENCY</h2>
        <p>
          <strong>All pool transactions are on-chain. You can verify the 
          GlobalPool account state anytime through Solana Explorer. 
          Full transparency, no hidden balances.</strong>
        </p>
      </>
    )
  },

  // COMPENSATION FORMULA
  '6': {
    id: '6',
    title: 'COMPENSATION FORMULA',
    subtitle: 'TECHNICAL',
    accentColor: '#FBC92B',
    content: (
      <>
        <p className="article-lead">
          <strong>Deep dive into the technical mechanics of compensation calculation 
          and the FIFO position accounting system.</strong>
        </p>

        <h2>BASE FORMULA</h2>
        <div className="formula">
          compensation_usd = (entry_sol_price − exit_sol_price) × sol_amount
        </div>

        <h2>PARAMETERS</h2>
        <p>
          <strong>• entry_sol_price — SOL price at buy time (in cents)<br/>
          • exit_sol_price — SOL price at sell time (in cents)<br/>
          • sol_amount — SOL spent on the position</strong>
        </p>

        <h2>PAYOUT CONDITION</h2>
        <p>
          <strong>Compensation only pays when exit_sol_price &lt; entry_sol_price. 
          If SOL went up or stayed flat, compensation = 0.</strong>
        </p>

        <h2>FIFO ACCOUNTING</h2>
        <p>
          <strong>Positions are tracked First In, First Out. When you sell, 
          the oldest lots close first.</strong>
        </p>
        <p>
          <strong>Example with 3 buys:<br/>
          • Lot 1: 0.5 SOL @ $200<br/>
          • Lot 2: 1.0 SOL @ $190<br/>
          • Lot 3: 0.5 SOL @ $185</strong>
        </p>
        <p>
          <strong>Selling 1 SOL closes Lot 1 (0.5 SOL) completely, 
          then 0.5 SOL from Lot 2. Each lot's compensation is calculated 
          separately based on its entry price.</strong>
        </p>

        <h2>LIMIT APPLICATION ORDER</h2>
        <p>
          <strong>1. Position limit ($1,000)<br/>
          2. User daily limit ($5,000)<br/>
          3. Global daily limit ($50,000)<br/>
          4. Available pool balance (minus 20% reserve)</strong>
        </p>
      </>
    )
  },

  // RISK MANAGEMENT
  '7': {
    id: '7',
    title: 'RISK MANAGEMENT',
    subtitle: 'SAFEGUARDS',
    accentColor: '#FF6B6B',
    content: (
      <>
        <p className="article-lead">
          <strong>How the protocol protects itself from pool depletion 
          and remains solvent even during extreme SOL crashes.</strong>
        </p>

        <h2>MULTI-LAYER PROTECTION</h2>
        <p>
          <strong>A.S.S. uses multiple mechanisms to manage risk 
          and ensure long-term sustainability.</strong>
        </p>

        <h2>30-MINUTE HOLD RULE</h2>
        <p>
          <strong>Traders must hold tokens for at least 30 minutes to qualify. 
          This prevents bots from gaming SOL price fluctuations and 
          draining the pool with rapid trades.</strong>
        </p>

        <h2>POSITION LIMIT: $1,000</h2>
        <p>
          <strong>No single trade can receive more than $1,000 in compensation. 
          Large traders can't drain the pool with one transaction.</strong>
        </p>

        <h2>USER DAILY LIMIT: $5,000</h2>
        <p>
          <strong>Each wallet is capped at $5,000 per day. 
          Even with multiple trades, no single user can exhaust the pool.</strong>
        </p>

        <h2>GLOBAL DAILY LIMIT: $50,000</h2>
        <p>
          <strong>Black swan protection. If SOL crashes hard, 
          the protocol won't pay more than $50,000 in a single day. 
          This preserves the pool for continued operation.</strong>
        </p>

        <h2>20% RESERVE RATIO</h2>
        <p>
          <strong>One-fifth of the pool is always locked and cannot be used 
          for payouts. This ensures the protocol can continue operating 
          even under high demand.</strong>
        </p>

        <h2>PARTIAL PAYOUTS</h2>
        <p>
          <strong>If limits are reached, users receive partial compensation. 
          The protocol stays solvent, and traders still get protection.</strong>
        </p>
      </>
    )
  },

  // PROTECTED TOKENS LIST
  '8': {
    id: '8',
    title: 'PROTECTED TOKENS LIST',
    subtitle: 'EXPLORE',
    accentColor: '#9B59B6',
    hasTokenList: true,
    content: (
      <>
        <p className="article-lead">
          <strong>All tokens with trader protection enabled. 
          Trade these tokens and stay insured against SOL drops.</strong>
        </p>

        <TokenList />
      </>
    )
  }
};
