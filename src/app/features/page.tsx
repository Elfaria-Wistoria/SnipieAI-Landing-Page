import Features from '@/components/sections/Features';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <Features />
            </div>
            <Footer />
        </main>
    );
}
