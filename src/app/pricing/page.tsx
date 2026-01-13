import Pricing from '@/components/sections/Pricing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <Pricing />
            </div>
            <Footer />
        </main>
    );
}
