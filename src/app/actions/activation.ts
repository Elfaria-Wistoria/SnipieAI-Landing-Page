"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getLicenseDBClient } from "@/lib/license-db";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getLogger } from "@/lib/logger";
import { checkRateLimit } from "@/lib/rate-limit";

const logger = getLogger('ActivationAction');

// Schema: Code is now optional
const redeemSchema = z.object({
    email: z.string().email("Invalid email address"),
    code: z.string().optional(),
});

export async function redeemLicense(prevState: any, formData: FormData) {
    // 0. Security: Rate Check
    const ip = (await headers()).get("x-forwarded-for") || "unknown-ip";
    const limitCheck = await checkRateLimit(ip);

    if (!limitCheck.allowed) {
        logger.warn({ ip }, "Rate limit exceeded");
        return { success: false, message: limitCheck.message || "Too many attempts." };
    }

    const email = formData.get('email') as string;
    const rawCode = formData.get('code') as string;
    // Treat empty string code as undefined
    const code = rawCode?.trim() ? rawCode.trim() : undefined;

    logger.info({ email, hasCode: !!code, ip }, "Attempting license redemption");

    // 1. Validate Input
    const validation = redeemSchema.safeParse({ email, code });
    if (!validation.success) {
        return { success: false, message: validation.error.issues[0].message };
    }

    try {
        // STRATEGY A: Explicit Code Activation (Legacy / Manual)
        if (code) {
            if (code.length < 5) return { success: false, message: "Code is too short" };

            const licenseDB = getLicenseDBClient();
            if (!licenseDB) return { success: false, message: "License system unavailable." };

            // Verify Code
            const { data: codeData, error: fetchError } = await licenseDB
                .from('activation_codes')
                .select('*')
                .eq('code', code)
                .single();

            if (fetchError || !codeData) return { success: false, message: "Invalid activation code." };
            if (codeData.status === 'used') return { success: false, message: "This activation code has already been used." };

            // Mark Used
            const { error: updateError } = await licenseDB
                .from('activation_codes')
                .update({ status: 'used', used_by: email, used_at: new Date().toISOString() })
                .eq('code', code);

            if (updateError) return { success: false, message: "Failed to process activation." };
        }

        // STRATEGY B: Email Verification via Transaction History
        else {
            // Check for valid transaction in Main DB
            const { data: transactions, error: txError } = await supabaseAdmin
                .from('transactions')
                .select('*')
                .eq('customer_email', email);

            if (txError) {
                logger.error({ err: txError }, "Failed to fetch transactions");
                return { success: false, message: "Could not verify purchase history." };
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
                return { success: false, message: "No 'Clipiee' license found in your purchase history. Did you buy an eBook?" };
            }

            logger.info({ email }, "Valid transaction found. Fetching activation code...");

            // --- FETCH / ASSIGN CODE LOGIC ---
            const licenseDB = getLicenseDBClient();
            if (!licenseDB) return { success: false, message: "License system unavailable." };

            let assignedCode = "";

            // 1. Check if user ALREADY has a code assigned
            const { data: existingCode } = await licenseDB
                .from('activation_codes')
                .select('code')
                .eq('used_by', email)
                .single();

            if (existingCode) {
                assignedCode = existingCode.code;
                return {
                    success: true,
                    message: "License recovered! Here is your previously assigned key.",
                    code: assignedCode
                };
            } else {
                // 2. Assign a NEW code
                const { data: newCode, error: assignError } = await licenseDB
                    .from('activation_codes')
                    .select('code')
                    .eq('status', 'unused')
                    .limit(1)
                    .single();

                if (assignError || !newCode) {
                    logger.error("OUT OF STOCK: No unused codes available in License DB.");
                    return { success: false, message: "Activation successful, but we are out of codes! Please contact support." };
                }

                // Mark as used
                const { error: updateError } = await licenseDB
                    .from('activation_codes')
                    .update({
                        status: 'used',
                        used_by: email,
                        used_at: new Date().toISOString()
                    })
                    .eq('code', newCode.code);

                if (updateError) {
                    logger.error({ err: updateError }, "Failed to assign code.");
                    return { success: false, message: "System error assigning code. Please contact support." };
                }

                assignedCode = newCode.code;

                // Success with Code - Activate User
                const { error: userUpdateError } = await supabaseAdmin
                    .from('users')
                    .update({ is_activated: true, updated_at: new Date().toISOString() })
                    .eq('email', email);

                if (userUpdateError) {
                    logger.error({ err: userUpdateError }, "Failed to update user status");
                }

                return {
                    success: true,
                    message: "Activation successful! Here is your new license key.",
                    code: assignedCode
                };
            }
        }

        // ---------------------------------------------------------
        // Strategy A Completion (Common Step if fell through)
        // ---------------------------------------------------------

        const { error: userUpdateError } = await supabaseAdmin
            .from('users')
            .update({ is_activated: true, updated_at: new Date().toISOString() })
            .eq('email', email);

        if (userUpdateError) {
            logger.error({ err: userUpdateError }, "Failed to update user status");
            return { success: false, message: "Purchase verified, but account update failed. Please contact support." };
        }

        return { success: true, message: "Activation successful! Your account is now upgraded." };

    } catch (error) {
        logger.error({ err: error }, "Unexpected error during redemption");
        return { success: false, message: "An unexpected error occurred." };
    }
}
