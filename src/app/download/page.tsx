import Download from '@/components/sections/Download';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

export default function DownloadPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <Download />
            </div>
            <Footer />
        </main>
    );
}
