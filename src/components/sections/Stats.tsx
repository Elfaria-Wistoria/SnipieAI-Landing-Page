"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

interface StatsProps {
    stats: {
        downloads: number;
        hoursSaved: number;
        rating: number;
    };
}

function Counter({ value, decimal = false }: { value: number, decimal?: boolean }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 75,
        damping: 15,
    });

    const display = useTransform(spring, (current) => {
        if (decimal) {
            return current.toFixed(1);
        }
        // Format with commas: 12,345
        return Math.round(current).toLocaleString();
    });

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [inView, value, spring]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats({ stats }: StatsProps) {
    return (
        <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm relative z-20">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">

                    {/* Downloads */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-2">
                            <Counter value={stats.downloads} />+
                        </div>
                        <p className="text-muted-foreground text-sm uppercase tracking-wider">
                            Total Downloads
                        </p>
                    </div>

                    {/* Hours Saved */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-2">
                            <Counter value={stats.hoursSaved} />+
                        </div>
                        <p className="text-muted-foreground text-sm uppercase tracking-wider">
                            Hours of Editing Saved
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-2 flex items-center gap-2">
                            <Counter value={stats.rating} decimal={true} />
                            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        </div>
                        <p className="text-muted-foreground text-sm uppercase tracking-wider">
                            Average Rating
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
