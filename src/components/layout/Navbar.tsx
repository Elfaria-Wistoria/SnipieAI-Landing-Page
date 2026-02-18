"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent border-none shadow-none">

            <div className="container flex h-16 items-center justify-between md:justify-center md:gap-24 px-4">
                <Link href="/" className="relative z-50 flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <Image
                        src="/snipieai.png"
                        alt="SnipieAI Logo"
                        width={64}
                        height={64}
                        className="h-12 w-auto object-contain"
                        priority
                    />
                    <span className="text-2xl font-black tracking-tighter text-black uppercase mt-1">SnipieAI</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-black">
                    <Link href="/#pricing" className="hover:text-[#8B5CF6] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B5CF6] hover:after:w-full after:transition-all after:duration-300">Pricing</Link>
                    <Link href="/download" className="hover:text-[#8B5CF6] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B5CF6] hover:after:w-full after:transition-all after:duration-300">Download</Link>
                    <Link href="/redeem" className="hover:text-[#8B5CF6] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B5CF6] hover:after:w-full after:transition-all after:duration-300">Activation Code</Link>
                    <Link href="/faq" className="hover:text-[#8B5CF6] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B5CF6] hover:after:w-full after:transition-all after:duration-300">FAQ</Link>
                </div>

                <div className="flex items-center gap-4">

                    <div className="hidden md:block">
                        <Link href="/download">
                            <Button size="sm" className="h-10 px-6 text-sm font-bold rounded-xl bg-[#8B5CF6] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7C3AED]">
                                Get SnipieAI
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 p-2 z-50"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div
                className={cn(
                    "md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 overflow-hidden transition-all duration-300 ease-in-out origin-top",
                    isOpen ? "max-h-[400px] opacity-100 shadow-xl" : "max-h-0 opacity-0"
                )}
            >
                <div className="flex flex-col p-4 space-y-4 font-medium text-gray-500">
                    <Link href="/#pricing" onClick={toggleMenu} className="hover:text-gray-900 transition-colors py-2 border-b border-gray-100">Pricing</Link>
                    <Link href="/download" onClick={toggleMenu} className="hover:text-gray-900 transition-colors py-2 border-b border-gray-100">Download</Link>
                    <Link href="/redeem" onClick={toggleMenu} className="hover:text-gray-900 transition-colors py-2 border-b border-gray-100">Activation Code</Link>
                    <Link href="/faq" onClick={toggleMenu} className="hover:text-gray-900 transition-colors py-2 mb-4">FAQ</Link>

                    <Link href="/download" onClick={toggleMenu} className="w-full">
                        <Button className="w-full h-12 text-base font-bold rounded-xl bg-[#8B5CF6] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#7C3AED]">
                            Get SnipieAI
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
