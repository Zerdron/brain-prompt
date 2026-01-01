import { createClient } from '@supabase/supabase-js';

// Vercel'deki değişkenleri al, yoksa geçici (placeholder) bir değer ata
// Bu sayede Build sırasında "URL gerekli" hatası almazsın
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iaoymaonvpaxdfuplfdb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Eğer ikisi de eksikse konsola uyarı bas ama sistemi çökertme
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn("⚠️ Dikkat: NEXT_PUBLIC_SUPABASE_URL Vercel panelinde bulunamadı!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
