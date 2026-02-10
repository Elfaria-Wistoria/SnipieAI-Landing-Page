"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Converting to next/image for optimization

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    category: string;
    content: string;
    image: string | null;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

interface NewsProps {
    items?: NewsItem[]; // Optional prop, if not provided we could fetch or show empty
}

export default function News({ items = [] }: NewsProps) {
    // Internal state/effect removed in favor of Server Side passed data
    const newsItems = items;

    return (
        <section id="news" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight mb-4"
                        >
                            Latest Updates
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground"
                        >
                            News and announcements from the Clipiee team.
                        </motion.p>
                    </div>
                </div>

                {newsItems.length === 0 ? (
                    <div className="text-center text-muted-foreground py-20">No news yet. Check back soon!</div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {newsItems.map((news) => (
                            <motion.div key={news.id} variants={item}>
                                <Link href={`/news/${news.id}`} className="block h-full">
                                    <Card className="h-full bg-background/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors group flex flex-col overflow-hidden cursor-pointer">
                                        {/* Feature Image Area */}
                                        <div className="h-48 w-full relative overflow-hidden bg-muted/20">
                                            {news.image ? (
                                                <Image
                                                    src={news.image}
                                                    alt={news.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center text-muted-foreground/20">
                                                    <span className="font-mono text-xs">NO IMAGE</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        <CardHeader>
                                            <div className="flex justify-between items-center mb-4">
                                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                                                    {news.category || 'Update'}
                                                </Badge>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {news.date}
                                                </div>
                                            </div>
                                            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                                {news.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <CardDescription className="line-clamp-3">
                                                {news.content}
                                            </CardDescription>
                                        </CardContent>
                                        <CardFooter>
                                            <span className="text-sm font-medium flex items-center text-primary group-hover:underline decoration-primary/50 underline-offset-4">
                                                Read more
                                            </span>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
