"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { revalidateProducts } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Video, Loader2 } from "lucide-react";
import Image from "next/image";

const logger = getLogger("ProductForm");

interface ProductFormProps {
    initialData?: {
        id?: string;
        title: string;
        description: string;
        link: string;
        color_from: string;
        color_to: string;
        image_url: string | null;
        video_url: string | null;
    };
    mode: "create" | "edit";
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [link, setLink] = useState(initialData?.link || "");
    const [colorFrom, setColorFrom] = useState(initialData?.color_from || "from-blue-500");
    const [colorTo, setColorTo] = useState(initialData?.color_to || "to-cyan-500");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialData?.image_url || null);

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(initialData?.video_url || null);

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleFileUpload = async (file: File, path: 'images' | 'videos') => {
        logger.info(`Starting ${path} upload`);
        const fileExt = file.name.split('.').pop();
        const fileName = `${path}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('product-media')
            .upload(fileName, file);

        if (uploadError) {
            logger.error({ err: uploadError }, `${path} upload failed`);
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-media')
            .getPublicUrl(fileName);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            let imageUrl = currentImageUrl;
            if (imageFile) {
                imageUrl = await handleFileUpload(imageFile, 'images');
            }

            let videoUrl = currentVideoUrl;
            if (videoFile) {
                videoUrl = await handleFileUpload(videoFile, 'videos');
            }

            const productData = {
                title,
                description,
                link,
                color_from: colorFrom,
                color_to: colorTo,
                image_url: imageUrl,
                video_url: videoUrl,
            };

            if (mode === "create") {
                const { error: insertError } = await supabase
                    .from('products')
                    .insert([productData]);
                if (insertError) throw insertError;
            } else {
                if (!initialData?.id) throw new Error("Missing ID for update");
                const { error: updateError } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', initialData.id);
                if (updateError) throw updateError;
            }

            await revalidateProducts();

            logger.info({ title, mode }, `Product ${mode}d successfully`);

            if (mode === 'create') {
                router.push('/admin/products');
            } else {
                router.refresh();
                router.push('/admin/products');
            }

        } catch (error) {
            logger.error({ err: error }, `Failed to ${mode} product`);
            alert(`Failed to ${mode} product`);
        } finally {
            setStatus("idle");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Main Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Product Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. Clipiee"
                            className="bg-background/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Product URL</label>
                        <Input
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://clipiee.com"
                            className="bg-background/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Color From (Tailwind)</label>
                            <Input
                                value={colorFrom}
                                onChange={(e) => setColorFrom(e.target.value)}
                                placeholder="from-blue-500"
                                className="bg-background/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Color To (Tailwind)</label>
                            <Input
                                value={colorTo}
                                onChange={(e) => setColorTo(e.target.value)}
                                placeholder="to-cyan-500"
                                className="bg-background/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Product description..."
                            className="min-h-[150px] bg-background/50"
                        />
                    </div>
                </div>

                {/* Media Uploads */}
                <div className="space-y-8">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Cover Image</label>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    className="cursor-pointer file:cursor-pointer file:text-foreground file:bg-secondary file:border-0 file:rounded-sm file:px-2 file:mr-4 file:text-xs"
                                />
                                {imageFile && <ImageIcon className="w-5 h-5 text-green-500" />}
                            </div>
                            {(currentImageUrl || imageFile) && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                                    {imageFile ? (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            New File Selected
                                        </div>
                                    ) : (
                                        <Image
                                            src={currentImageUrl!}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Video Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Demo Video</label>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                    className="cursor-pointer file:cursor-pointer file:text-foreground file:bg-secondary file:border-0 file:rounded-sm file:px-2 file:mr-4 file:text-xs"
                                />
                                {videoFile && <Video className="w-5 h-5 text-green-500" />}
                            </div>
                            {(currentVideoUrl || videoFile) && (
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/50 bg-black">
                                    {videoFile ? (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            New Video Selected
                                        </div>
                                    ) : (
                                        <video
                                            src={currentVideoUrl!}
                                            controls
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={status === "loading"} className="w-full md:w-auto min-w-[200px]">
                {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "create" ? "Create Product" : "Save Changes"}
            </Button>
        </form>
    );
}
