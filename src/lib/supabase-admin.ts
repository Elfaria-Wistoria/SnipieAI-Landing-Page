import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder to prevent build errors if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Missing SUPABASE_SERVICE_ROLE_KEY. Admin operations will fail.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
