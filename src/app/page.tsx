import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Products from '@/components/sections/Products';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/sections/Footer';
import { getLogger } from '@/lib/logger';

const logger = getLogger('HomePage');

export default function Home() {
  logger.info('Rendering Home Page');

  return (
    <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <Pricing />
      <Footer />
    </main>
  )
}
