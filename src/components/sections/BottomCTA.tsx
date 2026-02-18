"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function BottomCTA() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
    const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 1, 1], [0.95, 1, 1, 1]);

    return (
        <section ref={ref} className="relative py-32 overflow-hidden bg-white">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/10 rounded-full blur-[128px]" />
            </div>

            <div className="container px-4 relative z-10">
                <motion.div
                    style={{ opacity, y, scale }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-gray-900">
                        Ready to <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] bg-clip-text text-transparent">make clips</span> the smart way?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join thousands of creators who ditched subscriptions.
                        One time payment. Lifetime updates. No strings attached.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/download">
                            <Button size="lg" className="rounded-full h-14 px-10 text-lg bg-[#8B5CF6] hover:bg-[#6D28D9] text-white font-medium transition-all shadow-lg shadow-[#8B5CF6]/25 hover:shadow-xl hover:shadow-[#8B5CF6]/30 hover:scale-[1.02]">
                                Get Started for Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/#pricing">
                            <Button variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg border-2 border-gray-200 text-gray-700 hover:border-[#8B5CF6] hover:text-gray-900 bg-white/60 hover:bg-white transition-all">
                                See Pricing
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
