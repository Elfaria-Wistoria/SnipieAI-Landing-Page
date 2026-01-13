"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { revalidateNews } from "@/app/actions/news";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const logger = getLogger("NewsForm");

interface NewsFormProps {
    initialData?: {
        id?: string;
        title: string;
        content: string;
        category: string;
        image: string | null;
    };
    mode: "create" | "edit";
}

export default function NewsForm({ initialData, mode }: NewsFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(initialData?.category || "Company");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialData?.image || null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleImageUpload = async (file: File) => {
        logger.info("Starting image upload");
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('news-images')
            .upload(fileName, file);

        if (uploadError) {
            logger.error({ err: uploadError }, "Image upload failed");
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('news-images')
            .getPublicUrl(fileName);

        logger.info({ publicUrl }, "Image uploaded successfully");
        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            let imageUrl = currentImageUrl;
            if (imageFile) {
                imageUrl = await handleImageUpload(imageFile);
            }

            if (mode === "create") {
                const { error: insertError } = await supabase
                    .from('news')
                    .insert([{
                        title,
                        content,
                        category,
                        date: new Date().toISOString().split('T')[0],
                        image: imageUrl,
                    }]);
                if (insertError) throw insertError;
            } else {
                if (!initialData?.id) throw new Error("Missing ID for update");
                const { error: updateError } = await supabase
                    .from('news')
                    .update({
                        title,
                        content,
                        category,
                        image: imageUrl,
                    })
                    .eq('id', initialData.id);
                if (updateError) throw updateError;
            }

            await revalidateNews();

            logger.info({ title, category, mode }, `News item ${mode}d successfully`);
            alert(`News ${mode === 'create' ? 'published' : 'updated'} successfully!`);

            if (mode === 'create') {
                router.push('/news');
            } else {
                router.push('/admin/news');
            }
            // For edit mode, we might want to stay or go back to list. 
            // Going to /admin/news (dashboard) seems appropriate.

        } catch (error) {
            logger.error({ err: error }, `Failed to ${mode} news`);
            console.error('Error:', error);
            alert(`Failed to ${mode} news`);
        } finally {
            setStatus("idle");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm mb-2">Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-background/50 text-base"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm mb-2">Category</label>
                    <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="bg-background/50"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Featured Image</label>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="bg-background/50 cursor-pointer file:cursor-pointer file:text-foreground file:bg-secondary file:border-0 file:rounded-sm file:px-2 file:mr-4 file:text-xs"
                            />
                            {imageFile && <ImageIcon className="w-5 h-5 text-green-500" />}
                        </div>
                        {currentImageUrl && !imageFile && (
                            <div className="relative w-full h-32 rounded-md overflow-hidden border border-border/50">
                                <Image
                                    src={currentImageUrl}
                                    alt="Current"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white opacity-0 hover:opacity-100 transition-opacity">
                                    Current Image
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm mb-2">Content / Excerpt</label>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="min-h-[150px] bg-background/50 text-base"
                />
            </div>

            <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? (mode === "create" ? "Publishing..." : "Updating...") : (mode === "create" ? "Publish News" : "Update News")}
            </Button>
        </form>
    );
}
