"use client";

import { verifyDownloadAccess } from "@/app/actions/update-verification";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Apple, ArrowRight, Check, Download as DownloadIcon, Loader2, Lock, Monitor, RefreshCcw, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const VERSION = "1.0.2";

type UpdateClientProps = {
    macDownloadUrl: string;
    winDownloadUrl: string;
};

const initialState = {
    success: false,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full h-11 text-base font-medium relative overflow-hidden group"
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                </>
            ) : (
                <>
                    Verify Purchase
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </Button>
    );
}

export default function UpdateClient({ macDownloadUrl, winDownloadUrl }: UpdateClientProps) {
    const [os, setOs] = useState<"mac" | "windows" | null>(null);
    const [state, formAction] = useActionState(verifyDownloadAccess, initialState);
    const [isVerified, setIsVerified] = useState(false);
    const [showCommunityPopup, setShowCommunityPopup] = useState(false);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes("mac")) {
            setOs("mac");
        } else if (userAgent.includes("win")) {
            setOs("windows");
        }
    }, []);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                setIsVerified(true);
                // Show popup after a short delay
                setTimeout(() => setShowCommunityPopup(true), 1500);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <div className="min-h-screen pt-24 pb-12 relative overflow-hidden bg-background">
            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10 bg-background overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] opacity-30" />
            </div>

            {/* Community Popup */}
            <Dialog open={showCommunityPopup} onOpenChange={setShowCommunityPopup}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <DialogTitle className="text-center text-xl">Join the Community!</DialogTitle>
                        <DialogDescription className="text-center">
                            Join our Telegram group to get the latest updates, feature announcements, and tips from other creators.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-col gap-2 mt-4">
                        <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                            <a href="https://t.me/+J-_n_mS9jd4xMTRl" target="_blank" rel="noopener noreferrer">
                                Join Telegram Group
                            </a>
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => setShowCommunityPopup(false)}>
                            Maybe Later
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="container px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8 backdrop-blur-sm shadow-sm hover:bg-primary/10 transition-colors cursor-default">
                        <RefreshCcw className="w-4 h-4 animate-spin-slow" />
                        <span>Update Available</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 pb-2">
                        Get the Latest Version
                    </h1>
                    <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed mb-8">
                        Upgrade to <span className="font-semibold text-foreground">v{VERSION}</span> for better performance, new features, and a smoother experience.
                    </p>

                    {!isVerified && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto"
                        >
                            <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl">
                                <CardHeader className="pb-4">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/20">
                                        <Lock className="w-5 h-5 text-primary" />
                                    </div>
                                    <CardTitle>Verify Ownership</CardTitle>
                                    <CardDescription>
                                        Please enter the email address used for your purchase to access the download.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form action={formAction} className="space-y-4 text-left">
                                        <div className="space-y-2">
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                required
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <SubmitButton />
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>

                <AnimatePresence mode="wait">
                    {isVerified && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
                                {/* macOS Selection */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="relative"
                                >
                                    {os === "mac" && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full shadow-xl flex items-center gap-1.5 min-w-max animate-in fade-in slide-in-from-bottom-2 duration-500 ring-1 ring-background/20">
                                            <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Your System
                                        </div>
                                    )}

                                    <Card className={cn(
                                        "h-full bg-background/30 backdrop-blur-xl border-border/50 transition-all duration-500 group relative overflow-hidden",
                                        os === "mac"
                                            ? "border-primary/40 shadow-2xl shadow-primary/10 scale-[1.02] ring-1 ring-primary/20"
                                            : "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                                    )}>
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-500 pointer-events-none",
                                            os === "mac" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        )} />

                                        <CardHeader className="pt-10 pb-4">
                                            <div className="mx-auto w-24 h-24 rounded-[2rem] bg-gradient-to-b from-background to-muted border border-white/10 shadow-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                                                <Apple className="w-12 h-12 text-foreground relative z-10" />
                                            </div>
                                            <CardTitle className="text-3xl font-bold tracking-tight">macOS</CardTitle>
                                            <CardDescription className="text-base text-muted-foreground">
                                                Universal Binary (Intel & Apple Silicon)
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-8 pt-4 pb-10">
                                            <Button
                                                className={cn(
                                                    "w-full h-14 text-lg font-medium shadow-lg transition-all duration-300 relative overflow-hidden rounded-xl",
                                                    "bg-foreground text-background hover:bg-foreground/90"
                                                )}
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = macDownloadUrl;
                                                    link.setAttribute('download', '');
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <DownloadIcon className="w-5 h-5" /> Download for Mac
                                                </span>
                                            </Button>

                                            <div className="space-y-3 pl-2">
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                                                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span>Native M-Series Support</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                                                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span>Enhanced for macOS Sequoia</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Windows Selection */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="relative"
                                >
                                    {os === "windows" && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl shadow-blue-500/20 flex items-center gap-1.5 min-w-max animate-in fade-in slide-in-from-bottom-2 duration-500 ring-1 ring-blue-400/50">
                                            <Sparkles className="w-3 h-3 fill-white text-white" /> Your System
                                        </div>
                                    )}

                                    <Card className={cn(
                                        "h-full bg-background/30 backdrop-blur-xl border-border/50 transition-all duration-500 group relative overflow-hidden",
                                        os === "windows"
                                            ? "border-blue-500/50 shadow-2xl shadow-blue-500/10 scale-[1.02] ring-1 ring-blue-500/20"
                                            : "hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
                                    )}>
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none",
                                            os === "windows" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        )} />

                                        <CardHeader className="pt-10 pb-4">
                                            <div className="mx-auto w-24 h-24 rounded-[2rem] bg-gradient-to-b from-background to-muted border border-white/10 shadow-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                                                <Monitor className="w-12 h-12 text-foreground relative z-10" />
                                            </div>
                                            <CardTitle className="text-3xl font-bold tracking-tight">Windows</CardTitle>
                                            <CardDescription className="text-base text-muted-foreground">
                                                Windows 10 & 11 (64-bit)
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-8 pt-4 pb-10">
                                            <Button
                                                className={cn(
                                                    "w-full h-14 text-lg font-medium shadow-xl shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group/btn rounded-xl",
                                                    "bg-blue-600 hover:bg-blue-500 text-white border-0 hover:scale-[1.02] active:scale-[0.98]"
                                                )}
                                                onClick={() => {
                                                    const link = document.createElement('a');
                                                    link.href = winDownloadUrl;
                                                    link.setAttribute('download', '');
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <DownloadIcon className="w-5 h-5" /> Download Update
                                                </span>
                                            </Button>

                                            <div className="space-y-3 pl-2">
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                                                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                                        <Zap className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span>Auto-Update Support Included</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                                                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </div>
                                                    <span>Preserves Your Settings</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-20 flex flex-col items-center gap-4"
                >
                    {isVerified && (
                        <Button onClick={() => setShowCommunityPopup(true)} className="gap-2 bg-blue-500 hover:bg-blue-600 rounded-full px-6 mb-2">
                            <Users className="w-4 h-4" /> Join Community
                        </Button>
                    )}
                    <p className="text-sm text-muted-foreground/50">
                        Current Version: v{VERSION} • Released Jan 2026
                    </p>
                    <Link
                        href="/changelog"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group px-4 py-2 rounded-full hover:bg-muted"
                    >
                        View release notes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
