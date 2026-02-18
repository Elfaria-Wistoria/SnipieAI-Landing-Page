import Download from '@/components/sections/Download';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { getSetting } from '@/lib/settings';

export const revalidate = 60;

export default async function DownloadPage() {

    const winUrl = await getSetting('win_download_url');

    return (
        <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col transition-colors duration-300">
            <Navbar />
            
            <main className="flex-1 relative">
                 {/* Background Grid Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] dark:invert" 
                    style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px'}} 
                />

                <div className="pt-20 relative z-10">
                    <Download winUrl={winUrl || undefined} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
