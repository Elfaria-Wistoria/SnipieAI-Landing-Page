'use server'

import { revalidatePath } from 'next/cache';
import { getLogger } from '@/lib/logger';

const logger = getLogger('PricingActions');

export async function revalidatePricing() {
    logger.info('Revalidating pricing cache');
    try {
        revalidatePath('/', 'page');
        revalidatePath('/admin/pricing', 'page');
        return { success: true };
    } catch (error) {
        logger.error({ err: error }, 'Failed to revalidate pricing paths');
        return { success: false, error: 'Failed to revalidate paths' };
    }
}
