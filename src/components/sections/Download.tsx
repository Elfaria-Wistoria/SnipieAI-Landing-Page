"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeroGridBackground } from "@/components/ui/animated-grid-pattern";

const VERSION = "1.0.5";
const RELEASE_TAG = "Clipiee";
const WIN_FILENAME = `Clipieev${VERSION}.exe`;
const REPO_URL = "https://github.com/clipieeexplore/clipiee-releases/releases/download";

// Construct download URLs
const WIN_DOWNLOAD_URL = `${REPO_URL}/${RELEASE_TAG}/${WIN_FILENAME}`;

interface DownloadProps {
    winUrl?: string;
}

export default function Download({ winUrl }: DownloadProps) {
    // const finalMacUrl = macUrl || MAC_DOWNLOAD_URL;
    const finalWinUrl = winUrl || WIN_DOWNLOAD_URL;
    const [os, setOs] = useState<"mac" | "windows" | null>(null);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes("mac")) {
            setOs("mac");
        } else if (userAgent.includes("win")) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOs("windows");
        }
    }, []);

    return (
        <section id="download" className="py-32 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] opacity-30" />
            </div>

            <HeroGridBackground />

            <div className="container px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs mb-6 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v{VERSION} Stable Release
                    </div>

                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        Get Clipiee for Desktop
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experience the fastest way to create viral clips. Local processing, privacy-focused, and built for speed.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
                    {/* macOS Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        {os === "mac" && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1 min-w-max animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <Star className="w-3 h-3 fill-current" /> Recommended for You
                            </div>
                        )}

                        <Card className={cn(
                            "h-full bg-background/40 backdrop-blur-xl border-border/50 transition-all duration-500 group relative overflow-hidden",
                            os === "mac"
                                ? "border-primary/50 shadow-2xl shadow-primary/10 scale-[1.02] ring-1 ring-primary/20"
                                : "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                        )}>
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none",
                                os === "mac" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )} />

                            <CardHeader className="pt-10 pb-2">
                                <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-b from-background to-muted border border-border/50 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50" />
                                    <svg viewBox="0 0 384 512" fill="currentColor" className="w-10 h-10 text-foreground relative z-10">
                                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                                    </svg>
                                </div>
                                <CardTitle className="text-3xl font-light">macOS</CardTitle>
                                <CardDescription className="text-base text-muted-foreground/80">
                                    Universal Binary • Apple Silicon & Intel
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 pt-6">
                                <Button
                                    disabled
                                    className={cn(
                                        "w-full h-14 text-lg font-medium shadow-lg transition-all duration-300 relative overflow-hidden justify-center",
                                        "bg-muted text-muted-foreground cursor-not-allowed opacity-70"
                                    )}
                                >
                                    <span className="flex items-center justify-center">
                                        Coming Soon
                                    </span>
                                </Button>

                                <div className="space-y-3 text-sm text-muted-foreground text-left px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>Native M1/M2/M3 Support</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>Requires macOS 11.0 (Big Sur)+</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Windows Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        {os === "windows" && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/20 flex items-center gap-1 min-w-max animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <Star className="w-3 h-3 fill-current" /> Recommended for You
                            </div>
                        )}

                        <Card className={cn(
                            "h-full bg-background/40 backdrop-blur-xl border-border/50 transition-all duration-500 group relative overflow-hidden",
                            os === "windows"
                                ? "border-blue-500/50 shadow-2xl shadow-blue-500/10 scale-[1.02] ring-1 ring-blue-500/20"
                                : "hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
                        )}>
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none",
                                os === "windows" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )} />

                            <CardHeader className="pt-10 pb-2">
                                <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-b from-background to-muted border border-border/50 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-50" />
                                    <svg viewBox="0 0 88 88" fill="currentColor" className="w-10 h-10 text-foreground relative z-10">
                                        <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402zm35.67 33.529l.028 34.453L.028 75.462l-.028-29.28 35.67-.251zm52.326-38.64l.003 39.554-48.245.225-.015-39.048L87.996 7.29zM39.729 46.18l48.262.246V80.68l-48.247-6.578-.015-27.922z"/>
                                    </svg>
                                </div>
                                <CardTitle className="text-3xl font-light">Windows</CardTitle>
                                <CardDescription className="text-base text-muted-foreground/80">
                                    64-bit Installer • Single File
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 pt-6">
                                <Button
                                    className={cn(
                                        "w-full h-14 text-lg font-medium shadow-lg transition-all duration-300 relative overflow-hidden group/btn",
                                        "bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer"
                                    )}
                                    onClick={() => {
                                        if (finalWinUrl) {
                                            window.location.href = finalWinUrl;
                                        }
                                    }}
                                >
                                    Download for Windows
                                </Button>

                                <div className="space-y-3 text-sm text-muted-foreground text-left px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>Windows 10 & 11 Supported</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>Auto-Updater Included</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-24 text-center"
                >
                    <div className="flex justify-center gap-8 text-sm text-muted-foreground/60">
                        <Link href="/changelog" className="hover:text-foreground transition-colors flex items-center gap-1 group">
                            Release Notes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
