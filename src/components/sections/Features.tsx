"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Infinity, Layers, Lock, Zap, Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Lifetime Access",
        description: "Stop paying monthly subscriptions. Pay once for Clipiee and use it forever. Save $100s/year vs competitors.",
        icon: Infinity
    },
    {
        title: "Creator First Ecosystem",
        description: "A suite of interconnected tools built specifically to solve creator workflows.",
        icon: Layers
    },
    {
        title: "Privacy Focused",
        description: "Runs 100% locally on your device. No cloud uploads. Your content never leaves your laptop.",
        icon: Lock
    },
    {
        title: "Rapid Innovation",
        description: "We ship fast. Get access to the latest AI models and features as they release.",
        icon: Zap
    },
    {
        title: "Community Driven",
        description: "Built by creators, for creators. Your feedback directly shapes our roadmap.",
        icon: Users
    },
    {
        title: "Battle Tested",
        description: "Powering thousands of hours of content creation for creators worldwide.",
        icon: ShieldCheck
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
        <section id="features" className="py-20">
            <div className="container px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-light tracking-tight mb-4"
                    >
                        What is Clipiee?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        We are building the antidote to subscription fatigue.
                        High-quality AI tools with a simple promise: <span className="text-primary font-medium">One payment. Lifetime access.</span>
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
