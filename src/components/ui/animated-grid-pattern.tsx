"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const GridPattern = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none select-none", className)}>
            <div
                className="absolute inset-0 w-full h-full"
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

export const AnimatedGridBlocks = ({ className }: { className?: string }) => {
    const [blocks, setBlocks] = useState<{ id: number; r: number; c: number; color: string; delay: number }[]>([]);

    useEffect(() => {
        const colors = ["bg-white/80", "bg-white/60", "bg-zinc-200/50", "bg-zinc-400/50"];
        const newBlocks = [];
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBlocks(newBlocks);
    }, []);

    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block opacity-30", className)}>
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
                        left: `calc(50% + ${block.c * 4}rem + 1px)`,
                    }}
                />
            ))}
        </div>
    );
};

export const GridBeams = ({ className }: { className?: string }) => {
    const [beams, setBeams] = useState<{ id: number; top: number; left: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        const newBeams = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            top: Math.floor(Math.random() * 15) * 4 + 1,
            left: Math.floor(Math.random() * 20) * 4 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 3
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBeams(newBeams);
    }, []);

    return (
        <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
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
             {beams.map((beam) => (
                <motion.div
                    key={`v-${beam.id}`}
                    className="absolute top-0 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                    style={{ left: `${beam.left}rem` }} 
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

export const HeroGridBackground = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <GridPattern />
            {/* Dark overlay for better text contrast if needed, adjustable via className */}
            <AnimatedGridBlocks />
            <GridBeams />
        </div>
    );
};
