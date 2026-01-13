import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="container px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground">Stop paying monthly subscriptions for basic tools.</p>
                </div>

                <div className="max-w-md mx-auto">
                    <Card className="border-primary/20 shadow-2xl bg-gradient-to-b from-background to-muted/20 relative">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />

                        <CardHeader className="text-center pt-10">
                            <CardTitle className="text-xl text-muted-foreground">Lifetime License</CardTitle>
                            <div className="mt-4 flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-bold">$49</span>
                                <span className="text-muted-foreground">/one-time</span>
                            </div>
                            <CardDescription className="mt-2">Use Clipiee forever on one device.</CardDescription>
                        </CardHeader>

                        <CardContent className="mt-4">
                            <ul className="space-y-4">
                                {[
                                    "Unlimited Video Clips",
                                    "Auto-Subtitles Generator",
                                    "Viral Hook Library",
                                    "1080p & 4K Export",
                                    "Lifetime Updates",
                                    "No Watermark"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="pb-8">
                            <Button className="w-full h-12 text-lg font-mono" size="lg">
                                Get Clipiee Now
                            </Button>
                        </CardFooter>
                    </Card>

                    <p className="text-center text-xs text-muted-foreground mt-6">
                        30-day money-back guarantee. No questions asked.
                    </p>
                </div>
            </div>
        </section>
    );
}
