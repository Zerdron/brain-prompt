import { createClient } from '@supabase/supabase-js';

// Vercel'den gelen değerleri alıyoruz
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Build aşamasında çökmemesi için geçerli bir URL formatı kontrolü yapıyoruz
// Eğer URL yoksa veya geçersizse bile build'in devam etmesini sağlar
const isUrlValid = (url: string | undefined): url is string => {
  try {
    return !!url && (url.startsWith('https://') || url.startsWith('http://'));
  } catch {
    return false;
  }
};

// Gerçek bir URL yoksa bile build'in çökmemesi için Supabase'e geçerli formatta bir URL veriyoruz
const finalUrl = isUrlValid(supabaseUrl) ? supabaseUrl : 'https://temp-project.supabase.co';
const finalKey = supabaseAnonKey || 'temp-key';

export const supabase = createClient(finalUrl, finalKey);