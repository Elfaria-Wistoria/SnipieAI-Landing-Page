"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import HeroScene from "@/components/3d/HeroScene";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]); // Reduced distance

    // Removed useSpring and scale for raw performance
    // const animatedY = useSpring(y, springConfig);

    return (
        <section ref={containerRef} className="relative pt-32 lg:pt-20 pb-20 overflow-hidden min-h-screen flex items-center z-0">
            {/* Ambient Background - Static for performance */}
            <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="container px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v1.0.4 Now Available
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        Clasely. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
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

                    <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        We sell super apps, not subscriptions.
                        <b>Clipiee</b> is the #1 local alternative to Opus Clip. Runs 100% offline on your device. <span className="text-foreground font-medium">#F*ckSubscriptions</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto mb-12 lg:mb-0">
                        <Link href="/products" className="w-full sm:w-auto">
                            <Button size="lg" className="h-14 px-8 text-lg font-mono group w-full sm:w-auto rounded-full shadow-lg shadow-primary/25">
                                Explore Products
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground/60 font-mono">Pay once, use forever.</p>
                    </div>
                </motion.div>

                {/* 3D Scene - Right Column */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full h-[400px] lg:h-[600px] will-change-transform"
                >
                    <HeroScene />
                </motion.div>
            </div>
        </section>
    );
}
