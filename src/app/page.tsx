import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import TypographyReveal from '@/components/sections/TypographyReveal';
import Features from '@/components/sections/Features';
import Products from '@/components/sections/Products';
import Pricing from '@/components/sections/Pricing';
import Download from '@/components/sections/Download';
import News from '@/components/sections/News';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import Newsletter from '@/components/sections/Newsletter';
import BottomCTA from '@/components/sections/BottomCTA';
import { supabase } from '@/lib/supabase';
import { getLogger } from '@/lib/logger';

// Enable generic ISR for the homepage as well
export const revalidate = 60;

const logger = getLogger('HomePage');

export const metadata = {
  title: 'Clasely - AI Tools for Creators',
  description: 'Discover Clasely\'s ecosystem of lifetime-license AI tools including Clipiee. Professional video creation, streamlined.',
};

export default async function Home() {
  logger.info('Rendering Home Page');

  const [
    { data: newsItems, error: newsError },
    { data: products, error: productsError },
    { data: plans, error: plansError },
  ] = await Promise.all([
    supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('pricing_plans')
      .select('*')
      .order('created_at', { ascending: true }),
  ]);

  if (newsError) {
    logger.error({ err: newsError }, 'Failed to fetch news for homepage');
  } else {
    logger.info({ count: newsItems?.length || 0 }, 'Fetched news for homepage');
  }

  if (productsError) {
    logger.error({ err: productsError }, 'Failed to fetch products for homepage');
  } else {
    logger.info({ count: products?.length || 0 }, 'Fetched products for homepage');
  }

  if (plansError) {
    logger.error({ err: plansError }, 'Failed to fetch pricing plans for homepage');
  } else {
    logger.info({ count: plans?.length || 0 }, 'Fetched pricing plans for homepage');
  }

  return (
    <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
      <Navbar />
      <Hero />
      <TypographyReveal />
      <Features />
      <Products items={products || []} />
      <Pricing plans={plans || []} />
      <Download />
      <News items={newsItems || []} />
      <FAQ />
      <Newsletter />
      <BottomCTA />
      <Footer />
    </main>
  );
}
