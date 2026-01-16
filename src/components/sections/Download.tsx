"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Download as DownloadIcon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export default function Download() {
    return (
        <section id="download" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Download Clipiee
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Get the most powerful AI video clipping tool for your desktop.
                        <br />
                        Available for macOS and Windows.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* macOS Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="h-full bg-background/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Apple className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="text-2xl">macOS</CardTitle>
                                <CardDescription>Version 1.2.0 • Requires macOS 12+</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full h-12 text-base font-medium from-primary to-primary/80 bg-gradient-to-r hover:opacity-90 transition-opacity" asChild>
                                    <a href="/api/download?platform=mac-arm64">
                                        <DownloadIcon className="mr-2 w-4 h-4" />
                                        Download for Apple Silicon
                                    </a>
                                </Button>
                                <Button variant="outline" className="w-full h-12 text-base font-medium" asChild>
                                    <a href="/api/download?platform=mac-intel">
                                        Download for Intel
                                    </a>
                                </Button>
                                <p className="text-xs text-muted-foreground pt-2">
                                    Not sure? Most new Macs use Apple Silicon (M1/M2/M3).
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Windows Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="h-full bg-background/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Monitor className="w-8 h-8 text-blue-500" />
                                </div>
                                <CardTitle className="text-2xl">Windows</CardTitle>
                                <CardDescription>Version 1.2.0 • Windows 10/11 (64-bit)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                    <a href="/api/download?platform=win64">
                                        <DownloadIcon className="mr-2 w-4 h-4" />
                                        Download for Windows
                                    </a>
                                </Button>
                                <Button variant="ghost" className="w-full h-12 text-base font-medium opacity-0 cursor-default pointer-events-none">
                                    Placeholder
                                </Button>
                                <p className="text-xs text-muted-foreground pt-2">
                                    By downloading, you agree to our Terms of Service.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-muted-foreground mb-4">Looking for mobile apps?</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            iOS App (Coming Soon)
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            Android App (Coming Soon)
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
