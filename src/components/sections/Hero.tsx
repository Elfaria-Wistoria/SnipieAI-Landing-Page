"use client";

import { Button } from "@/components/ui/button";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center z-0 bg-[#050505] text-white">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 -z-10 bg-[#050505] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />

                {/* Top Light Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-to-b from-white/10 to-transparent blur-[100px] opacity-40 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            </div>

            <div className="container px-4 flex flex-col items-center relative z-10">

                {/* Text Content */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                            Scale your content,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                not your budget
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl sm:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        AI-native video clipper built for creators.<br />
                        Runs 100% offline. One-time payment.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-center w-full max-w-md gap-4"
                    >
                        <Link href="/download">
                            <Button size="lg" className="rounded-full h-14 px-10 text-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                                Download for Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>

                        <div className="flex items-center gap-2 text-sm text-zinc-500 mt-2">
                            <Check className="w-4 h-4 text-blue-500" />
                            <span>Runs on macOS, Windows & Linux</span>
                        </div>
                    </motion.div>
                </div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ y, opacity }}
                    className="relative w-full max-w-6xl mx-auto"
                >
                    {/* Glow behind dashboard */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20" />

                    <div className="relative rounded-xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] group">
                        <Image
                            src="/clipiee_app.jpeg"
                            alt="Clipiee App Dashboard"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />

                        {/* Overlay Gradient for seamless integration */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-20" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
