import { createClient } from '@supabase/supabase-js';
import { getLogger } from './logger';

const logger = getLogger('SupabaseClient');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    logger.error('Missing Supabase environment variables. Check your .env.local file or Vercel project settings.');
    throw new Error('Supabase URL and Anon Key are required. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

logger.info('Initializing Supabase client');

export const supabase = createClient(supabaseUrl, supabaseKey);
