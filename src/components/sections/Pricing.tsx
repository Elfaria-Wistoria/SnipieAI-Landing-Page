"use client";

import { Check, Star, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type PricingPlan = {
    id: string;
    title: string;
    price: string;
    currency: string;
    frequency: string;
    description: string;
    features: string[];
    button_text: string;
    button_link: string | null;
    popular: boolean;
};

interface PricingProps {
    items: PricingPlan[];
}

export default function Pricing({ items }: PricingProps) {
    if (!items || items.length === 0) return null;

    return (
        <section id="pricing" className="relative w-full py-24 md:py-32 overflow-hidden bg-gray-50/50">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="container relative z-10 px-4 md:px-6">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Say goodbye to subscriptions. Pay once, own forever.
                        <br className="hidden md:block" /> Includes all future updates.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12 rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        
                        {/* Left Side: Pricing Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Lifetime License</h3>
                            <div className="flex items-baseline justify-center md:justify-start gap-1 mb-4">
                                <span className="text-5xl font-black tracking-tight text-gray-900">$29</span>
                                <span className="text-lg font-medium text-gray-500">/one-time</span>
                            </div>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Pay once, use forever. No monthly subscriptions. Includes all future updates and features.
                            </p>
                            
                            <Link href="/download" className="block w-full md:w-auto">
                                <Button 
                                    size="lg" 
                                    className="w-full md:w-auto h-14 px-8 text-lg font-bold rounded-xl bg-[#8B5CF6] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7C3AED]"
                                >
                                    Get SnipieAI Now
                                </Button>
                            </Link>
                            <p className="text-xs text-gray-400 mt-4 font-medium">
                                Secured by Gumroad • Instant Delivery
                            </p>
                        </div>

                        {/* Right Side: Features */}
                        <div className="flex-1 w-full bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                            <div className="space-y-4">
                                {[
                                    "Unlimited AI Clips",
                                    "Auto-Captions & Subtitles",
                                    "Face Tracking (Auto-Crop)",
                                    "1080p Import & Export",
                                    "No Watermark",
                                    "Offline Processing (Private)",
                                    "Mac & Windows Support",
                                    "Free Updates Forever"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full p-1 bg-[#8B5CF6]/10 text-[#8B5CF6]">
                                            <Check className="w-4 h-4" strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Guarantee Badge */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium text-gray-600">
                            30-day money-back guarantee • Secure payment
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}
