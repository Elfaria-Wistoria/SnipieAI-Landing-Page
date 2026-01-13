"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="font-mono text-xl font-bold tracking-tighter hover:text-primary transition-colors">
                    Clasely_
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
                    <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
                    <Link href="/news" className="hover:text-foreground transition-colors">News</Link>
                    <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="/download" className="hover:text-foreground transition-colors">Download</Link>
                    <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
                </div>

                <div className="flex items-center gap-4">

                    <Link href="/pricing">
                        <Button size="sm" className="font-mono">
                            Get Lifetime Access
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
