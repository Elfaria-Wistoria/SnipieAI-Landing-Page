import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { getLogger } from "@/lib/logger";

// Enable revalidation for ISR
export const revalidate = 60;

const logger = getLogger('NewsArticlePage');

// Generate static routes for all news items at build time
export async function generateStaticParams() {
    const { data: posts } = await supabase
        .from('news')
        .select('id');

    return posts?.map(({ id }) => ({
        id: id,
    })) || [];
}

interface NewsItem {
    id: string;
    title: string;
    date: string;
    category: string;
    content: string;
    image: string | null;
}

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
    const { id } = params;
    logger.info({ articleId: id }, 'Rendering News Article Page');

    const { data: article, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        logger.error({ err: error, articleId: id }, 'Failed to fetch article');
        notFound();
    }

    if (!article) {
        logger.warn({ articleId: id }, 'Article not found');
        notFound();
    }

    logger.info({ articleId: id, title: article.title }, 'Successfully fetched article');

    const newsItem = article as NewsItem;

    return (
        <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
            <Navbar />

            <article className="pt-32 pb-24">
                <div className="container px-4 max-w-4xl mx-auto">
                    <Link href="/news">
                        <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to News
                        </Button>
                    </Link>

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex gap-4 items-center mb-6">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                                {newsItem.category}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2" />
                                {newsItem.date}
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                            {newsItem.title}
                        </h1>
                    </div>

                    {/* Featured Image */}
                    {newsItem.image && (
                        <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-12 border border-border/50 bg-muted/20">
                            {/* Using standard img for inside article or next/image if we want optimization. 
                                Since it's SSG now, next/image is great. */}
                            <img
                                src={newsItem.image}
                                alt={newsItem.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg">
                        {newsItem.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && <p key={index} className="mb-4 text-justify leading-relaxed text-slate-300">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
