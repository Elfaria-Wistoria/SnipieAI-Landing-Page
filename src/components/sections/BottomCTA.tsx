'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomCTA() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-background flex justify-center">
            <div className="container px-4 md:px-6 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative group rounded-3xl border border-white/10 bg-neutral-900/50 p-8 md:p-16 overflow-hidden max-w-4xl w-full text-center isolate"
                >
                    {/* Animated Gradient Border/Glow */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-[200%] h-full animate-shine pointer-events-none" />
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.1),transparent_70%)] opacity-40" />

                    <div className="flex flex-col items-center space-y-8 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight text-white">
                            If you've scrolled this far, <br className="md:hidden" />
                            it's time to try <span className="text-primary">Clipiee</span>.
                        </h2>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/download">
                                <Button size="lg" className="text-lg px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                                    Get Clipiee
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
