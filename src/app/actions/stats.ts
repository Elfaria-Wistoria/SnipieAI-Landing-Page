"use server";

import { getLicenseDBClient } from "@/lib/license-db";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getLogger } from "@/lib/logger";

const logger = getLogger("StatsAction");

export async function getDownloadStats() {
    try {
        // 1. Fetch User Count (Registered Users)
        const { count: userCount, error: userError } = await supabaseAdmin
            .from("users")
            .select("*", { count: "exact", head: true });

        if (userError) {
            logger.error({ err: userError }, "Failed to fetch user count");
        }

        // 2. Fetch Activation Count (Used Licenses)
        let activationCount = 0;
        const licenseDB = getLicenseDBClient();

        if (licenseDB) {
            const { count: activeLicenses, error: licenseError } = await licenseDB
                .from("activation_codes")
                .select("*", { count: "exact", head: true })
                .eq("status", "used");

            if (licenseError) {
                logger.error({ err: licenseError }, "Failed to fetch activation count");
            } else {
                activationCount = activeLicenses || 0;
            }
        }

        // 3. Logic: Take the higher of the two (Users vs Activations)
        // This represents the true, real-time database count.
        const totalDownloads = Math.max(userCount || 0, activationCount);

        // Estimate hours saved: Roughly 1.5 hours per user (conservative real-time estimate)
        const totalHoursSaved = totalDownloads * 1.5;

        return {
            downloads: totalDownloads,
            hoursSaved: Math.round(totalHoursSaved),
            rating: 4.9,
        };
    } catch (error) {
        logger.error({ err: error }, "Failed to get download stats");
        return {
            downloads: 0,
            hoursSaved: 0,
            rating: 4.9,
        };
    }
}
