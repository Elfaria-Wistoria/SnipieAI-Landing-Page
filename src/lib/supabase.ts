import { createBrowserClient } from '@supabase/ssr';
import { createClient as createClientJS } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key are required. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

// Universal client that uses SSR cookies in browser, plain JS client in other contexts if needed
export const supabase = typeof window !== 'undefined'
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : createClientJS(supabaseUrl, supabaseKey);
