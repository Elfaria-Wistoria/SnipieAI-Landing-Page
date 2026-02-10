import Products from '@/components/sections/Products';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function ProductsPage() {
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <Products items={products || []} />
            </div>
            <Footer />
        </main>
    );
}
