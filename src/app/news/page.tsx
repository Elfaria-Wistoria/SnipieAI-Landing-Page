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
    description: 'Latest news, announcements, and insights from the Clipiee team.',
};

export default async function NewsPage() {
    logger.info('Rendering News Listing Page');

    // Static data or empty array since Admin News is removed
    const newsItems: any[] = [
        // Example static item if needed, otherwise empty
        // {
        //     id: '1',
        //     title: 'SnipieAI Launch',
        //     date: 'October 2025',
        //     category: 'Company',
        //     content: 'We are excited to announce the launch of SnipieAI...',
        //     image: null
        // }
    ];

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-32 container px-4">
                <h1 className="text-4xl font-bold tracking-tight mb-8">News & Updates</h1>
                <News items={newsItems} />
            </div>
            <Footer />
        </main>
    );
}
