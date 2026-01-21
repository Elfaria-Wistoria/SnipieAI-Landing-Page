import crypto from 'crypto';

/**
 * Verifies Gumroad webhook signature using HMAC-SHA256
 * @param rawBody - The raw request body as a string
 * @param receivedSignature - The signature from x-gumroad-signature header
 * @param secretKey - Gumroad webhook secret key
 * @returns boolean indicating if signature is valid
 */
export function verifyGumroadSignature(
    rawBody: string,
    receivedSignature: string,
    secretKey: string
): boolean {
    if (!secretKey) {
        console.error('GUMROAD_SECRET is missing');
        return false;
    }

    if (!receivedSignature) {
        console.error('Gumroad signature header is missing');
        return false;
    }

    // Create HMAC-SHA256 hash using the secret key
    const calculatedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(rawBody)
        .digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const receivedBuffer = Buffer.from(receivedSignature);
    const calculatedBuffer = Buffer.from(calculatedSignature);

    if (receivedBuffer.length !== calculatedBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(receivedBuffer, calculatedBuffer);
}
