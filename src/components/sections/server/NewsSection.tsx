import { supabase } from "@/lib/supabase";
import News, { NewsItem } from "@/components/sections/News";

export default async function NewsSection() {
    const { data: newsItems } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    return <News items={(newsItems as NewsItem[]) || []} />;
}
