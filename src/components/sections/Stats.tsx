"use client";

import { Star } from "lucide-react";

interface StatsProps {
    stats: {
        downloads: number;
        hoursSaved: number;
        rating: number;
    };
}

export default function Stats({ stats }: StatsProps) {
    return (
        <section className="py-16 relative z-20">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">

                    {/* Downloads */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/60 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 mb-2">
                            {stats.downloads.toLocaleString()}+
                        </div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                            Total Downloads
                        </p>
                    </div>

                    {/* Hours Saved */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/60 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 mb-2">
                            {stats.hoursSaved.toLocaleString()}+
                        </div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                            Hours of Editing Saved
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/60 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 mb-2 flex items-center gap-2">
                            {stats.rating.toFixed(1)}
                            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                        </div>
                        <p className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                            Average Rating
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
