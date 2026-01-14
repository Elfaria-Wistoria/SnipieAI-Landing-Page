'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function TypographyReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Phases for text reveal
    // 0.0 - 0.3: Fade in first sentence
    // 0.4 - 0.7: Reveal "f*cksubscription"
    // 0.8 - 1.0: Final conclusion

    const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);

    // Scale/Blur effects for more drama
    const scale1 = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
    const blur1 = useTransform(scrollYProgress, [0.2, 0.3], [0, 10]);

    const scale2 = useTransform(scrollYProgress, [0.35, 0.5], [1.2, 1]);
    const y2 = useTransform(scrollYProgress, [0.35, 0.5], [50, 0]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

                {/* Phase 1 */}
                <motion.div
                    style={{ opacity: opacity1, scale: scale1, filter: useTransform(blur1, (v) => `blur(${v}px)`) }}
                    className="absolute inset-0 flex items-center justify-center p-8 text-center"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground/80 leading-tight text-balance max-w-4xl">
                        Say goodbye to endless <br className="hidden md:block" />
                        <span className="text-foreground">subscription fatigue.</span>
                    </h2>
                </motion.div>

                {/* Phase 2 */}
                <motion.div
                    style={{ opacity: opacity2, scale: scale2, y: y2 }}
                    className="absolute inset-0 flex items-center justify-center p-8 text-center"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none text-balance">
                        <span className="text-destructive drop-shadow-2xl">f*ck</span>{' '}
                        <span className="text-foreground">subscription</span>
                    </h2>
                </motion.div>

                {/* Phase 3 */}
                <motion.div
                    style={{ opacity: opacity3 }}
                    className="absolute inset-0 flex items-center justify-center p-8 text-center"
                >
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-balance">
                            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                                Clasely
                            </span>{' '}
                            is the solution.
                        </h2>
                        <p className="max-w-xl text-lg md:text-2xl text-muted-foreground text-balance leading-relaxed">
                            Own your tools. One payment, lifetime access.
                            The way software used to be.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
