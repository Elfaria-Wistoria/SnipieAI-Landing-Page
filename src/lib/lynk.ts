import crypto from 'crypto';

export function verifyLynkSignature(
    refId: string,
    amount: string, // grandTotal
    messageId: string,
    receivedSignature: string,
    secretKey: string
): boolean {
    if (!secretKey) {
        console.error('LYNK_SECRET_KEY is missing');
        return false;
    }

    // Signature string construction: amount + ref_id + message_id + secret_key
    // Note: 'amount' here corresponds to 'grandTotal' from the payload. 
    // Ensure the amount is formatted exactly as Lynk sends it (string vs number from JSON). 
    // Based on docs, grandTotal is a number, so we must be careful with string coercion.

    const signatureString = `${amount}${refId}${messageId}${secretKey}`;

    const calculatedSignature = crypto
        .createHash('sha256')
        .update(signatureString)
        .digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const receivedBuffer = Buffer.from(receivedSignature);
    const calculatedBuffer = Buffer.from(calculatedSignature);

    if (receivedBuffer.length !== calculatedBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(receivedBuffer, calculatedBuffer);
}
