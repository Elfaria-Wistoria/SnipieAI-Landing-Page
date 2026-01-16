import { supabaseAdmin } from "@/lib/supabase-admin";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
    const now = new Date();

    try {
        // 1. Get current state
        const { data: record, error } = await supabaseAdmin
            .from('rate_limits')
            .select('*')
            .eq('ip', ip)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            console.error("RateLimit Error:", error);
            // Fail open to prevent blocking legit users on DB error, but log it.
            return { allowed: true };
        }

        if (!record) {
            // First time visitor
            await supabaseAdmin.from('rate_limits').insert({
                ip,
                attempts: 1,
                last_attempt: now.toISOString()
            });
            return { allowed: true };
        }

        // 2. Check if currently blocked
        if (record.blocked_until && new Date(record.blocked_until) > now) {
            const msLeft = new Date(record.blocked_until).getTime() - now.getTime();
            const minutesLeft = Math.ceil(msLeft / 60000);
            return { allowed: false, message: `Too many attempts. Please try again in ${minutesLeft} minutes.` };
        }

        // 3. Logic: Window Reset or Increment
        const lastAttempt = new Date(record.last_attempt);
        const timeSinceLast = now.getTime() - lastAttempt.getTime();
        const shouldReset = timeSinceLast > RATE_LIMIT_WINDOW_MS;

        if (shouldReset) {
            // Reset counter
            await supabaseAdmin.from('rate_limits').update({
                attempts: 1,
                last_attempt: now.toISOString(),
                blocked_until: null
            }).eq('ip', ip);
            return { allowed: true };
        } else {
            // Increment
            const newAttempts = record.attempts + 1;

            if (newAttempts > MAX_ATTEMPTS) {
                // Block User
                const blockedUntil = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS);
                await supabaseAdmin.from('rate_limits').update({
                    attempts: newAttempts,
                    last_attempt: now.toISOString(),
                    blocked_until: blockedUntil.toISOString()
                }).eq('ip', ip);

                return { allowed: false, message: "Too many failed attempts. You are temporarily blocked." };
            } else {
                // Just update count
                await supabaseAdmin.from('rate_limits').update({
                    attempts: newAttempts,
                    last_attempt: now.toISOString()
                }).eq('ip', ip);

                return { allowed: true };
            }
        }
    } catch (err) {
        console.error("RateLimit Unexpected Error:", err);
        return { allowed: true };
    }
}
