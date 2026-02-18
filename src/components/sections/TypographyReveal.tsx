'use client';

export default function TypographyReveal() {
    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col gap-16 md:gap-24 text-center max-w-5xl mx-auto">

                    {/* Phase 1 */}
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-400 leading-tight text-balance">
                            Say goodbye to endless <br className="hidden md:block" />
                            <span className="text-gray-900">subscription fatigue.</span>
                        </h2>
                    </div>

                    {/* Phase 2 */}
                    <div className="py-8 md:py-12 relative">
                        <div className="absolute inset-0 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
                        <h2 className="relative text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none text-balance">
                            <span className="text-red-500 drop-shadow-sm">f*ck</span>{' '}
                            <span className="text-gray-900">subscription</span>
                        </h2>
                    </div>

                    {/* Phase 3 */}
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-balance">
                            <span className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] bg-clip-text text-transparent">
                                SnipieAI
                            </span>{' '}
                            <span className="text-gray-900">is the solution.</span>
                        </h2>
                        <p className="max-w-xl text-lg md:text-2xl text-gray-500 text-balance leading-relaxed">
                            Own your tools. One payment, lifetime access.
                            The way software used to be.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
