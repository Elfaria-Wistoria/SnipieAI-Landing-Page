"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import ChangelogForm from "@/components/admin/ChangelogForm";
import { useRouter } from "next/navigation";

export default function EditChangelogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [changelog, setChangelog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchChangelog = async () => {
            const { data, error } = await supabase
                .from('changelogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Failed to fetch changelog:", error);
                router.push('/admin/changelog');
            } else {
                setChangelog(data);
            }
            setLoading(false);
        };

        fetchChangelog();
    }, [id, router]);

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!changelog) {
        return null;
    }

    return (
        <div className="container max-w-2xl py-10">
            <h1 className="text-3xl font-bold mb-8">Edit Changelog Entry</h1>
            <ChangelogForm mode="edit" initialData={changelog} />
        </div>
    );
}
