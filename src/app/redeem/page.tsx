"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { redeemLicense } from "@/app/actions/activation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, KeyRound, ShieldCheck, Loader2, Sparkles, Info, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: { success: boolean; message: string; code?: string } = {
    success: false,
    message: "",
};

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full h-14 text-lg font-bold relative overflow-hidden group bg-black text-white hover:bg-black/90 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(139,92,246,1)] transition-all rounded-xl"
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ACTIVATING...
                </>
            ) : (
                <>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <Sparkles className="w-5 h-5 mr-3 text-[#8B5CF6]" />
                    VERIFY & ACTIVATE
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
        <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-1 flex items-center justify-center relative overflow-hidden px-4 md:px-0 py-20 min-h-[80vh]">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] dark:invert" 
                    style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px'}} 
                />

                {/* Community Popup */}
                <Dialog open={showCommunityPopup} onOpenChange={setShowCommunityPopup}>
                    <DialogContent className="sm:max-w-md border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none">
                        <DialogHeader>
                            <div className="mx-auto w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mb-4 border-2 border-black dark:border-gray-700">
                                <Users className="w-6 h-6 text-[#8B5CF6]" />
                            </div>
                            <DialogTitle className="text-center text-xl font-bold text-black dark:text-white">Join the Community!</DialogTitle>
                            <DialogDescription className="text-center font-medium text-black dark:text-gray-300">
                                Join our Telegram group to get the latest updates, feature announcements, and tips from other creators.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex-col sm:flex-col gap-3 mt-4">
                            <Button className="w-full bg-[#8B5CF6] text-white border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold" asChild>
                                <a href="https://t.me/+J-_n_mS9jd4xMTRl" target="_blank" rel="noopener noreferrer">
                                    Join Telegram Group
                                </a>
                            </Button>
                            <Button variant="ghost" className="w-full font-bold hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white" onClick={() => setShowCommunityPopup(false)}>
                                Maybe Later
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div className="w-full max-w-lg relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden">
                            <CardHeader className="space-y-2 text-center pb-8 border-b-2 border-black dark:border-gray-700 bg-yellow-400/10 dark:bg-yellow-400/5">
                                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#8B5CF6] flex items-center justify-center mb-4 border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <KeyRound className="w-8 h-8 text-white" />
                                </div>
                                <CardTitle className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">Activate SnipieAI</CardTitle>
                                <CardDescription className="text-base font-medium text-black/70 dark:text-gray-400">
                                    Enter your email to verify purchase & get your license.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-8 px-8 pb-10">
                                <AnimatePresence mode="wait">
                                    {state.success ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center space-y-6"
                                        >
                                            <div className="mx-auto w-20 h-20 rounded-full bg-green-400 flex items-center justify-center border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                <ShieldCheck className="w-10 h-10 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-black dark:text-white mb-2">ACTIVATION SUCCESSFUL!</h3>
                                                <p className="text-gray-600 dark:text-gray-300 font-medium">
                                                    Your account has been upgraded. You can now use all premium features.
                                                </p>
                                            </div>

                                            {/* Display Dispensed Code */}
                                            {state.code && (
                                                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-black dark:border-gray-700 dashed">
                                                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Your License Key</p>
                                                    <div className="flex items-center gap-3 justify-center">
                                                        <code className="text-xl md:text-2xl font-mono font-bold tracking-widest text-[#8B5CF6] dark:text-[#A78BFA]">
                                                            {state.code}
                                                        </code>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className="h-10 w-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(state.code || "");
                                                                toast.success("License key copied!");
                                                            }}
                                                        >
                                                            <Copy className="w-5 h-5 text-black dark:text-white" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-3 mt-6">
                                                <Button
                                                    className="w-full h-14 text-lg bg-[#8B5CF6] hover:bg-[#7c4dff] text-white border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold rounded-xl"
                                                    onClick={() => setShowCommunityPopup(true)}
                                                >
                                                    <Users className="w-5 h-5 mr-2" />
                                                    Join Community
                                                </Button>
                                                <Button variant="outline" className="w-full h-14 text-lg font-bold border-2 border-black dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white dark:bg-transparent" onClick={() => window.location.href = '/'}>
                                                    Return Home
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-xl p-4 flex gap-3 items-start text-sm text-blue-800 dark:text-blue-200 font-medium">
                                                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                                                <p>
                                                    <strong>Important:</strong> Use the <u>same email address</u> you used for your purchase.
                                                </p>
                                            </div>

                                            <form action={formAction} className="space-y-6">
                                                <div className="space-y-2 text-left">
                                                    <Label htmlFor="email" className="text-lg font-bold text-black dark:text-white">Email Address</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        required
                                                        className="h-14 bg-white dark:bg-gray-950 border-2 border-black dark:border-gray-700 rounded-xl text-lg text-black dark:text-white focus-visible:ring-0 focus-visible:border-[#8B5CF6] focus-visible:shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] transition-all placeholder:text-gray-400"
                                                    />
                                                </div>


                                                <SubmitButton />

                                                <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2 font-medium">
                                                    Having trouble? <a href="https://t.me/gunsel112" target="_blank" className="underline hover:text-black dark:hover:text-white font-bold">Contact Support</a>
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
