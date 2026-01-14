"use server";

import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { z } from "zod";
import { Resend } from 'resend';
import { createClient } from "@supabase/supabase-js";

const logger = getLogger('NewsletterActions');

// Initialize Resend with API Key from env (handling missing key gracefully in function)
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const schema = z.object({
    email: z.string().email(),
});

const sendSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    content: z.string().min(1, "Content is required"),
});

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
    const email = formData.get('email');

    logger.info({ email }, 'Attempting newsletter subscription');

    const result = schema.safeParse({ email });

    if (!result.success) {
        logger.warn({ errors: result.error.flatten() }, 'Invalid email provided');
        return { success: false, message: 'Please provide a valid email address.' };
    }

    try {
        const { error } = await supabase
            .from('newsletter_subscribers')
            .insert({ email: result.data.email });

        if (error) {
            if (error.code === '23505') { // Unique violation
                logger.info({ email }, 'Email already subscribed');
                return { success: true, message: 'You are already subscribed!' };
            }
            logger.error({ err: error }, 'Supabase error during subscription');
            throw error;
        }

        logger.info({ email }, 'Successfully subscribed to newsletter');
        return { success: true, message: 'Thank you for subscribing!' };
    } catch (error) {
        logger.error({ err: error }, 'Failed to subscribe to newsletter');
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}

export async function sendEmailBlast(prevState: any, formData: FormData) {
    const subject = formData.get('subject');
    const content = formData.get('content');

    logger.info("Attempting to send email blast");

    if (!resend) {
        logger.error("RESEND_API_KEY is missing");
        return { success: false, message: "Email service is not configured (Missing API Key)." };
    }

    // Check for Service Role Key for DB access
    if (!serviceRoleKey && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        logger.warn("SUPABASE_SERVICE_ROLE_KEY is missing. RLS might block subscriber fetching.");
        // We might fall through and try anyway, but it often returns 0 rows due to RLS.
        // Let's explicitly warn user if they receive 0 rows.
    }

    // Create admin client if key exists, otherwise use standard client
    const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
        ? createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )
        : supabase;

    const result = sendSchema.safeParse({ subject, content });

    if (!result.success) {
        return { success: false, message: "Subject and Content are required." };
    }

    try {
        // 1. Fetch all subscribers
        const { data: subscribers, error } = await supabaseAdmin
            .from('newsletter_subscribers')
            .select('email');

        if (error) {
            logger.error({ err: error }, "Failed to fetch subscribers via Supabase");
            throw new Error("Failed to fetch subscribers");
        }

        if (!subscribers || subscribers.length === 0) {
            if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
                return { success: false, message: "No subscribers found. (Hint: Add SUPABASE_SERVICE_ROLE_KEY to .env.local to bypass RLS)" };
            }
            return { success: false, message: "No subscribers found to send to." };
        }

        // 2. Send emails
        const emails = subscribers.map(sub => sub.email);

        const emailBatches = [];
        const BATCH_SIZE = 100;

        for (let i = 0; i < emails.length; i += BATCH_SIZE) {
            const batch = emails.slice(i, i + BATCH_SIZE).map(to => ({
                from: 'Clasely <onboarding@resend.dev>', // Default testing domain
                to: [to],
                subject: result.data.subject,
                html: `<p>${result.data.content.replace(/\n/g, '<br>')}</p>`,
            }));
            emailBatches.push(batch);
        }

        logger.info({ count: emails.length, batches: emailBatches.length }, "Sending emails...");

        for (const batch of emailBatches) {
            const { error: batchError } = await resend.batch.send(batch);
            if (batchError) {
                logger.error({ err: batchError }, "Failed to send a batch");
                return { success: false, message: `Failed to send email: ${batchError.message}` };
            }
        }

        return { success: true, message: `Email sent to ${emails.length} subscribers!` };

    } catch (error) {
        logger.error({ err: error }, "Failed to execute email blast");
        return { success: false, message: "Failed to send emails. Check logs." };
    }
}
