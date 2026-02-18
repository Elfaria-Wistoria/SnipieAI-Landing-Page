import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';

import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import { getLogger } from '@/lib/logger';
import { getSetting } from '@/lib/settings';

// Async Server Components
import PricingSection from '@/components/sections/server/PricingSection';

// Enable generic ISR for the homepage as well
export const revalidate = 60;

const logger = getLogger('HomePage');

export const metadata = {
  title: 'SnipieAI - Local AI Video Clipper (No Subscription)',
  description: 'Download SnipieAI, the #1 local AI video clipper. An Opus Clip alternative that runs offline on your Mac/PC. One-time payment, no monthly fees.',
};

export default async function Home() {
  logger.info('Rendering Home Page (Streaming Mode)');

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      <Hero />

      <Features />

      {/* Pricing streams in */}
      <Suspense fallback={<div className="h-96" />}>
        <PricingSection />
      </Suspense>

      <FAQ />
      <Footer />
    </main>
  );
}
