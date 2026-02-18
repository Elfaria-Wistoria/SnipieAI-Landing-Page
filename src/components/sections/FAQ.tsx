"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqItems = [
    {
        question: "What is SnipieAI?",
        answer: "SnipieAI is a local AI-powered video clipper that automatically detects the most viral-worthy moments in your videos and generates short clips with captions, hooks, and more — all running 100% on your device."
    },
    {
        question: "How does the lifetime license work?",
        answer: "You pay once and get access to SnipieAI forever. This includes all future updates and features without any recurring subscription fees."
    },
    {
        question: "Can I use SnipieAI for commercial projects?",
        answer: "Yes! Your license grants you full commercial rights to use the content you create with SnipieAI for client work, monetized channels, and more."
    },
    {
        question: "What languages does the auto-subtitle feature support?",
        answer: "We currently support over 30 languages including English, Spanish, French, German, Chinese, Japanese, and many more, with 99% accuracy."
    },
    {
        question: "Is there a limit to how many videos I can process?",
        answer: "No, the lifetime license includes unlimited processing. There are no caps on the number of hours or videos you can clip."
    },
    {
        question: "Does SnipieAI require an internet connection?",
        answer: "No. SnipieAI runs entirely offline on your machine. No cloud uploads, no internet required. Your content never leaves your device."
    }
];

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqItems[number]; isOpen: boolean; onToggle: () => void }) {
    return (
        <div
            className={`bg-white rounded-2xl border transition-all duration-200 ${isOpen ? 'border-[#8B5CF6]/30 shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'}`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
            >
                <span className="text-[15px] font-medium text-gray-800 pr-4">{item.question}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${isOpen ? 'bg-[#8B5CF6] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
            </button>
            <div
                className="overflow-hidden transition-all duration-200 ease-out"
                style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 md:py-32 bg-white">
            <div className="container px-4">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left — Bold heading */}
                    <div className="lg:w-[340px] shrink-0 lg:sticky lg:top-32">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 uppercase leading-[1.1]">
                            Frequently{" "}
                            <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] bg-clip-text text-transparent">
                                Asked
                            </span>{" "}
                            Questions
                        </h2>
                    </div>

                    {/* Right — Accordion items */}
                    <div className="flex-1 w-full space-y-3">
                        {faqItems.map((item, i) => (
                            <FAQItem
                                key={i}
                                item={item}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
