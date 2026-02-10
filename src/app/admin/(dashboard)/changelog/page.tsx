"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { revalidateChangelog } from "@/app/actions/changelog";

interface ChangelogItem {
    id: string;
    title: string;
    version: string | null;
    date: string;
    created_at: string;
}

export default function AdminChangelogPage() {
    const [changelogs, setChangelogs] = useState<ChangelogItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChangelogs();
    }, []);

    const fetchChangelogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('changelogs')
            .select('id, title, version, date, created_at')
            .order('date', { ascending: false });

        if (error) {
            console.error("Failed to fetch changelogs:", error);
        } else {
            setChangelogs(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this changelog entry?")) return;

        try {
            const { error } = await supabase.from('changelogs').delete().eq('id', id);
            if (error) throw error;

            await revalidateChangelog();
            fetchChangelogs();
        } catch (error) {
            console.error("Failed to delete changelog:", error);
            alert("Failed to delete changelog entry");
        }
    };

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Changelog Management</h1>
                <Link href="/admin/changelog/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Entry
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading changelogs...</div>
            ) : (
                <div className="rounded-md border bg-background/50 backdrop-blur">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Version</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {changelogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No changelog entries found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                changelogs.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.version || "-"}</TableCell>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/changelog/edit/${item.id}`}>
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
