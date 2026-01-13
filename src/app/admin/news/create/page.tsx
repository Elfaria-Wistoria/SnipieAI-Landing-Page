"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";

const logger = getLogger("NewsCreatePage");
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Image as ImageIcon } from "lucide-react";

export default function CreateNewsPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Company");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await handleImageUpload(imageFile);
            }

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

            logger.info({ title, category }, "News item created successfully");
            alert('News published successfully!');
            router.push('/news');
        } catch (error) {
            logger.error({ err: error }, "Failed to publish news");
            console.error('Error:', error);
            alert('Failed to publish news');
        } finally {
            setStatus("idle"); // Assuming setLoading(false) maps to setStatus("idle")
        }
    };

    return (
        <div className="container max-w-2xl py-20 font-mono">
            <h1 className="text-2xl font-bold mb-8">Create News Post</h1>

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
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="bg-background/50 cursor-pointer file:cursor-pointer file:text-foreground file:bg-secondary file:border-0 file:rounded-sm file:px-2 file:mr-4 file:text-xs"
                            />
                            {imageFile && <ImageIcon className="w-5 h-5 text-green-500" />}
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
                    {status === "loading" ? "Publishing..." : "Publish News"}
                </Button>

                {status === "success" && (
                    <p className="text-green-500 animate-pulse">News published successfully!</p>
                )}
                {status === "error" && (
                    <p className="text-red-500">Error publishing news. check console.</p>
                )}
            </form>
        </div>
    );
}
