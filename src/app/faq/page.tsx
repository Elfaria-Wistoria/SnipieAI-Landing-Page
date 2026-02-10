import FAQ from '@/components/sections/FAQ';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <FAQ />
            </div>
            <Footer />
        </main>
    );
}
