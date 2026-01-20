import { supabase } from "@/lib/supabase";
import Products, { ProductItem } from "@/components/sections/Products";

export default async function ProductsSection() {
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    return <Products items={(products as ProductItem[]) || []} />;
}
