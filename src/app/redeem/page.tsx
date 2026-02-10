"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { redeemLicense } from "@/app/actions/activation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, KeyRound, ShieldCheck, Loader2, Sparkles, Info, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: { success: boolean; message: string; code?: string } = {
    success: false,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full h-12 text-base font-medium relative overflow-hidden group"
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Activating...
                </>
            ) : (
                <>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <Sparkles className="w-4 h-4 mr-2" />
                    Verify & Activate
                </>
            )}
        </Button>
    );
}

// ... imports ...

export default function RedeemPage() {
    const [state, formAction] = useActionState(redeemLicense, initialState);
    const [showCommunityPopup, setShowCommunityPopup] = useState(false);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                // Show popup after a short delay for better UX
                setTimeout(() => setShowCommunityPopup(true), 1500);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center relative overflow-hidden px-4 md:px-0 py-20">
                {/* ... existing content ... */}

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

                <div className="w-full max-w-md relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl">
                            <CardHeader className="space-y-1 text-center pb-8 border-b border-border/50">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/20">
                                    <KeyRound className="w-7 h-7 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Activate Clipiee</CardTitle>
                                <CardDescription className="text-base">
                                    By verifying your email used for purchase.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-8">
                                <AnimatePresence mode="wait">
                                    {state.success ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-6 space-y-4"
                                        >
                                            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <ShieldCheck className="w-8 h-8 text-green-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-green-500 mb-2">Activation Successful!</h3>
                                                <p className="text-muted-foreground text-sm">
                                                    Your account has been upgraded. You can now use all premium features in the app.
                                                </p>
                                            </div>

                                            {/* Display Dispensed Code */}
                                            {state.code && (
                                                <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                                                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Your License Key</p>
                                                    <div className="flex items-center gap-2 justify-center">
                                                        <code className="text-lg font-bold tracking-widest text-primary">
                                                            {state.code}
                                                        </code>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-8 w-8 ml-2"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(state.code || "");
                                                                toast.success("License key copied!");
                                                            }}
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-2 mt-4">
                                                <Button
                                                    className="w-full bg-blue-500 hover:bg-blue-600 gap-2"
                                                    onClick={() => setShowCommunityPopup(true)}
                                                >
                                                    <Users className="w-4 h-4" />
                                                    Join Community
                                                </Button>
                                                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
                                                    Return Home
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start text-sm text-blue-500">
                                                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                                                <p>
                                                    <strong>Important:</strong> Please ensure you enter the <u>same email address</u> that you used for your purchase on Lynk.id.
                                                </p>
                                            </div>

                                            <form action={formAction} className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        required
                                                        className="h-11 bg-background/50"
                                                    />
                                                </div>


                                                <SubmitButton />

                                                <p className="text-xs text-center text-muted-foreground pt-2">
                                                    Having trouble? <a href="https://t.me/gunsel112" target="_blank" className="underline hover:text-foreground">Contact Support</a>
                                                </p>
                                            </form>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
