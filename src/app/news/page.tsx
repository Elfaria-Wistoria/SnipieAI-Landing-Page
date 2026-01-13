import News from '@/components/sections/News';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { supabase } from '@/lib/supabase';
import { getLogger } from '@/lib/logger';

// Enable ISR
export const revalidate = 60; // Revalidate every 60 seconds

const logger = getLogger('NewsPage');

export const metadata = {
    title: 'News & Updates',
    description: 'Latest news, announcements, and insights from the Clasely team.',
};

export default async function NewsPage() {
    logger.info('Rendering News Listing Page');

    const { data: newsItems, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        logger.error({ err: error }, 'Failed to fetch news items');
    } else {
        logger.info({ count: newsItems?.length || 0 }, 'Fetched news items successfully');
    }

    return (
        <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
            <Navbar />
            <div className="pt-32 container px-4">
                <h1 className="text-4xl font-bold tracking-tight mb-8">News & Updates</h1>
                <News items={newsItems || []} />
            </div>
            <Footer />
        </main>
    );
}
