"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { useRouter } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

const logger = getLogger("NewsEditPage");

export default function EditNewsPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const [newsItem, setNewsItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Protect Route & Fetch Data
    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin/login");
                return;
            }

            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                logger.error({ err: error }, "Failed to fetch news for editing");
                router.push('/admin/news');
                return;
            }

            setNewsItem(data);
            setLoading(false);
        };
        init();
    }, [id, router]);

    if (loading) return <div className="container py-20 text-center font-mono">Loading editor...</div>;

    return (
        <div className="container max-w-2xl py-20 font-mono">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Edit News Post</h1>
                <p className="text-sm text-muted-foreground">ID: {id.slice(0, 8)}...</p>
            </div>
            {newsItem && <NewsForm mode="edit" initialData={newsItem} />}
        </div>
    );
}
