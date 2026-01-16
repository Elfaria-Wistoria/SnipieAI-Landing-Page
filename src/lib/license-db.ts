import { createClient } from '@supabase/supabase-js';

// Configuration for the License Database (Secondary)
// This database holds the 'activation_codes' table.
const LICENSE_SUPABASE_URL = process.env.LICENSE_SUPABASE_URL || 'https://idgkubpvypvziuvufmti.supabase.co';
const LICENSE_SUPABASE_SERVICE_ROLE_KEY = process.env.LICENSE_SUPABASE_SERVICE_ROLE_KEY;

export const getLicenseDBClient = () => {
    if (!LICENSE_SUPABASE_SERVICE_ROLE_KEY) {
        console.error("LICENSE_SUPABASE_SERVICE_ROLE_KEY is missing. Cannot connect to License DB.");
        return null;
    }

    return createClient(LICENSE_SUPABASE_URL, LICENSE_SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};
