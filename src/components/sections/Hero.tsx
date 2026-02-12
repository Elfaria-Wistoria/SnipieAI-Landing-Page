"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedGridBlocks, GridBeams, GridPattern } from "@/components/ui/animated-grid-pattern";

// Removing local definitions as they are now imported
// const GridPattern ...
// const AnimatedGridBlocks ...
// const GridBeams ...

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
