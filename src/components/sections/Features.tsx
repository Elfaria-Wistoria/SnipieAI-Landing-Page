"use client";

import { cn } from "@/lib/utils";
import { Zap, Lock, Scissors, Captions, Sparkles, Download, Check, Activity, HardDrive, Terminal } from "lucide-react";

import { motion } from "framer-motion";

/* ─── Mockups: Technical & Precise ─── */

function TimelineMockup() {
    return (
        <div className="flex flex-col gap-2 p-4 w-full">
            {/* Time markers */}
            <div className="flex justify-between text-[10px] font-mono text-gray-400 border-b border-gray-100 pb-1">
                <span>00:00</span>
                <span>00:15</span>
                <span>00:30</span>
                <span>00:45</span>
            </div>
            {/* Tracks */}
            <div className="space-y-1.5 relative">
                {/* Playhead */}
                <motion.div 
                    className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-10"
                    animate={{ left: ["10%", "90%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full -ml-[2px] -mt-[3px]" />
                </motion.div>
                
                {/* Video Track */}
                <div className="h-4 bg-gray-100 rounded-sm w-full relative overflow-hidden">
                    <div className="absolute left-[10%] w-[25%] h-full bg-[#8B5CF6]/20 border-x border-[#8B5CF6]/50" />
                    <div className="absolute left-[60%] w-[15%] h-full bg-[#8B5CF6]/20 border-x border-[#8B5CF6]/50" />
                </div>
                {/* Audio Track */}
                <div className="h-4 bg-gray-50 rounded-sm w-full flex items-center px-1 gap-0.5 opacity-60">
                    {[40, 70, 30, 60, 50, 80, 20, 90, 45, 55, 35, 65, 25, 75, 50, 40, 70, 30, 60, 50, 80, 20, 90, 45, 55, 35, 65, 25, 75, 50, 40, 70, 30, 60, 50, 80, 20, 90, 45, 55].map((height, i) => (
                        <motion.div 
                            key={i} 
                            className="w-full bg-gray-300 rounded-full" 
                            style={{ height: `${height}%` }}
                            animate={{ height: [ `${height}%`, `${Math.min(100, height + 20)}%`, `${height}%` ] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                        />
                    ))}
                </div>
            </div>
            {/* Metadata */}
            <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                    <span className="text-[10px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">CLIP_01</span>
                    <span className="text-[10px] font-mono bg-purple-50 px-1.5 py-0.5 rounded text-[#8B5CF6]">VIRAL_SCORE: 92</span>
                </div>
            </div>
        </div>
    );
}

function CaptionsMockup() {
    return (
        <div className="w-full p-4 font-mono text-[11px] leading-relaxed text-gray-500 bg-gray-50/50 rounded-lg border border-gray-100">
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex gap-3 border-l-2 border-[#8B5CF6] pl-3 py-1 bg-white shadow-sm rounded-r-md"
            >
                <span className="text-gray-300">00:04.22</span>
                <span className="text-gray-900 font-medium">Wait for the <span className="text-[#8B5CF6] underline decoration-wavy">drop</span>...</span>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="flex gap-3 pl-3.5 py-1"
            >
                <span className="text-gray-300">00:06.18</span>
                <span>Before everything changed.</span>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 0.5, delay: 2.5 }}
                className="flex gap-3 pl-3.5 py-1"
            >
                <span className="text-gray-300">00:08.45</span>
                <span>[Music intensifies]</span>
            </motion.div>
        </div>
    );
}

function LocalResourceMockup() {
    return (
        <div className="grid grid-cols-2 gap-3 w-full p-2">
            <div className="bg-gray-50 rounded p-2 border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                    <HardDrive className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] font-semibold text-gray-600 uppercase">Storage</span>
                </div>
                <div className="text-xs font-mono text-gray-900">Local SSD</div>
            </div>
            <div className="bg-gray-50 rounded p-2 border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-semibold text-gray-600 uppercase">Status</span>
                </div>
                <div className="text-xs font-mono text-emerald-600">Encrypted</div>
            </div>
            <div className="col-span-2 bg-gray-900 rounded p-2 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">UPLOAD_QUEUE</span>
                <span className="text-[10px] font-mono text-white">0 KB/s (Offline)</span>
            </div>
        </div>
    );
}

function PerformanceMockup() {
    return (
        <div className="w-full space-y-3 px-2">
            <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                    <span className="font-medium text-gray-900">SnipieAI (Local)</span>
                    <span className="font-mono text-gray-500">24s</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "15%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gray-900 rounded-full" 
                    />
                </div>
            </div>
            <div className="space-y-1 opacity-40">
                <div className="flex justify-between text-[11px]">
                    <span className="font-medium">Cloud Rendering</span>
                    <span className="font-mono">120s</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "75%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gray-400 rounded-full" 
                    />
                </div>
            </div>
        </div>
    );
}

function HooksMockup() {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-3 group hover:border-[#8B5CF6]/30 transition-colors">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Generated Hook</span>
                    <div className="flex gap-0.5">
                        <StarIcon className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <StarIcon className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <StarIcon className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    </div>
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                    "Stop scrolling if you want to create <span className="bg-[#8B5CF6]/10 text-[#7C3AED] px-1 rounded">viral clips</span>"
                </p>
            </div>
        </div>
    );
}

function StarIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}

function LicenseMockup() {
    return (
        <div className="flex flex-col items-center justify-center h-full py-2">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-2">
                <Check className="w-5 h-5 text-gray-900" />
            </div>
            <div className="text-2xl font-mono font-bold tracking-tighter text-gray-900 mb-1">
                LIFETIME
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Single Payment</div>
        </div>
    );
}


/* ─── Main Component ─── */

export default function Features() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
    };

    return (
        <section id="features" className="py-24 md:py-32 bg-white">
            <div className="container px-4">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl font-medium text-gray-400 tracking-tight mb-2"
                    >
                        Precision Engineered
                    </motion.h2>
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight"
                    >
                        Built for <span className="text-[#8B5CF6]">Creator Workflow</span>
                    </motion.h3>
                </div>

                {/* Bento Grid */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto"
                >
                    
                    {/* [1] Large Card: AI Detection Timeline */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 hover:border-[#8B5CF6]/30 transition-colors"
                    >
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#8B5CF6]/10 transition-colors">
                                    <Scissors className="w-5 h-5 text-gray-600 group-hover:text-[#8B5CF6] transition-colors" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">AI Clip Detection</h4>
                            </div>
                            <p className="text-gray-500 leading-relaxed max-w-lg">
                                Our heuristic algorithms analyze visual changes, audio peaks, and speech patterns to identify high-potential segments with frame-perfect accuracy.
                            </p>
                        </div>
                        <div className="bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden min-h-[180px] flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                            <TimelineMockup />
                        </div>
                    </motion.div>

                    {/* [2] Tall Card: Auto Captions */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="md:row-span-2 group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 hover:border-[#8B5CF6]/30 transition-colors flex flex-col"
                    >
                        <div className="mb-auto">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#8B5CF6]/10 transition-colors">
                                    <Captions className="w-5 h-5 text-gray-600 group-hover:text-[#8B5CF6] transition-colors" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">Auto Captions</h4>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                Whisper-powered speech recognition with 99% accuracy. Auto-syncs to frame rate.
                            </p>
                        </div>
                        <div className="mt-4">
                             <CaptionsMockup />
                        </div>
                    </motion.div>

                    {/* [3] Small Card: Local/Private */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 hover:border-[#8B5CF6]/30 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900 group-hover:text-[#8B5CF6] transition-colors">100% Offline</h4>
                            <Lock className="w-4 h-4 text-gray-400 group-hover:text-[#8B5CF6] transition-colors" />
                        </div>
                        <div className="bg-white rounded-xl">
                            <LocalResourceMockup />
                        </div>
                    </motion.div>

                    {/* [4] Small Card: Performance */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 hover:border-[#8B5CF6]/30 transition-colors"
                    >
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900 group-hover:text-[#8B5CF6] transition-colors">Speed</h4>
                            <Zap className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="bg-white rounded-xl pt-2">
                             <PerformanceMockup />
                        </div>
                    </motion.div>

                    {/* [5] Small Card: Hooks */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 hover:border-[#8B5CF6]/30 transition-colors"
                    >
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900 group-hover:text-[#8B5CF6] transition-colors">Smart Hooks</h4>
                            <Sparkles className="w-4 h-4 text-purple-500 group-hover:rotate-12 transition-transform" />
                        </div>
                         <div className="bg-white rounded-xl">
                            <HooksMockup />
                        </div>
                    </motion.div>

                     {/* [6] Small Card: License */}
                     <motion.div 
                        variants={item}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 hover:border-[#8B5CF6]/30 transition-colors"
                    >
                         <div className="h-full flex items-center justify-center">
                            <LicenseMockup />
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
