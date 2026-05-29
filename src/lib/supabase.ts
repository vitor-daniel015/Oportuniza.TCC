import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Note: To use Supabase, you need to:
 * 1. Create a project at https://supabase.com
 * 2. Get your project URL and Anon Key
 * 3. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Secrets in AI Studio
 * 4. Add them to .env.example
 */
