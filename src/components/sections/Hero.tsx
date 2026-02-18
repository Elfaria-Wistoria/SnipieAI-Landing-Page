"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── Floating Badge Component ─── */
function FloatingBadge({ 
    children, 
    className, 
    rotate = 0, 
    delay = 0 
}: { 
    children: React.ReactNode; 
    className?: string; 
    rotate?: number; 
    delay?: number;
}) {
    return (
        <div 
            className={`absolute z-30 animate-float ${className}`}
            style={{ 
                transform: `rotate(${rotate}deg)`,
                animationDelay: `${delay}s` 
            }}
        >
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm md:text-base">
                {children}
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white pt-24 pb-32">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px'}} 
            />

            {/* ─── Floating Elements ─── */ }
            
            {/* Donation Badge */}
            <FloatingBadge className="top-32 right-10 md:right-32" rotate={6} delay={0.5}>
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-black">
                    👾
                </div>
                <div>
                    <span className="font-black block leading-none">Edwin</span>
                    <span className="text-xs font-medium text-gray-500">Created 12 Clips</span>
                </div>
            </FloatingBadge>

            {/* Viral Badge */}
            <FloatingBadge className="bottom-48 left-10 md:left-16" rotate={-6} delay={1.2}>
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border border-black">
                    🔥
                </div>
                <div>
                    <span className="font-black block leading-none">Viral Score</span>
                    <span className="text-xs font-medium text-gray-500">99/100</span>
                </div>
            </FloatingBadge>


            {/* ─── Main Content ─── */}
            <div className="container px-4 text-center relative z-10 mt-0">

                {/* Top Left: Launch Badge (Moved inside container for better grouping) */}
                <div className="absolute -top-12 left-0 md:left-[10%] rotate-[-12deg] z-10 hidden md:block">
                    <div className="bg-[#22c55e] border-2 border-black text-white font-black px-4 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest text-sm">
                        Beta Launch!
                    </div>
                </div>
                
                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-black mb-6 uppercase drop-shadow-sm">
                    <span className="block -rotate-1">JUST 4 STEPS</span>
                    <span className="block text-[#8B5CF6] rotate-1 relative inline-block">
                        TO BE A CLIPPER
                        <svg className="absolute -bottom-2 md:-bottom-4 w-full h-2 md:h-4 text-black" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-2xl font-medium text-gray-600 mb-10 leading-relaxed">
                    Turn long videos into viral content in seconds.
                    <br className="hidden md:block" />
                    Automatic. Fast. Simple.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/download">
                        <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-bold rounded-2xl bg-[#8B5CF6] text-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                            Become a Clipper
                            <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* ─── Mascots (Absolute Check) ─── */}
            
            {/* Left Mascot: Character 1 */}
            <div className="absolute -bottom-5 md:bottom-0 left-0 md:left-20 w-40 md:w-64 pointer-events-none z-20">
                <Image 
                    src="/images/character_cat-1.png" 
                    alt="Character Cat 1" 
                    width={500} 
                    height={500}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Right Mascot: Character 2 */}
            <div className="absolute top-1/2 right-0 md:right-10 w-32 md:w-60 pointer-events-none z-0 opacity-20 md:opacity-100">
                <Image 
                    src="/images/character_cat-2.png" 
                    alt="Character Cat 2" 
                    width={500} 
                    height={500}
                    className="object-contain rotate-12"
                />
            </div>

             {/* Background Shapes */}
             <div className="absolute top-20 right-1/4 w-20 h-20 bg-purple-300 rounded-full border-2 border-black z-0 opacity-50 animate-pulse" />
             <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-yellow-300 rotate-45 border-2 border-black z-0 opacity-50" />
            
             {/* Decorative Scribbles */}
             
             {/* Top Left Scribble */}
             <div className="absolute top-40 left-[2%] md:left-[5%] w-32 md:w-48 z-0 pointer-events-none rotate-[-15deg] opacity-80">
                <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 100 C 50 20, 120 20, 150 80 C 180 140, 80 140, 50 80 C 40 60, 100 0, 180 20" stroke="black" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" transform="translate(6, 6)" />
                    <path d="M20 100 C 50 20, 120 20, 150 80 C 180 140, 80 140, 50 80 C 40 60, 100 0, 180 20" stroke="#8B5CF6" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
             </div>

             {/* Bottom Right Scribble */}
             <div className="absolute -bottom-5 right-[5%] md:right-[10%] w-40 md:w-56 z-0 pointer-events-none rotate-[10deg] opacity-80">
                <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10 75 C 40 75, 50 20, 100 20 C 150 20, 160 80, 190 80" stroke="black" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" transform="translate(6, 6)" />
                     <path d="M10 75 C 40 75, 50 20, 100 20 C 150 20, 160 80, 190 80" stroke="#8B5CF6" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
             </div>

        </section>
    );
}
