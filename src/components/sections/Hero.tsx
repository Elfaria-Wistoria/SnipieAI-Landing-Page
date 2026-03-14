"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, Variants, useScroll, useTransform } from "framer-motion";


export default function Hero() {

    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Parallax layers at different speeds
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const bgShape1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
    const bgShape2Y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    const scribble1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
    const scribble2Y = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);

    const popUp: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 24 },
        visible: (custom: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 240,
                damping: 22,
                delay: custom * 0.1
            }
        })
    };

    return (
        <section ref={sectionRef} className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#1A1A18] pt-32 md:pt-40 pb-20 md:pb-32 transition-colors duration-300 overflow-hidden">

            {/* Background Grid Pattern — fades on scroll */}
            <motion.div
                className="absolute inset-0 pointer-events-none dark:invert"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: gridOpacity }}
            />


            {/* ─── Main Content ─── */}
            <motion.div style={{ y: textY }} className="container max-w-5xl px-4 text-center relative z-10 flex flex-col items-center">

                {/* Headline */}
                <div className="relative inline-block">
                    <motion.div
                        custom={0}
                        variants={popUp}
                        initial="hidden"
                        animate="visible"
                        className="absolute -top-8 -left-6 md:-left-10 rotate-[-12deg] z-20 hidden md:block"
                    >
                        <div className="bg-[#7C3AED] border-2 border-black text-white font-black italic px-4 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest text-sm">
                            Beta Launch!
                        </div>
                    </motion.div>

                    <motion.h1
                        custom={1}
                        variants={popUp}
                        initial="hidden"
                        animate="visible"
                        className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.75rem] font-black tracking-tighter leading-[0.9] text-black dark:text-white mb-6 uppercase drop-shadow-sm"
                    >
                        <span className="block">AI CLIPPING POWER</span>
                        <span className="block text-[#7C3AED] relative inline-block">
                            WITHOUT THE SUBSCRIPTION
                            <svg className="absolute -bottom-2 md:-bottom-4 w-full h-2 md:h-4 text-black dark:text-white" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </motion.h1>
                </div>

                <motion.p
                    custom={2}
                    variants={popUp}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-500 dark:text-gray-300 mb-4 leading-relaxed"
                >
                    While Opus Clip charges{" "}
                    <span className="font-black text-red-500 line-through decoration-2">$19/month</span>
                    {" "}— Norraclip is yours{" "}
                    <span className="font-black text-[#7C3AED]">forever for $6</span>.{" "}
                    No subscription. No cloud. 100% offline.
                </motion.p>

                {/* Comparison strip */}
                <motion.div
                    custom={3}
                    variants={popUp}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap items-center justify-center gap-3 mb-10"
                >
                    {[
                        { label: "Opus Clip", price: "$19/mo", bad: true },
                        { label: "Descript", price: "$24/mo", bad: true },
                        { label: "Norraclip", price: "$6 once", bad: false },
                    ].map(({ label, price, bad }) => (
                        <div
                            key={label}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-bold ${
                                bad
                                    ? "border-red-200 bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400"
                                    : "border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED]"
                            }`}
                        >
                            <span>{label}</span>
                            <span className={bad ? "line-through opacity-70" : "font-black"}>{price}</span>
                            {!bad && <span className="text-[10px] font-black uppercase tracking-widest bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full">✓ Best</span>}
                        </div>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    custom={4}
                    variants={popUp}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="https://drive.google.com/drive/folders/1ozHuB4uJaEGipYwBUbh9-Yr__l8Ibr5i?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl font-black rounded-2xl bg-[#7C3AED] text-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#6D28D9]">
                            ⬇ Download Free Now
                            <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                        </Button>
                    </Link>
                    <Link href="/#pricing">
                        <button className="h-12 px-6 text-base font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline underline-offset-4 transition-colors">
                            See one-time pricing →
                        </button>
                    </Link>
                </motion.div>



            </motion.div>







            {/* Background Shapes with scroll parallax */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                style={{ y: bgShape1Y }}
                className="absolute top-20 right-1/4 w-20 h-20 bg-green-300 rounded-full border-2 border-black z-0 opacity-50 animate-pulse"
            />
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
                style={{ y: bgShape2Y }}
                className="absolute bottom-20 left-1/3 w-12 h-12 bg-yellow-300 rotate-45 border-2 border-black z-0 opacity-50"
            />

            {/* Decorative Scribbles */}

            {/* Top Left Scribble */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ y: scribble1Y }}
                className="absolute top-40 left-[2%] md:left-[5%] w-32 md:w-48 z-0 pointer-events-none rotate-[-15deg] opacity-80"
            >
                <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        d="M20 100 C 50 20, 120 20, 150 80 C 180 140, 80 140, 50 80 C 40 60, 100 0, 180 20"
                        stroke="currentColor"
                        className="text-black dark:text-white"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(6, 6)"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        d="M20 100 C 50 20, 120 20, 150 80 C 180 140, 80 140, 50 80 C 40 60, 100 0, 180 20"
                        stroke="#7C3AED"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            {/* Bottom Right Scribble */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1.2, duration: 1 }}
                style={{ y: scribble2Y }}
                className="absolute -bottom-5 right-[5%] md:right-[10%] w-40 md:w-56 z-0 pointer-events-none rotate-[10deg] opacity-80"
            >
                <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                        d="M10 75 C 40 75, 50 20, 100 20 C 150 20, 160 80, 190 80"
                        stroke="currentColor"
                        className="text-black dark:text-white"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(6, 6)"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                        d="M10 75 C 40 75, 50 20, 100 20 C 150 20, 160 80, 190 80"
                        stroke="#7C3AED"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

        </section>
    );
}
