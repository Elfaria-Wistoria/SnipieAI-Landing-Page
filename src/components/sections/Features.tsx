import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Type, Anchor, Zap, Lock, Wand2 } from "lucide-react";

const features = [
    {
        title: "AI Auto-Clip",
        description: "Our AI analyzes your video to find the most engaging 60-second moments automatically.",
        icon: Sparkles
    },
    {
        title: "Smart Subtitles",
        description: "Generate 99% accurate captions with active highlighting and custom styles.",
        icon: Type
    },
    {
        title: "Viral Hooks",
        description: "Automatically inserts trending hooks at the start of your clips to stop the scroll.",
        icon: Anchor
    },
    {
        title: "Face Crop",
        description: "Auto-detects active speakers and crops vertical video perfectly.",
        icon: Wand2
    },
    {
        title: "Local Processing",
        description: "Your videos are processed securely. We don't train on your content.",
        icon: Lock
    },
    {
        title: "Instant Export",
        description: "Render 10 clips in minutes. Ready for TikTok, Reels, and Shorts.",
        icon: Zap
    }
];

export default function Features() {
    return (
        <section id="features" className="py-20 bg-muted/50">
            <div className="container px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Complete Video Pipeline</h2>
                    <p className="text-muted-foreground">Everything you need to turn one long video into a month of content.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <Card key={i} className="bg-background/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
