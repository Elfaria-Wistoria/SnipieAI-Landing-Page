"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    } as const;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="font-mono text-xl font-bold tracking-tighter hover:text-primary transition-colors z-50">
                    Clasely_
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
                    <Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="/news" className="hover:text-foreground transition-colors">News</Link>
                    <Link href="/download" className="hover:text-foreground transition-colors">Download</Link>
                    <Link href="/redeem" className="hover:text-foreground transition-colors">Redeem</Link>
                    <Link href="/update" className="hover:text-foreground transition-colors">Update</Link>
                    <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <div className="hidden md:block">
                        <Link href="/download">
                            <Button size="sm" className="font-mono bg-primary/90 hover:bg-primary shadow-lg hover:shadow-primary/25 transition-all">
                                Get Clipiee
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-foreground p-2 z-50"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4 font-medium text-muted-foreground">
                            <Link href="/products" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 border-b border-border/10">Products</Link>
                            <Link href="/#pricing" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 border-b border-border/10">Pricing</Link>
                            <Link href="/news" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 border-b border-border/10">News</Link>
                            <Link href="/download" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 border-b border-border/10">Download</Link>
                            <Link href="/redeem" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 border-b border-border/10">Redeem</Link>
                            <Link href="/update" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 border-b border-border/10">Update</Link>
                            <Link href="/faq" onClick={toggleMenu} className="hover:text-foreground transition-colors py-2 mb-4">FAQ</Link>

                            <div className="flex items-center justify-between py-2 mb-4 border-t border-border/10 pt-4">
                                <span className="text-sm font-medium">Theme</span>
                                <ModeToggle />
                            </div>

                            <Link href="/download" onClick={toggleMenu} className="w-full">
                                <Button className="w-full font-mono bg-primary/90 hover:bg-primary shadow-lg">
                                    Get Clipiee
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
