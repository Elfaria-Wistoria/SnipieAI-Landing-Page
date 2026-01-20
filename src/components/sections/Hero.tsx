"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    // Spring physics for smoother animation
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const animatedY = useSpring(y, springConfig);
    const animatedRotateX = useSpring(rotateX, springConfig);
    const animatedScale = useSpring(scale, springConfig);

    return (
        <section ref={containerRef} className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col items-center justify-center z-0 perspective-[2000px]">
            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 100, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, -50, 0],
                        y: [0, 100, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px] opacity-30"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 70, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                    className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-30"
                />
            </div>

            <div className="container px-4 relative z-10 flex flex-col items-center">
                {/* Text Content */}
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-4xl mx-auto flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v1.0.2 Now Available
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        Clasely. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
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

                    <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        We sell super apps, not subscriptions.
                        <b>Clipiee</b> is the #1 local alternative to Opus Clip. Runs 100% offline on your device. <span className="text-foreground font-medium">#F*ckSubscriptions</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto mb-20">
                        <Link href="/products" className="w-full sm:w-auto">
                            <Button size="lg" className="h-14 px-8 text-lg font-mono group w-full sm:w-auto rounded-full shadow-lg shadow-primary/25">
                                Explore Products
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground/60 font-mono">Pay once, use forever.</p>
                    </div>
                </motion.div>

                {/* App Preview Image */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{
                        y: animatedY,
                        rotateX: animatedRotateX,
                        scale: animatedScale,
                    }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-4xl mx-auto perspective-1000"
                >
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-background/50 backdrop-blur-sm ring-1 ring-white/10 lg:rounded-2xl transform-style-3d">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 mix-blend-overlay pointer-events-none" />
                        <Image
                            src="/app.png"
                            alt="Clipiee App Interface"
                            width={1920}
                            height={1080}
                            quality={80}
                            priority
                            className="w-full h-auto rounded-xl lg:rounded-2xl"
                        />

                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-xl lg:rounded-2xl" />
                    </div>

                    {/* Glow Effect under the image */}
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-[3rem] opacity-40" />
                </motion.div>
            </div>
        </section>
    );
}
