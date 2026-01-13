"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface PricingPlan {
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
}

interface PricingProps {
    plans?: PricingPlan[];
}

export default function Pricing({ plans = [] }: PricingProps) {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="container px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight mb-4"
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Stop paying monthly subscriptions for basic tools.
                    </motion.p>
                </div>

                <div className={`grid gap-8 max-w-7xl mx-auto ${plans.length === 1 ? 'place-items-center' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                    {plans.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-border w-full">
                            No pricing plans active at the moment.
                        </div>
                    ) : (
                        plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                className={plans.length === 1 ? "w-full max-w-md" : "w-full"}
                            >
                                <Card className={`relative overflow-hidden h-full flex flex-col ${plan.popular ? 'border-primary/50 shadow-2xl bg-gradient-to-b from-background to-muted/20' : 'bg-card border-border/50'}`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <Badge className="bg-primary text-primary-foreground pointer-events-none">
                                                <Star className="w-3 h-3 mr-1 fill-current" /> Popular
                                            </Badge>
                                        </div>
                                    )}
                                    {plan.popular && (
                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                                    )}

                                    <CardHeader className="text-center pt-10">
                                        <CardTitle className="text-xl text-muted-foreground">{plan.title}</CardTitle>
                                        <div className="mt-4 flex items-baseline justify-center gap-1">
                                            <span className="text-sm font-semibold text-muted-foreground self-start mt-2">{plan.currency}</span>
                                            <span className="text-5xl font-bold">{plan.price}</span>
                                            <span className="text-muted-foreground text-sm">{plan.frequency}</span>
                                        </div>
                                        <CardDescription className="mt-2 text-base">{plan.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="mt-4 flex-1">
                                        <ul className="space-y-4">
                                            {(plan.features || []).map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                                    className="flex items-start gap-3 text-left"
                                                >
                                                    <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                        <Check className="h-3 w-3" />
                                                    </div>
                                                    <span className="text-sm">{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </CardContent>

                                    <CardFooter className="pb-8 pt-6">
                                        <Link href={plan.button_link || "#"} className="w-full">
                                            <Button
                                                className="w-full h-12 text-lg font-mono"
                                                size="lg"
                                                variant={plan.popular ? "default" : "outline"}
                                            >
                                                {plan.button_text}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="text-center text-xs text-muted-foreground mt-12"
                >
                    30-day money-back guarantee. No questions asked.
                </motion.p>
            </div>
        </section>
    );
}
