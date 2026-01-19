import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import TypographyReveal from '@/components/sections/TypographyReveal';
import Features from '@/components/sections/Features';
import Products from '@/components/sections/Products';

import Download from '@/components/sections/Download';
import News from '@/components/sections/News';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import Pricing from '@/components/sections/Pricing';
import Newsletter from '@/components/sections/Newsletter';
import BottomCTA from '@/components/sections/BottomCTA';
import { supabase } from '@/lib/supabase';
import { getLogger } from '@/lib/logger';

// Enable generic ISR for the homepage as well
export const revalidate = 60;

const logger = getLogger('HomePage');

export const metadata = {
  title: 'Clasely - Clipiee: Local AI Video Clipper (No Subscription)',
  description: 'Download Clipiee, the #1 local AI video clipper. An Opus Clip alternative that runs offline on your Mac/PC. One-time payment, no monthly fees.',
};

export default async function Home() {
  logger.info('Rendering Home Page');

  const [
    { data: newsItems, error: newsError },
    { data: products, error: productsError },
    { data: pricingPlans, error: pricingError },
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

  if (pricingError) {
    logger.error({ err: pricingError }, 'Failed to fetch pricing for homepage');
  } else {
    logger.info({ count: pricingPlans?.length || 0 }, 'Fetched pricing for homepage');
  }

  return (
    <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
      <Navbar />
      <Hero />
      <TypographyReveal />
      <Features />
      <Products items={products || []} />
      <Pricing items={pricingPlans || []} />

      <Download />
      <News items={newsItems || []} />
      <FAQ />
      <Newsletter />
      <BottomCTA />
      <Footer />
    </main>
  );
}
