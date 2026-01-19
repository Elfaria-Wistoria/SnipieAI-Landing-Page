"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, Terminal } from "lucide-react";
import Link from "next/link";
import HeroScene from "@/components/3d/HeroScene";

export default function Hero() {
    return (
        <section className="relative pt-32 lg:pt-20 pb-20 overflow-hidden min-h-screen flex items-center z-0">

            <div className="container px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black dark:border-white bg-primary/5 text-black dark:text-white text-xs font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v1.0.0
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Clasely. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                            {"Let It Free.".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.1,
                                        delay: index * 0.1,
                                        ease: "easeIn"
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                        We sell super apps, not subscriptions.
                        <b>Clipiee</b> is the #1 local alternative to Opus Clip. Runs 100% offline on your device.<br className="hidden sm:block" />
                        <span className="text-black dark:text-white font-medium">#F*ckSubscriptions</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto">
                        <Link href="/products" className="w-full sm:w-auto">
                            <Button size="lg" className="h-12 px-8 font-mono group w-full sm:w-auto">
                                Explore Products
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">Pay once, use forever.</p>
                    </div>
                </motion.div>

                {/* Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mx-auto w-full h-[300px] sm:h-[400px] lg:h-[600px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-2xl -z-10 rounded-full opacity-50" />
                    <HeroScene />
                </motion.div>
            </div>
        </section>
    );
}
