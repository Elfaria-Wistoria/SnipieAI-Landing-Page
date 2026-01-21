import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyGumroadSignature } from '@/lib/gumroad';

export async function POST(req: NextRequest) {
    try {
        // Get raw body for signature verification
        const rawBody = await req.text();
        const signature = req.headers.get('x-gumroad-signature');
        const secretKey = process.env.GUMROAD_SECRET || '';

        // Verify signature if both signature and secret are present
        // Note: Gumroad's basic "Ping" feature doesn't provide signatures
        // Only the newer webhook API includes signature verification
        if (signature && secretKey) {
            const isValid = verifyGumroadSignature(rawBody, signature, secretKey);
            if (!isValid) {
                console.error('Invalid Gumroad signature');
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
            }
            console.log('Gumroad signature verified successfully');
        } else if (signature && !secretKey) {
            console.warn('Gumroad signature present but GUMROAD_SECRET not configured');
        } else {
            console.log('Processing Gumroad Ping webhook (no signature verification)');
        }

        // Parse the body after verification
        const payload = JSON.parse(rawBody);

        // Log the entire payload for debugging
        console.log('Gumroad webhook payload:', JSON.stringify(payload, null, 2));

        // Extract data from Gumroad webhook payload
        const {
            sale_id,
            email,
            full_name,
            product_name,
            price,
            product_id,
            quantity = 1,
            timestamp,
        } = payload;

        console.log('Extracted fields:', {
            sale_id,
            email,
            full_name,
            product_name,
            price,
            product_id
        });

        // Validate required fields
        if (!sale_id || !email) {
            console.error('Missing required fields in Gumroad webhook. sale_id:', sale_id, 'email:', email);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Map Gumroad data to transactions table schema
        // Create items array in the same format as Lynk.id
        const items = [
            {
                title: product_name || 'Unknown Product',
                product_id: product_id,
                quantity: quantity,
                price: price,
            },
        ];

        const transactionData = {
            ref_id: sale_id,
            message_id: sale_id, // Use sale_id as message_id for consistency
            customer_name: full_name || email.split('@')[0],
            customer_email: email,
            amount: price || 0,
            status: 'SUCCESS',
            items: items,
            raw_data: payload,
        };

        console.log('Attempting to insert transaction:', JSON.stringify(transactionData, null, 2));

        // Insert into Supabase
        const { error } = await supabaseAdmin
            .from('transactions')
            .insert(transactionData);

        if (error) {
            console.error('Database insert error:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            // Duplicate key error means we already processed this webhook
            if (error.code === '23505') {
                console.log('Transaction already exists for sale_id:', sale_id);
                return NextResponse.json({ message: 'Already processed' }, { status: 200 });
            }
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        console.log(`✅ Successfully processed Gumroad webhook for sale ${sale_id}`);
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (err) {
        console.error('Webhook processing error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
