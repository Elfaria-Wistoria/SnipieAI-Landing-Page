"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    items?: NewsItem[];
}

export default function News({ items = [] }: NewsProps) {
    const newsItems = items;

    return (
        <section id="news" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C4B5FD]/5 rounded-full blur-[120px]" />
            </div>

            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 text-[#7C3AED] text-sm font-medium mb-4"
                        >
                            Updates
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-semibold tracking-tight mb-4 text-gray-900"
                        >
                            Latest Updates
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500"
                        >
                            News and announcements from the SnipieAI team.
                        </motion.p>
                    </div>
                </div>

                {newsItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">No news yet. Check back soon!</div>
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
                                    <Card className="h-full bg-white/80 backdrop-blur border-gray-100 hover:border-[#8B5CF6]/30 transition-all duration-300 group flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-[#8B5CF6]/5 hover:-translate-y-1 rounded-2xl">
                                        {/* Feature Image Area */}
                                        <div className="h-48 w-full relative overflow-hidden bg-gray-50">
                                            {news.image ? (
                                                <Image
                                                    src={news.image}
                                                    alt={news.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#8B5CF6]/10 to-[#C4B5FD]/10 flex items-center justify-center text-gray-300">
                                                    <span className="text-xs">NO IMAGE</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        <CardHeader>
                                            <div className="flex justify-between items-center mb-4">
                                                <Badge variant="secondary" className="bg-[#8B5CF6]/10 text-[#7C3AED] hover:bg-[#8B5CF6]/20 border-0">
                                                    {news.category || 'Update'}
                                                </Badge>
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {news.date}
                                                </div>
                                            </div>
                                            <CardTitle className="group-hover:text-[#7C3AED] transition-colors line-clamp-2 leading-tight text-gray-900">
                                                {news.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <CardDescription className="line-clamp-3 text-gray-500">
                                                {news.content}
                                            </CardDescription>
                                        </CardContent>
                                        <CardFooter>
                                            <span className="text-sm font-medium flex items-center text-[#7C3AED] group-hover:underline decoration-[#8B5CF6]/50 underline-offset-4">
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
