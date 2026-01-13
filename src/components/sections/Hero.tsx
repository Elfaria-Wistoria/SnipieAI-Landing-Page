"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, Terminal } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center z-0">
            {/* Animated Falling Liquid Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: ["-20%", "120%"],
                        rotate: [0, 5],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[50%] left-[20%] w-[20vw] h-[80vh] bg-gradient-to-b from-transparent via-purple-950 to-transparent blur-[80px] opacity-30 mix-blend-screen"
                />
                <motion.div
                    animate={{
                        y: ["-40%", "120%"],
                        rotate: [0, -5],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute -top-[50%] right-[30%] w-[25vw] h-[100vh] bg-gradient-to-b from-transparent via-blue-950 to-transparent blur-[100px] opacity-20 mix-blend-screen"
                />
                <motion.div
                    animate={{
                        y: ["-60%", "120%"],
                        opacity: [0, 0.3, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
                    className="absolute -top-[50%] left-[50%] w-[30vw] h-[90vh] bg-gradient-to-b from-transparent via-indigo-950 to-transparent blur-[120px] opacity-20 mix-blend-screen"
                />
            </div>

            <div className="container px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v1.0 Now Available
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Clasely. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
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

                    <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                        We sell super apps with lifetime licenses.
                        Build, create, and ship without limits.<br />
                        <span className="text-white font-medium">#F*ckSubscriptions</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Link href="/products">
                            <Button size="lg" className="h-12 px-8 font-mono group">
                                Explore Products
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground">Pay once, use forever.</p>
                    </div>
                </motion.div>

                {/* Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mx-auto max-w-[500px] aspect-square lg:aspect-[4/3]"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-2xl -z-10 rounded-full" />

                    {/* Mockup Interface */}
                    <div className="w-full h-full bg-card/50 border border-border/50 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl flex flex-col">
                        {/* Window Bar */}
                        <div className="h-10 border-b border-border/50 flex items-center px-4 gap-2 bg-background/50">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            <div className="ml-4 h-5 w-48 bg-muted/50 rounded flex items-center px-2 text-[10px] text-muted-foreground font-mono">
                                clasely_hub
                            </div>
                        </div>

                        {/* Hub Body */}
                        <div className="flex-1 p-6 relative flex flex-col gap-6">
                            {/* App Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Clipiee App Card - Active */}
                                <motion.div
                                    className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex flex-col gap-2 relative overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                                    <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                                        <Scissors className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="z-10">
                                        <div className="text-sm font-bold">Clipiee</div>
                                        <div className="text-[10px] text-primary">Active • Lifetime</div>
                                    </div>
                                </motion.div>

                                {/* Placeholder App - Coming Soon */}
                                <div className="bg-muted/10 border border-muted/10 rounded-lg p-4 flex flex-col gap-2 opacity-50">
                                    <div className="h-8 w-8 rounded bg-muted/20 flex items-center justify-center">
                                        <Terminal className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-muted-foreground">ScrapeFlow</div>
                                        <div className="text-[10px] text-muted-foreground">Coming Soon</div>
                                    </div>
                                </div>
                            </div>

                            {/* System Status / Terminal */}
                            <div className="flex-1 bg-black/40 rounded-lg p-4 font-mono text-[10px] text-green-400 overflow-hidden relative">
                                <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col gap-1"
                                >
                                    <div>{">"} initializing clasely_core...</div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {">"} checking_licenses...
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="text-red-400"
                                    >
                                        {">"} subscription_model: NOT_FOUND (404)
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.5 }}
                                    >
                                        {">"} switching to LIFETIME_MODE... OK
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3.5 }}
                                        className="text-primary font-bold mt-2"
                                    >
                                        {">"} Welcome to the ecosystem.
                                    </motion.div>
                                    <motion.div
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-2 h-4 bg-green-400 inline-block align-middle ml-1"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
