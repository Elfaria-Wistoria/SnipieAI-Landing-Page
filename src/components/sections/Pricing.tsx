"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
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

                <div className="max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border-primary/20 shadow-2xl bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />

                            <CardHeader className="text-center pt-10">
                                <CardTitle className="text-xl text-muted-foreground">Lifetime License</CardTitle>
                                <div className="mt-4 flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-bold">$49</span>
                                    <span className="text-muted-foreground">/one-time</span>
                                </div>
                                <CardDescription className="mt-2">Use Clipiee forever on one device.</CardDescription>
                            </CardHeader>

                            <CardContent className="mt-4">
                                <ul className="space-y-4">
                                    {[
                                        "Unlimited Video Clips",
                                        "Auto-Subtitles Generator",
                                        "Viral Hook Library",
                                        "1080p & 4K Export",
                                        "Lifetime Updates",
                                        "No Watermark"
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Check className="h-3 w-3" />
                                            </div>
                                            <span className="text-sm">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pb-8">
                                <Button className="w-full h-12 text-lg font-mono" size="lg">
                                    Get Activation Code
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="text-center text-xs text-muted-foreground mt-6"
                    >
                        30-day money-back guarantee. No questions asked.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
