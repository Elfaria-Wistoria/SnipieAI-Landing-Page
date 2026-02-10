"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Package } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface ProductItem {
    id: string;
    title: string;
    description: string;
    link: string | null;
    color_from: string | null;
    color_to: string | null;
    image_url: string | null;
    video_url: string | null;
}

interface ProductsProps {
    items?: ProductItem[];
}

export default function Products({ items = [] }: ProductsProps) {
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
                            Our Products
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
                        <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted-foreground to-foreground opacity-20 select-none tracking-tighter">
                            let_it_free
                        </div>
                    </motion.div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-muted/10 rounded-2xl border border-dashed border-border">
                        <p className="text-muted-foreground">No products available yet.</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {items.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onHoverStart={() => setHovered(product.id)}
                                onHoverEnd={() => setHovered(null)}
                                className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
                            >
                                {/* Media Preview Area */}
                                <div className="h-48 w-full relative overflow-hidden bg-muted">
                                    {product.image_url ? (
                                        <Image
                                            src={product.image_url}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${product.color_from || 'from-gray-800'} ${product.color_to || 'to-gray-900'}`} />
                                    )}

                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                                    {/* Play Icon / Overlay */}
                                    <div className="absolute inset-4 rounded-lg bg-black/10 border border-white/10 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                            {product.video_url ? (
                                                <Play className="w-5 h-5 text-white fill-white" />
                                            ) : (
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 relative flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${product.color_from || 'from-primary'} ${product.color_to || 'to-purple-500'} bg-opacity-10`}>
                                            <Package className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-bold text-xl">{product.title}</h3>
                                    </div>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {product.description}
                                    </p>

                                    {product.link ? (
                                        <Link href={product.link} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className="w-full text-xs group-hover:bg-primary group-hover:text-primary-foreground border-primary/20">
                                                View Product
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button variant="outline" disabled className="w-full text-xs opacity-50 cursor-not-allowed">
                                            Coming Soon
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
