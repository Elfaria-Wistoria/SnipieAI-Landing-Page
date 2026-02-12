"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const GridPattern = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div
                className="absolute inset-0 w-full h-full bg-[#050505]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #222 1px, transparent 1px),
                        linear-gradient(to bottom, #222 1px, transparent 1px)
                    `,
                    backgroundSize: '4rem 4rem',
                    maskImage: 'linear-gradient(to bottom right, transparent 20%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom right, transparent 20%, black 100%)'
                }}
            />
        </div>
    );
};

// Animated colored blocks that appear in the grid
const AnimatedGridBlocks = () => {
    // Generate some random blocks
    const [blocks, setBlocks] = useState<{ id: number; r: number; c: number; color: string; delay: number }[]>([]);

    useEffect(() => {
        const colors = ["bg-white/80", "bg-white/60", "bg-zinc-200/50", "bg-zinc-400/50"];
        const newBlocks = [];
        // Create a few fixed blocks for the visual
        const positions = [
            { r: 2, c: 8 }, { r: 3, c: 9 }, { r: 5, c: 7 }, { r: 6, c: 8 }, { r: 4, c: 10 }
        ];

        for (let i = 0; i < positions.length; i++) {
            newBlocks.push({
                id: i,
                r: positions[i].r,
                c: positions[i].c,
                color: colors[i % colors.length],
                delay: i * 0.2
            });
        }
        setBlocks(newBlocks);
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block opacity-30">
             {blocks.map((block) => (
                <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: block.delay + 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 4 
                    }}
                    className={`absolute w-16 h-16 ${block.color}`}
                    style={{
                        top: `calc(${block.r * 4}rem + 1px)`,
                        left: `calc(50% + ${block.c * 4}rem + 1px)`, // Offset from center
                    }}
                />
            ))}
        </div>
    );
};


const GridBeams = () => {
    const [beams, setBeams] = useState<{ id: number; top: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        // Create a fixed set of beams for consistent SSR/hydration match, or use client-side only generation
        const newBeams = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            top: Math.floor(Math.random() * 15) * 4 + 1, // multiple of 4rem + 1px for border
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 3
        }));
        setBeams(newBeams);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {beams.map((beam) => (
                <motion.div
                    key={beam.id}
                    className="absolute left-0 h-[1px] w-[200px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    style={{ top: `${beam.top}rem` }}
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100vw", opacity: [0, 1, 0] }}
                    transition={{
                        duration: beam.duration,
                        repeat: Infinity,
                        delay: beam.delay,
                        ease: "linear"
                    }}
                />
            ))}
            {/* Add some vertical beams too */}
             {beams.map((beam) => (
                <motion.div
                    key={`v-${beam.id}`}
                    className="absolute top-0 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                    style={{ left: `${Math.floor(Math.random() * 20) * 4 + 1}rem` }} 
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "100vh", opacity: [0, 1, 0] }}
                    transition={{
                        duration: beam.duration * 1.5,
                        repeat: Infinity,
                        delay: beam.delay + 2,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center bg-[#050505] text-white">
            <GridPattern />
            <AnimatedGridBlocks />
            <GridBeams />

            <div className="container px-4 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-[1.05] text-white">
                            Your fastest<br />
                            way to create<br />
                            viral clips
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl leading-relaxed font-light"
                    >
                        AI-native video clipper built for creators. Runs 100% offline. One-time payment. No subscription fatigue.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 items-start"
                    >
                        <Link href="/download">
                            <Button size="lg" className="rounded-none h-14 px-8 text-lg bg-white hover:bg-zinc-200 text-black font-medium transition-all">
                                Get Started for Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        
                        <a href="mailto:contact@clipiee.com">
                            <Button variant="outline" size="lg" className="rounded-none h-14 px-8 text-lg border-2 border-zinc-800 hover:border-white text-white bg-transparent hover:bg-transparent transition-all">
                                Contact Sales
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </div>
            
            {/* Right side visual decoration - partial grid */}
             <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block overflow-hidden pointer-events-none">
                <div className="absolute inset-0" 
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #222 1px, transparent 1px),
                            linear-gradient(to bottom, #222 1px, transparent 1px)
                        `,
                        backgroundSize: '5rem 5rem',
                        transform: 'translateX(1px) translateY(1px)' // Align pixels
                    }}
                >
                     {/* Decorative colored blocks logic could go here or strict CSS based on reference */}
                     <div className="absolute bottom-[20%] right-[20%] w-20 h-20 bg-white/40 animate-pulse opacity-50" />
                     <div className="absolute bottom-[35%] right-[15%] w-20 h-20 bg-white/20" />
                     <div className="absolute top-[30%] right-[30%] w-20 h-20 bg-zinc-900 border border-zinc-800" />
                </div>
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/50 to-[#050505]" />
            </div>

        </section>
    );
}
