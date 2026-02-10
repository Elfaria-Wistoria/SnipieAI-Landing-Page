"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type PricingPlan = {
    id: string;
    title: string;
    price: string;
    currency: string;
    frequency: string;
    description: string;
    features: string[];
    button_text: string;
    button_link: string | null;
    popular: boolean;
};

interface PricingProps {
    items: PricingPlan[];
}

export default function Pricing({ items }: PricingProps) {
    // If no items, don't render the section (or render a placeholder if desired, but hidden is better)
    if (!items || items.length === 0) return null;

    return (
        <section id="pricing" className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] opacity-20 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] opacity-20" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Choose the perfect plan for your creative journey. All plans include lifetime updates for the version you purchase.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
                    {items.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col p-8 rounded-3xl border transition-all duration-300 group hover:-translate-y-2",
                                plan.popular
                                    ? "bg-background/80 border-primary/50 shadow-2xl shadow-primary/10 backdrop-blur-sm lg:scale-105 z-10"
                                    : "bg-background/40 border-border/50 hover:border-border/80 hover:bg-background/60 backdrop-blur-sm"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                                        <Star className="w-3 h-3 fill-current" /> Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-8 space-y-4">
                                <h3 className="text-xl font-bold tracking-tight">{plan.title}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-light text-muted-foreground">{plan.currency}</span>
                                    <span className="text-5xl font-bold tracking-tighter text-foreground">{plan.price}</span>
                                    <span className="text-sm font-medium text-muted-foreground">{plan.frequency}</span>
                                </div>
                                <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm group-hover:text-foreground transition-colors">
                                        <div className="mt-0.5 rounded-full p-1 bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-border/50">
                                <Link href={plan.button_link || "#"} className="block w-full">
                                    <Button
                                        variant={plan.popular ? "default" : "outline"}
                                        size="lg"
                                        className={cn(
                                            "w-full rounded-2xl transition-all",
                                            plan.popular && "shadow-lg shadow-primary/25 hover:shadow-primary/40 ring-offset-2 ring-primary/20",
                                            !plan.popular && "hover:bg-primary/5 hover:border-primary/50"
                                        )}
                                    >
                                        {plan.popular && <Zap className="w-4 h-4 mr-2 fill-current" />}
                                        {plan.button_text}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
