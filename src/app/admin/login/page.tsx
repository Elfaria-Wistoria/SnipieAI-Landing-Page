"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added Link
import { ArrowLeft } from "lucide-react"; // Added Icon

import { getLogger } from "@/lib/logger";

const logger = getLogger("AdminLoginPage");

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        logger.info({ email }, "Attempting admin login");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Login failed:", error);
            setStatus("error");
        } else {
            console.log("Login successful:", email);
            router.refresh();
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px'}} 
            />

            {/* Back to Home Link */}
            <div className="absolute top-8 left-8 z-20">
                <Link href="/" className="flex items-center gap-2 font-bold hover:text-[#8B5CF6] transition-colors border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-lg">
                    <ArrowLeft className="w-5 h-5" strokeWidth={3} />
                    Back to Home
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-sm">
                {/* Decor element */}
                <div className="absolute -top-12 right-0 -rotate-6 bg-[#A3E635] px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase hidden md:block">
                    Admin Access
                </div>

                <div className="bg-white border-2 border-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-center mb-8 space-y-2">
                        <div className="inline-block bg-[#8B5CF6] text-white px-3 py-1 font-black text-xs border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-2">
                            SNIPIE.AI
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">
                            Admin Login
                        </h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all rounded-lg font-medium"
                                placeholder="admin@snipie.ai"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wide">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all rounded-lg font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-14 text-lg font-bold bg-[#8B5CF6] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-xl mt-4"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Authenticating..." : "Login to Dashboard"}
                        </Button>

                        {status === "error" && (
                            <div className="bg-red-50 border-2 border-red-500 text-red-600 p-3 rounded-lg text-sm font-bold text-center mt-4 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]">
                                Invalid login credentials.
                            </div>
                        )}
                    </form>
                </div>
                
                <p className="text-center mt-8 text-sm text-gray-500 font-medium">
                    Restricted Area. Authorized Personnel Only.
                </p>
            </div>
        </div>
    );
}
