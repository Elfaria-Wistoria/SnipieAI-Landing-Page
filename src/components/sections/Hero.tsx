"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scissors, Terminal } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container px-4 grid lg:grid-cols-2 gap-12 items-center">
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
                        Turn long videos into <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            viral clips automatically
                        </span>.
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                        Clipiee uses AI to find the best moments, add active captions, and insert viral hooks.
                        Stop editing manually. Start shipping content.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Button size="lg" className="h-12 px-8 font-mono group">
                            Get Clipiee $49
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
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
                                clipiee_editor.exe
                            </div>
                        </div>

                        {/* Editor Body */}
                        <div className="flex-1 p-6 flex flex-col gap-4 relative">
                            {/* Timeline Mockup */}
                            <div className="flex-1 bg-black/40 rounded-lg relative overflow-hidden group">
                                <div className="absolute inset-x-0 bottom-8 h-24 flex items-end gap-1 px-4 opacity-50">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 bg-primary/40 rounded-t-sm"
                                            initial={{ height: "20%" }}
                                            animate={{ height: ["20%", "60%", "30%", "80%", "40%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.05 }}
                                        />
                                    ))}
                                </div>
                                {/* Playhead */}
                                <motion.div
                                    className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Floating Caption */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <motion.div
                                        className="bg-black/80 px-4 py-2 rounded-lg text-white font-bold text-xl backdrop-blur-sm border border-white/10"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        Wait for the drop... 🎵
                                    </motion.div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="h-16 border border-border/50 rounded-lg bg-background/30 flex items-center justify-between px-6">
                                <div className="flex gap-4">
                                    <Scissors className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                                    <Terminal className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                                </div>
                                <Button size="sm" variant="secondary" className="text-xs h-8">Export Clip</Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
