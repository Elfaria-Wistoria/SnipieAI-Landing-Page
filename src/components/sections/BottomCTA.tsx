'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function BottomCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Phase 1: Reveal "If you've scrolled this far,"
    // Phase 2: Reveal "it's time to try Clipiee" + Button

    // Phase 1: 0 - 0.4
    const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.45], [0, 1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
    const blur1 = useTransform(scrollYProgress, [0.35, 0.45], [0, 10]);

    // Phase 2: 0.5 - 1.0
    const opacity2 = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
    const scale2 = useTransform(scrollYProgress, [0.5, 0.7], [1.2, 1]);
    const y2 = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

    return (
        <section ref={containerRef} className="relative h-[200vh] bg-background">
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                {/* Phase 1 */}
                <motion.div
                    style={{ opacity: opacity1, scale: scale1, filter: useTransform(blur1, (v) => `blur(${v}px)`) }}
                    className="absolute inset-0 flex items-center justify-center p-8 text-center"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground/80 leading-tight text-balance max-w-4xl">
                        If you've scrolled this far,
                    </h2>
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                    style={{ opacity: opacity2, scale: scale2, y: y2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-12"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-balance">
                        it's time to try <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                            Clipiee
                        </span>
                        .
                    </h2>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/download">
                            <Button size="lg" className="text-xl px-10 py-8 rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/25">
                                Get Clipiee
                                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
