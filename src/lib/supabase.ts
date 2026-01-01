import { createClient } from '@supabase/supabase-js';

// Vercel panelindeki isimlerle birebir aynı olduğundan emin ol
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Eğer değişkenler eksikse build'i çökertmek yerine uyarı ver
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ HATA: Vercel değişkenleri bulunamadı! İsimleri kontrol et.");
}

// Boş bile olsa build'in devam etmesi için fallback (yedek) sağla
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);