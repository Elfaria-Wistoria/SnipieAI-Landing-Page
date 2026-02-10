"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { deleteNews } from "@/app/actions/news";

const logger = getLogger("AdminNewsDashboard");

interface NewsItem {
    id: string;
    title: string;
    category: string;
    date: string;
    created_at: string;
}

export default function AdminNewsDashboard() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
        fetchNews();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/admin/login");
        }
    };

    const fetchNews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('news')
            .select('id, title, category, date, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            logger.error({ err: error }, "Failed to fetch news");
        } else {
            setNews(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this news item?")) return;

        try {
            // Delete from DB (client-side for RLS)
            const { error } = await supabase.from('news').delete().eq('id', id);
            if (error) throw error;

            // Revalidate cache
            await deleteNews(id);

            logger.info({ id }, "News item deleted");
            // Refresh list
            fetchNews();
        } catch (error) {
            logger.error({ err: error }, "Failed to delete news");
            alert("Failed to delete news item");
        }
    };

    return (
        <div className="container py-20">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">News Dashboard</h1>
                <Link href="/admin/news/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create News
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading news...</div>
            ) : (
                <div className="rounded-md border bg-background/50 backdrop-blur">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {news.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No news items found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                news.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/news/edit/${item.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
