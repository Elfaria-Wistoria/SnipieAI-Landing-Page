"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { revalidateChangelog } from "@/app/actions/changelog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const logger = getLogger("ChangelogForm");

interface ChangelogFormProps {
    initialData?: {
        id?: string;
        title: string;
        description: string;
        version: string | null;
        date: string;
        mac_download_url?: string | null;
        windows_download_url?: string | null;
    };
    mode: "create" | "edit";
}

export default function ChangelogForm({ initialData, mode }: ChangelogFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [version, setVersion] = useState(initialData?.version || "");
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [macDownloadUrl, setMacDownloadUrl] = useState(initialData?.mac_download_url || "");
    const [windowsDownloadUrl, setWindowsDownloadUrl] = useState(initialData?.windows_download_url || "");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            if (mode === "create") {
                const { error: insertError } = await supabase
                    .from('changelogs')
                    .insert([{
                        title,
                        description,
                        version: version || null,
                        date,
                        mac_download_url: macDownloadUrl || null,
                        windows_download_url: windowsDownloadUrl || null,
                    }]);
                if (insertError) throw insertError;
            } else {
                if (!initialData?.id) throw new Error("Missing ID for update");
                const { error: updateError } = await supabase
                    .from('changelogs')
                    .update({
                        title,
                        description,
                        version: version || null,
                        date,
                        mac_download_url: macDownloadUrl || null,
                        windows_download_url: windowsDownloadUrl || null,
                    })
                    .eq('id', initialData.id);
                if (updateError) throw updateError;
            }

            await revalidateChangelog();

            logger.info({ title, version, mode }, `Changelog entry ${mode}d successfully`);
            alert(`Changelog ${mode === 'create' ? 'published' : 'updated'} successfully!`);

            router.push('/admin/changelog');

        } catch (error) {
            logger.error({ err: error }, `Failed to ${mode} changelog`);
            console.error('Error:', error);
            alert(`Failed to ${mode} changelog`);
        } finally {
            setStatus("idle");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm mb-2">Title</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-background/50"
                        placeholder="e.g. Major Update"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Version</label>
                    <Input
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="bg-background/50"
                        placeholder="e.g. v2.0.0"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm mb-2">Mac Download URL</label>
                    <Input
                        value={macDownloadUrl}
                        onChange={(e) => setMacDownloadUrl(e.target.value)}
                        className="bg-background/50"
                        placeholder="https://example.com/download/mac"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Windows Download URL</label>
                    <Input
                        value={windowsDownloadUrl}
                        onChange={(e) => setWindowsDownloadUrl(e.target.value)}
                        className="bg-background/50"
                        placeholder="https://example.com/download/windows"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm mb-2">Date</label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="bg-background/50 w-full md:w-auto"
                />
            </div>

            <div>
                <label className="block text-sm mb-2">Description</label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[150px] bg-background/50 font-mono text-sm"
                    placeholder="Describe the changes..."
                />
            </div>

            <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? (mode === "create" ? "Publishing..." : "Updating...") : (mode === "create" ? "Publish Entry" : "Update Entry")}
            </Button>
        </form>
    );
}
