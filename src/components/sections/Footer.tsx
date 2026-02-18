import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#7C3AED] to-[#5B21B6] text-white relative overflow-hidden">
            <div className="container px-4 pt-16 md:pt-20 pb-8">

                {/* Top section — CTA + Contact */}
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">

                    {/* Left — CTA */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.1] mb-8">
                            Ready to create<br />
                            viral clips?
                        </h2>
                        <Link href="/download">
                            <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl font-bold rounded-2xl bg-[#8B5CF6] text-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                                Download SnipieAI
                                <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                            </Button>
                        </Link>
                    </div>

                    {/* Right — Contact links */}
                    <div className="flex flex-col sm:flex-row gap-12">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Contact</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="https://x.com/clipieeexplore" target="_blank" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                                        Twitter / X <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://youtube.com/@clipieeexplore" target="_blank" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                                        YouTube <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="mailto:contact@clasely.com" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                                        Email <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Product</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/#features" className="text-white/80 hover:text-white transition-colors">Features</Link>
                                </li>
                                <li>
                                    <Link href="/#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</Link>
                                </li>
                                <li>
                                    <Link href="/download" className="text-white/80 hover:text-white transition-colors">Download</Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom — Legal links */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
                        <Link href="/privacy-terms" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/privacy-terms" className="text-white/80 hover:text-white underline underline-offset-4 transition-colors">
                            Terms and Conditions
                        </Link>
                    </div>
                    <p className="text-xs text-white/50">
                        &copy; {new Date().getFullYear()} SnipieAI by Clasely. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Large brand watermark */}
            <div className="relative h-24 md:h-36 overflow-hidden">
                <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[120px] md:text-[200px] font-black text-[#5B21B6] leading-none tracking-tighter select-none whitespace-nowrap translate-y-[35%]"
                    style={{ WebkitTextStroke: '6px white', paintOrder: 'stroke fill' }}
                >
                    SnipieAI
                </div>
            </div>
        </footer>
    );
}
