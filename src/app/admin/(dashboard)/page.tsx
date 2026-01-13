"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [newsCount, setNewsCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const { count } = await supabase
                .from("news")
                .select("*", { count: "exact", head: true });

            setNewsCount(count);
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/news">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total News
                            </CardTitle>
                            <Newspaper className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {newsCount === null ? "..." : newsCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Articles published
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
