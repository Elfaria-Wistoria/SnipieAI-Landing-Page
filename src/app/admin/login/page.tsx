"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

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
            logger.error({ err: error, email }, "Login failed");
            setStatus("error");
        } else {
            logger.info({ email }, "Login successful");
            router.refresh();
            router.push("/admin");
        }
    };

    return (
        <div className="container max-w-sm py-20 font-mono">
            <h1 className="text-2xl font-bold mb-8">Admin Login</h1>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm mb-2">Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-background/50"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-background/50"
                    />
                </div>

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? "Logging in..." : "Login"}
                </Button>

                {status === "error" && (
                    <p className="text-red-500 text-sm">Invalid login credentials.</p>
                )}
            </form>
        </div>
    );
}
