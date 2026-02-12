"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

const initialState = {
    success: false,
    message: '',
};

export default function Newsletter() {
    const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);

    return (
        <section className="py-24 relative overflow-hidden border-t border-border/40">
            <div className="absolute inset-0 bg-primary/5 -z-10" />

            {/* Background gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 mix-blend-multiply animate-blob" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 mix-blend-multiply animate-blob animation-delay-2000" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-3xl font-light tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Stay Verified. Stay Updated.
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Join our newsletter to receive the latest updates, feature releases, and exclusive tips for creators.
                        </p>
                    </div>

                    <form action={formAction} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
                        <div className="relative flex-1">
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="flex h-12 w-full rounded-full border border-input bg-background/50 backdrop-blur-sm px-6 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Subscribe <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="h-6">
                        {state?.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center justify-center gap-2 text-sm font-medium ${state.success ? 'text-green-500' : 'text-destructive'}`}
                            >
                                {state.success ? <Check className="h-4 w-4" /> : null}
                                {state.message}
                            </motion.div>
                        )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
