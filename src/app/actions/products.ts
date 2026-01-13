'use server'

import { revalidatePath } from 'next/cache';
import { getLogger } from '@/lib/logger';

const logger = getLogger('ProductActions');

export async function revalidateProducts() {
    logger.info('Revalidating product cache');
    try {
        revalidatePath('/', 'page'); // Homepage products section
        revalidatePath('/products', 'page'); // Products page
        revalidatePath('/admin/products', 'page'); // Admin products list
        logger.info('Successfully revalidated product paths');
        return { success: true };
    } catch (error) {
        logger.error({ err: error }, 'Failed to revalidate product paths');
        return { success: false, error: 'Failed to revalidate paths' };
    }
}
