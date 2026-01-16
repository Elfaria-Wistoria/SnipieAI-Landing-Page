"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
    {
        question: "How does the lifetime license work?",
        answer: "You pay once and get access to Clipiee forever. This includes all future updates and features without any recurring subscription fees."
    },
    {
        question: "Can I use Clipiee for commercial projects?",
        answer: "Yes! Your license grants you full commercial rights to use the content you create with Clipiee for client work, monetized channels, and more."
    },
    {
        question: "What languages does the auto-subtitle feature support?",
        answer: "We currently support over 30 languages including English, Spanish, French, German, Chinese, Japanese, and many more, with 99% accuracy."
    },
    {
        question: "Is there a limit to how many videos I can process?",
        answer: "No, the lifetime license includes unlimited processing. There are no caps on the number of hours or videos you can clip."
    }

];

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-background/50 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">
                        Everything you need to know about Clipiee and how it works.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
