'use client';

const techNames = [
    'React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Radix UI',
    'Supabase', 'Electron', 'Python', 'FastAPI', 'Antigravity'
];

export default function TechStack() {
    return (
        <section className="py-12 relative overflow-hidden bg-gray-50/50 border-y border-gray-100">
            <div className="container px-4 text-center mb-10">
                <h3 className="text-sm font-medium uppercase tracking-widest text-gray-400">
                    Built with Modern Technologies
                </h3>
            </div>

            <div className="container px-4">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-12">
                    {techNames.map((name, index) => (
                        <div
                            key={`${name}-${index}`}
                            className="flex items-center gap-2.5 group opacity-70 hover:opacity-100 transition-all duration-300"
                        >
                            <div className="w-6 h-6 rounded bg-[#8B5CF6]/10 flex items-center justify-center">
                                <span className="text-[#7C3AED] font-bold text-[10px]">{name.slice(0, 2).toUpperCase()}</span>
                            </div>
                            <span className="text-base font-medium tracking-tight text-gray-600 group-hover:text-gray-900 transition-colors">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
