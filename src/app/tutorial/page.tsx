"use client";

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Monitor, AlertTriangle, ShieldCheck, ShoppingCart, Key, Download, ChevronRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TutorialPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />
            <div className="pt-20">
                <section className="py-20 relative overflow-hidden">
                    {/* Ambient Background */}
                    <div className="absolute inset-0 -z-10 bg-background">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] opacity-30" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] opacity-30" />
                    </div>

                    <div className="container px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                Getting Started
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Follow these simple steps to purchase, install, and activate Clipiee.
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto space-y-12">
                            {/* Step 1: Purchase */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="flex-none w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold z-10 border-4 border-background shadow-xl">1</div>
                                <Card className="flex-1 bg-background/40 backdrop-blur-xl border-border/50 overflow-hidden">
                                    <CardHeader className="border-b border-border/40 bg-muted/20">
                                        <div className="flex items-center gap-3">
                                            <ShoppingCart className="w-5 h-5 text-primary" />
                                            <CardTitle>Purchase License</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <p className="text-muted-foreground">
                                            Buy your lifetime license for Clipiee securely through our partner Lynk.id. You will receive a confirmation email after purchase.
                                        </p>
                                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex gap-3 text-sm text-yellow-500">
                                            <Mail className="w-5 h-5 flex-none" />
                                            <p><span className="font-bold">Important:</span> Please remember the email address you use during checkout. You will need it to generate your activation code.</p>
                                        </div>
                                        <div className="pt-2">
                                            <Button asChild className="gap-2 w-full md:w-auto">
                                                <a href="https://lynk.id/edwinsyah.u/rdy9n5rd4pn8" target="_blank" rel="noopener noreferrer">
                                                    Buy on Lynk.id <ChevronRight className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Step 2: Download & Install */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="flex-none w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold z-10 border-4 border-background shadow-xl">2</div>
                                <Card className="flex-1 bg-background/40 backdrop-blur-xl border-border/50 overflow-hidden">
                                    <CardHeader className="border-b border-border/40 bg-muted/20">
                                        <div className="flex items-center gap-3">
                                            <Download className="w-5 h-5 text-blue-500" />
                                            <CardTitle>Download & Update</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        <div>
                                            <p className="text-muted-foreground mb-4">
                                                Always ensure you have the latest version of Clipiee. Download the installer for your operating system from our Update page.
                                            </p>
                                            <Link href="/update">
                                                <Button variant="outline" className="gap-2">
                                                    Go to Download Page <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>

                                        <Accordion type="single" collapsible className="w-full bg-muted/30 rounded-lg px-4 border border-border/40">
                                            <AccordionItem value="mac" className="border-b-0">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Apple className="w-4 h-4" />
                                                        <span>Installation Tips for macOS</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="space-y-4 pt-2 pb-4 px-2">
                                                    <div className="space-y-4 border-t border-border/40 pt-4">
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <h4 className="font-bold text-sm">1. Install</h4>
                                                                <p className="text-sm text-muted-foreground">Open the <code className="text-xs bg-muted px-1 py-0.5 rounded">.dmg</code> file and drag the Clipiee icon to your Applications folder.</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h4 className="font-bold text-sm flex items-center gap-2 text-yellow-500"><AlertTriangle className="w-4 h-4" /> Security Warning?</h4>
                                                                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                                                    <li>Go to <b>System Settings</b> &gt; <b>Privacy & Security</b></li>
                                                                    <li>Scroll down to "Security"</li>
                                                                    <li>Click <b>Open Anyway</b> for Clipiee</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="windows" className="border-t border-border/40 border-b-0">
                                                <AccordionTrigger className="hover:no-underline py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Monitor className="w-4 h-4" />
                                                        <span>Installation Tips for Windows</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="space-y-4 pt-2 pb-4 px-2">
                                                    <div className="space-y-4 border-t border-border/40 pt-4">
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <div className="space-y-2">
                                                                <h4 className="font-bold text-sm">1. Install</h4>
                                                                <p className="text-sm text-muted-foreground">Double-click the <code className="text-xs bg-muted px-1 py-0.5 rounded">.exe</code> file to install automatically.</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <h4 className="font-bold text-sm flex items-center gap-2 text-blue-500"><ShieldCheck className="w-4 h-4" /> SmartScreen Warning?</h4>
                                                                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                                                    <li>Click <b>More info</b> link</li>
                                                                    <li>Click <b>Run anyway</b> button</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Step 3: Redeem Code */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="flex-none w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold z-10 border-4 border-background shadow-xl">3</div>
                                <Card className="flex-1 bg-background/40 backdrop-blur-xl border-border/50 overflow-hidden">
                                    <CardHeader className="border-b border-border/40 bg-muted/20">
                                        <div className="flex items-center gap-3">
                                            <Key className="w-5 h-5 text-green-500" />
                                            <CardTitle>Get Activation Code</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <p className="text-muted-foreground">
                                            Visit our Redeem page to generate your unique activation code. You must use the <b>same email address</b> that you used to purchase the product.
                                        </p>
                                        <div className="pt-2">
                                            <Link href="/redeem">
                                                <Button className="gap-2 w-full md:w-auto bg-green-600 hover:bg-green-700">
                                                    Redeem Code <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Step 4: Activate */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="flex-none w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold z-10 border-4 border-background shadow-xl">4</div>
                                <Card className="flex-1 bg-background/40 backdrop-blur-xl border-border/50 overflow-hidden">
                                    <CardHeader className="border-b border-border/40 bg-muted/20">
                                        <div className="flex items-center gap-3">
                                            <Monitor className="w-5 h-5 text-purple-500" />
                                            <CardTitle>Activate & Enjoy</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <p className="text-muted-foreground mb-4">
                                            Open the Clipiee app on your computer. You will be prompted to enter your credentials.
                                        </p>
                                        <ul className="space-y-2 text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border border-border/40">
                                            <li className="flex gap-2">
                                                <span className="font-bold min-w-20">Email:</span>
                                                <span>The email you used for purchase</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="font-bold min-w-20">Code:</span>
                                                <span>The activation code you just redeemed</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>

                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
