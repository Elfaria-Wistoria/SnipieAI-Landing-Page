"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Lock, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
    {
        id: "authzero",
        title: "AuthZero",
        description: "Self-hosted authentication that doesn't sell your user data. Open source and forever free for individuals.",
        icon: Lock,
        color: "from-orange-500 to-red-500",
        image: "linear-gradient(to bottom right, #1f2937, #111827)", // Placeholder for actual image
    },
    {
        id: "basekit",
        title: "BaseKit",
        description: "The ultimate component library for Shadcn lovers. Copy, paste, and ship faster than ever.",
        icon: Code,
        color: "from-blue-500 to-cyan-500",
        image: "linear-gradient(to bottom right, #172554, #1e3a8a)",
    },
    {
        id: "queryflow",
        title: "QueryFlow",
        description: "Visual database schema manager. Build complex relations with drag-and-drop simplicity.",
        icon: Database,
        color: "from-emerald-500 to-green-500",
        image: "linear-gradient(to bottom right, #064e3b, #065f46)",
    }
];

export default function Products() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section id="products" className="py-24 bg-background relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                        >
                            The Clipiee Ecosystem
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-muted-foreground"
                        >
                            We build tools that respect your ownership. Pay once, host yourself, or use the free tier forever.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-right"
                    >
                        <div className="font-mono text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted-foreground to-foreground opacity-20 select-none tracking-tighter">
                            let_it_free
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onHoverStart={() => setHovered(product.id)}
                            onHoverEnd={() => setHovered(null)}
                            className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                        >
                            {/* Media Preview Area */}
                            <div
                                className="h-48 w-full relative overflow-hidden"
                                style={{ background: product.image }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20 mix-blend-overlay`} />

                                {/* Simulated UI elements for uniqueness */}
                                <div className="absolute inset-4 rounded-lg bg-black/20 border border-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    {hovered === product.id ? (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                                        >
                                            <Play className="w-5 h-5 text-white fill-white" />
                                        </motion.div>
                                    ) : (
                                        <product.icon className="w-12 h-12 text-white/20" />
                                    )}
                                </div>
                            </div>

                            <div className="p-6 relative">
                                <div className={`absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                    <ArrowRight className="w-5 h-5 text-primary" />
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${product.color} bg-opacity-10`}>
                                        <product.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-xl">{product.title}</h3>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-20">
                                    {product.description}
                                </p>

                                <Button variant="outline" className="w-full font-mono text-xs group-hover:bg-primary group-hover:text-primary-foreground border-primary/20">
                                    View Demo
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
