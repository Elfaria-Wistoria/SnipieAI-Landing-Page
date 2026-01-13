"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { useRouter } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

const logger = getLogger("NewsCreatePage");

export default function CreateNewsPage() {
    const router = useRouter();

    // Protect Route
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin/login");
            }
        };
        checkUser();
    }, [router]);

    return (
        <div className="container max-w-2xl py-20 font-mono">
            <h1 className="text-2xl font-bold mb-8">Create News Post</h1>
            <NewsForm mode="create" />
        </div>
    );
}
