"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Type, Anchor, Zap, Lock, Wand2 } from "lucide-react";
import { motion } from "framer-motion";

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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Features() {
    return (
        <section id="features" className="py-20 bg-muted/50">
            <div className="container px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight mb-4"
                    >
                        Complete Video Pipeline
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Everything you need to turn one long video into a month of content.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, i) => (
                        <motion.div key={i} variants={item}>
                            <Card className="bg-background/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors h-full">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
