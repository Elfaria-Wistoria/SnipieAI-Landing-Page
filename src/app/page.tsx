import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import TechStack from '@/components/sections/TechStack';
import TypographyReveal from '@/components/sections/TypographyReveal';
import Features from '@/components/sections/Features';

import Download from '@/components/sections/Download';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import Newsletter from '@/components/sections/Newsletter';
import BottomCTA from '@/components/sections/BottomCTA';
import { getLogger } from '@/lib/logger';
import { getSetting } from '@/lib/settings';

// Async Server Components
import StatsSection from '@/components/sections/server/StatsSection';
import NewsSection from '@/components/sections/server/NewsSection';
import PricingSection from '@/components/sections/server/PricingSection';

// Enable generic ISR for the homepage as well
export const revalidate = 60;

const logger = getLogger('HomePage');

export const metadata = {
  title: 'Clipiee - Clipiee: Local AI Video Clipper (No Subscription)',
  description: 'Download Clipiee, the #1 local AI video clipper. An Opus Clip alternative that runs offline on your Mac/PC. One-time payment, no monthly fees.',
};

export default async function Home() {
  logger.info('Rendering Home Page (Streaming Mode)');


  const winUrl = await getSetting('win_download_url');

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* 1. Hero loads instantly (0ms) */}
      <Hero />
      
      <TechStack />

      {/* 2. Stats stream in */}
      <Suspense fallback={<div className="h-32 bg-transparent" />}>
        <StatsSection />
      </Suspense>

      <TypographyReveal />
      <Features />

      {/* 4. Pricing streams in */}
      <Suspense fallback={<div className="h-96" />}>
        <PricingSection />
      </Suspense>

      <Download winUrl={winUrl || undefined} />

      {/* 5. News streams in */}
      <Suspense fallback={<div className="h-64" />}>
        <NewsSection />
      </Suspense>

      <FAQ />
      <Newsletter />
      <BottomCTA />
      <Footer />
    </main>
  );
}
