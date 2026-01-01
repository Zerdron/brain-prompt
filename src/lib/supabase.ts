import { createClient } from '@supabase/supabase-js';

// Değişkenleri güvenli bir şekilde al
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Eğer değişkenler boşsa Build aşamasında çökmemesi için kontrol et
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase environment variables are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
