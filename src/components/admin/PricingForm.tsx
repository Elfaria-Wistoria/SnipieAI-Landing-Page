"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { revalidatePricing } from "@/app/actions/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const logger = getLogger("PricingForm");

interface PricingFormProps {
    initialData?: {
        id?: string;
        title: string;
        price: string;
        currency: string;
        frequency: string;
        description: string;
        features: string[]; // JSONB is returned as array
        button_text: string;
        button_link: string | null;
        popular: boolean;
    };
    mode: "create" | "edit";
}

export default function PricingForm({ initialData, mode }: PricingFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [price, setPrice] = useState(initialData?.price || "");
    const [currency, setCurrency] = useState(initialData?.currency || "$");
    const [frequency, setFrequency] = useState(initialData?.frequency || "/one-time");
    const [description, setDescription] = useState(initialData?.description || "");
    const [features, setFeatures] = useState<string[]>(initialData?.features || [""]);
    const [buttonText, setButtonText] = useState(initialData?.button_text || "Get Started");
    const [buttonLink, setButtonLink] = useState(initialData?.button_link || "");
    const [popular, setPopular] = useState(initialData?.popular || false);

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addFeature = () => {
        setFeatures([...features, ""]);
    };

    const removeFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // Filter out empty features
            const validFeatures = features.filter(f => f.trim() !== "");

            const planData = {
                title,
                price,
                currency,
                frequency,
                description,
                features: validFeatures,
                button_text: buttonText,
                button_link: buttonLink,
                popular,
            };

            if (mode === "create") {
                const { error: insertError } = await supabase
                    .from('pricing_plans')
                    .insert([planData]);
                if (insertError) throw insertError;
            } else {
                if (!initialData?.id) throw new Error("Missing ID for update");
                const { error: updateError } = await supabase
                    .from('pricing_plans')
                    .update(planData)
                    .eq('id', initialData.id);
                if (updateError) throw updateError;
            }

            await revalidatePricing();

            logger.info({ title, mode }, `Pricing plan ${mode}d successfully`);

            router.push('/admin/pricing');
            router.refresh();

        } catch (error) {
            logger.error({ err: error }, `Failed to ${mode} pricing plan`);
            alert(`Failed to ${mode} pricing plan`);
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
                        <Label className="mb-2 block">Plan Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. Lifetime License"
                            className="bg-background/50"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <Label className="mb-2 block">Currency</Label>
                            <Input
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                placeholder="$"
                                className="bg-background/50"
                            />
                        </div>
                        <div className="col-span-2">
                            <Label className="mb-2 block">Price</Label>
                            <Input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                placeholder="49"
                                className="bg-background/50"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2 block">Frequency / Billing Period</Label>
                        <Input
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            placeholder="e.g. /one-time, /month"
                            className="bg-background/50"
                        />
                    </div>

                    <div>
                        <Label className="mb-2 block">Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Brief description of the plan..."
                            className="bg-background/50"
                        />
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-lg bg-background/50">
                        <Switch id="popular" checked={popular} onCheckedChange={setPopular} />
                        <Label htmlFor="popular">Mark as Popular / Featured</Label>
                    </div>
                </div>

                {/* Features & Button */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Label>Features List</Label>
                            <Button type="button" variant="ghost" size="sm" onClick={addFeature}>
                                <Plus className="w-4 h-4 mr-1" /> Add Feature
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="h-10 w-10 flex items-center justify-center bg-muted/50 rounded-md shrink-0">
                                        <Check className="w-4 h-4 text-green-500" />
                                    </div>
                                    <Input
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        placeholder={`Feature ${index + 1}`}
                                        className="bg-background/50"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFeature(index)}
                                        className="text-muted-foreground hover:text-destructive shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border/50">
                        <Label className="mb-2 block">CTA Button Text</Label>
                        <Input
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            required
                            placeholder="Get Started"
                            className="bg-background/50 mb-4"
                        />
                        <Label className="mb-2 block">CTA Button Link</Label>
                        <Input
                            value={buttonLink}
                            onChange={(e) => setButtonLink(e.target.value)}
                            placeholder="https://..."
                            className="bg-background/50"
                        />
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={status === "loading"} className="w-full md:w-auto min-w-[200px]">
                {status === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {mode === "create" ? "Create Plan" : "Save Changes"}
            </Button>
        </form>
    );
}
