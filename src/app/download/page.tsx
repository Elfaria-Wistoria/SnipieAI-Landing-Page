import Download from '@/components/sections/Download';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { getSetting } from '@/lib/settings';

export const revalidate = 60;

export default async function DownloadPage() {
    const macUrl = await getSetting('mac_download_url');
    const winUrl = await getSetting('win_download_url');

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <Download macUrl={macUrl || undefined} winUrl={winUrl || undefined} />
            </div>
            <Footer />
        </main>
    );
}
