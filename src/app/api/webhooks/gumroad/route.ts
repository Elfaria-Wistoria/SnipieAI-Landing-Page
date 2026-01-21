import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyGumroadSignature } from '@/lib/gumroad';

export async function POST(req: NextRequest) {
    try {
        // Get raw body for signature verification
        const rawBody = await req.text();
        const signature = req.headers.get('x-gumroad-signature');

        if (!signature) {
            return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
        }

        // Verify Signature
        const secretKey = process.env.GUMROAD_SECRET || '';
        const isValid = verifyGumroadSignature(rawBody, signature, secretKey);

        if (!isValid) {
            console.error('Invalid Gumroad signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        // Parse the body after verification
        const payload = JSON.parse(rawBody);

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

        // Validate required fields
        if (!sale_id || !email) {
            console.error('Missing required fields in Gumroad webhook');
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

        // Insert into Supabase
        const { error } = await supabaseAdmin
            .from('transactions')
            .insert({
                ref_id: sale_id,
                message_id: sale_id, // Use sale_id as message_id for consistency
                customer_name: full_name || email.split('@')[0],
                customer_email: email,
                amount: price || 0,
                status: 'SUCCESS',
                items: items,
                raw_data: payload,
            });

        if (error) {
            console.error('Database insert error:', error);
            // Duplicate key error means we already processed this webhook
            if (error.code === '23505') {
                return NextResponse.json({ message: 'Already processed' }, { status: 200 });
            }
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        console.log(`Successfully processed Gumroad webhook for sale ${sale_id}`);
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (err) {
        console.error('Webhook processing error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
