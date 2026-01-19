"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getLogger } from "@/lib/logger";
import { checkRateLimit } from "@/lib/rate-limit";

const logger = getLogger('UpdateVerification');

const verifySchema = z.object({
    email: z.string().email("Invalid email address"),
});

export async function verifyDownloadAccess(prevState: any, formData: FormData) {
    const ip = (await headers()).get("x-forwarded-for") || "unknown-ip";

    // Rate Limit Check
    const limitCheck = await checkRateLimit(ip);
    if (!limitCheck.allowed) {
        logger.warn({ ip }, "Rate limit exceeded during update check");
        return { success: false, message: limitCheck.message || "Too many attempts. Please try again later." };
    }

    const email = formData.get('email') as string;

    // Validation
    const validation = verifySchema.safeParse({ email });
    if (!validation.success) {
        return { success: false, message: validation.error.issues[0].message };
    }

    try {
        // Check for valid transaction in Main DB
        const { data: transactions, error: txError } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('customer_email', email);

        if (txError) {
            logger.error({ err: txError, email }, "Failed to fetch transactions");
            return { success: false, message: "Could not verify purchase history. Please try again." };
        }

        if (!transactions || transactions.length === 0) {
            return { success: false, message: "No purchase found for this email." };
        }

        // FILTER: Check if they bought the App (Title contains "Clipiee")
        const hasValidLicense = transactions.some((tx: any) => {
            if (!tx.items || !Array.isArray(tx.items)) return false;
            return tx.items.some((item: any) =>
                item.title && item.title.toLowerCase().includes("clipiee")
            );
        });

        if (!hasValidLicense) {
            return { success: false, message: "No 'Clipiee' license found in your purchase history." };
        }

        logger.info({ email }, "Update access verified");
        return { success: true, message: "Verification successful!" };

    } catch (error) {
        logger.error({ err: error }, "Unexpected error during update verification");
        return { success: false, message: "An unexpected error occurred." };
    }
}
