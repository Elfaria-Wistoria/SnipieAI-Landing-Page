import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Products from '@/components/sections/Products';
import Pricing from '@/components/sections/Pricing';
import Download from '@/components/sections/Download';
import News from '@/components/sections/News';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import { supabase } from '@/lib/supabase';
import { getLogger } from '@/lib/logger';

// Enable generic ISR for the homepage as well
export const revalidate = 60;

const logger = getLogger('HomePage');

export default async function Home() {
  logger.info('Rendering Home Page');

  const { data: newsItems, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    logger.error({ err: error }, 'Failed to fetch news for homepage');
  } else {
    logger.info({ count: newsItems?.length || 0 }, 'Fetched news for homepage');
  }

  return (
    <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <Pricing />
      <Download />
      <News items={newsItems || []} />
      <FAQ />
      <Footer />
    </main>
  );
}
