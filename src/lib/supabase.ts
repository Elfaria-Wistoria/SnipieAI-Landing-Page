import { createClient } from '@supabase/supabase-js';
import { getLogger } from './logger';

const logger = getLogger('SupabaseClient');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

logger.info('Initializing Supabase client');

export const supabase = createClient(supabaseUrl, supabaseKey);
