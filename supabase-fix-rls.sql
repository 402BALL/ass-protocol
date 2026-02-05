-- Исправление RLS политик для анонимного доступа
-- Выполни в Supabase Dashboard → SQL Editor

-- Удаляем старые политики
DROP POLICY IF EXISTS "Allow public read protected_tokens" ON protected_tokens;
DROP POLICY IF EXISTS "Allow public insert token_requests" ON token_requests;
DROP POLICY IF EXISTS "Allow authenticated full access token_requests" ON token_requests;
DROP POLICY IF EXISTS "Allow authenticated full access protected_tokens" ON protected_tokens;

-- Разрешаем ВСЕ операции для token_requests (заявки)
CREATE POLICY "Allow all token_requests" ON token_requests
  FOR ALL USING (true) WITH CHECK (true);

-- Разрешаем ВСЕ операции для protected_tokens
CREATE POLICY "Allow all protected_tokens" ON protected_tokens
  FOR ALL USING (true) WITH CHECK (true);

