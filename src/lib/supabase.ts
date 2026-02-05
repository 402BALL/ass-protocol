import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://phsawyidxklhefrhmflx.supabase.co';
const supabaseKey = 'sb_publishable_qQteWv86HFSHmae5XL9HuA_KEIxrDle';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Типы для базы данных
export interface TokenRequest {
  id?: number;
  ca: string;
  name: string;
  ticker: string;
  twitter?: string;
  website?: string;
  telegram?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface ProtectedToken {
  id?: number;
  ca: string;
  name: string;
  ticker: string;
  twitter?: string;
  website?: string;
  telegram?: string;
  market_cap?: number;
  volume_24h?: number;
  fees_to_pool?: number;
  paid_out?: number;
  status: 'active' | 'paused';
  created_at?: string;
}

// Функции для работы с заявками
export async function submitTokenRequest(data: Omit<TokenRequest, 'id' | 'status' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('token_requests')
    .insert([{ ...data, status: 'pending' }])
    .select();
  
  if (error) throw error;
  return result;
}

export async function getTokenRequests() {
  const { data, error } = await supabase
    .from('token_requests')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as TokenRequest[];
}

export async function updateTokenRequest(id: number, updates: Partial<TokenRequest>) {
  const { error } = await supabase
    .from('token_requests')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
}

export async function deleteTokenRequest(id: number) {
  const { error } = await supabase
    .from('token_requests')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Функции для защищённых токенов
export async function getProtectedTokens() {
  const { data, error } = await supabase
    .from('protected_tokens')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as ProtectedToken[];
}

export async function addProtectedToken(data: Omit<ProtectedToken, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('protected_tokens')
    .insert([data])
    .select();
  
  if (error) throw error;
  return result;
}

export async function updateProtectedToken(id: number, updates: Partial<ProtectedToken>) {
  const { error } = await supabase
    .from('protected_tokens')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
}

export async function deleteProtectedToken(id: number) {
  const { error } = await supabase
    .from('protected_tokens')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Получить маркеткап с DexScreener
export async function fetchTokenMarketCap(ca: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${ca}`);
    const data = await response.json();
    
    if (data.pairs && data.pairs.length > 0) {
      return data.pairs[0].fdv || data.pairs[0].marketCap || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching market cap:', error);
    return null;
  }
}

