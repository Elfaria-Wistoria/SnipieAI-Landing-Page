import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyLynkSignature } from '@/lib/lynk';

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.json();
        const signature = req.headers.get('X-Lynk-Signature');

        if (!signature) {
            return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
        }

        const { data, event } = rawBody;

        // Only process payment.received events
        if (event !== 'payment.received') {
            return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
        }

        const {
            message_id,
            message_data: {
                refId,
                totals: { grandTotal },
                customer,
                items,
            },
        } = data;

        // Verify Signature
        const secretKey = process.env.LYNK_SECRET_KEY || '';

        console.log('[Lynk Webhook] Received:', { 
            refId, 
            grandTotal, 
            message_id, 
            signature,
            secretKeyPartial: secretKey.substring(0, 4) + '...'
        });

        // Convert grandTotal to string for signature verification if strictly required, 
        // but JS coercion usually handles `amount + ...` if amount is number.
        // However, verifyLynkSignature expects string for amount.
        const isValid = verifyLynkSignature(
            refId,
            String(grandTotal),
            message_id,
            signature,
            secretKey
        );
        
        console.log('[Lynk Webhook] Verification Result:', isValid);

        if (!isValid) {
            console.error('[Lynk Webhook] Invalid Lynk signature. Expected vs Received mismatch potentially.');
            // Return 200 to acknowledge receipt but verify failure internally? 
            // Usually webhooks expect 400/401 for bad sigs to trigger retry, 
            // OR 200 to stop retries if we know it's garbage. 
            // Let's return 401 to be safe securely.
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        // Insert into Supabase
        const { error } = await supabaseAdmin
            .from('transactions')
            .insert({
                ref_id: refId,
                message_id: message_id,
                customer_name: customer.name,
                customer_email: customer.email,
                amount: grandTotal,
                status: 'SUCCESS',
                items: items,
                raw_data: rawBody,
            });

        if (error) {
            console.error('Database insert error:', error);
            // Duplicate key error means we already processed this. Return 200.
            if (error.code === '23505') {
                return NextResponse.json({ message: 'Already processed' }, { status: 200 });
            }
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (err) {
        console.error('Webhook processing error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
