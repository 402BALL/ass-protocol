-- Automatic Stable System (A.S.S.) Supabase Schema
-- Выполни этот SQL в Supabase Dashboard → SQL Editor

-- Таблица заявок на подключение токенов
CREATE TABLE token_requests (
  id SERIAL PRIMARY KEY,
  ca TEXT NOT NULL,
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  twitter TEXT,
  website TEXT,
  telegram TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица защищённых токенов
CREATE TABLE protected_tokens (
  id SERIAL PRIMARY KEY,
  ca TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  twitter TEXT,
  website TEXT,
  telegram TEXT,
  market_cap DECIMAL,
  volume_24h DECIMAL,
  fees_to_pool DECIMAL DEFAULT 0,
  paid_out DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX idx_token_requests_status ON token_requests(status);
CREATE INDEX idx_protected_tokens_status ON protected_tokens(status);
CREATE INDEX idx_protected_tokens_ca ON protected_tokens(ca);

-- RLS (Row Level Security) - для безопасности
ALTER TABLE token_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE protected_tokens ENABLE ROW LEVEL SECURITY;

-- Политики: разрешаем всем читать protected_tokens
CREATE POLICY "Allow public read protected_tokens" ON protected_tokens
  FOR SELECT USING (true);

-- Политики: разрешаем всем создавать заявки
CREATE POLICY "Allow public insert token_requests" ON token_requests
  FOR INSERT WITH CHECK (true);

-- Политики: только авторизованные могут изменять (для админки используй service_role key)
CREATE POLICY "Allow authenticated full access token_requests" ON token_requests
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated full access protected_tokens" ON protected_tokens
  FOR ALL USING (auth.role() = 'authenticated');

-- Или если хочешь простой доступ без авторизации (менее безопасно):
-- CREATE POLICY "Allow all token_requests" ON token_requests FOR ALL USING (true);
-- CREATE POLICY "Allow all protected_tokens" ON protected_tokens FOR ALL USING (true);

