import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

async function getChangelogs() {
    const { data } = await supabase
        .from('changelogs')
        .select('*')
        .order('date', { ascending: false });
    return data || [];
}

export const metadata = {
    title: 'Changelog',
    description: 'Track the latest updates, features, and improvements to the Clasely ecosystem.',
};

export default async function ChangelogPage() {
    const changelogs = await getChangelogs();

    return (
        <div className="container py-20 font-mono">
            <h1 className="text-4xl font-bold mb-2">Changelog</h1>
            <p className="text-muted-foreground mb-12">Stay updated with our latest improvements and features.</p>

            <div className="space-y-12 relative border-l border-border/40 ml-4 pl-8 md:ml-0 md:pl-0">
                {changelogs.length === 0 ? (
                    <p className="text-muted-foreground">No changelog entries yet.</p>
                ) : (
                    changelogs.map((item) => (
                        <div key={item.id} className="relative md:grid md:grid-cols-5 md:gap-8">
                            <div className="md:col-span-1 mb-4 md:mb-0">
                                <div className="flex items-center md:flex-col md:items-end">
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(item.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    {/* Dot indicator logic needs to be cleaner. For now using simple circle. */}
                                    <div className="hidden md:block absolute right-0 top-1 w-3 h-3 bg-muted-foreground/30 rounded-full translate-x-[6.5px] md:translate-x-[50%] md:right-[-1px] outline outline-4 outline-background"></div>
                                </div>
                            </div>
                            <div className="md:col-span-4 relative pl-6 md:pl-0 border-l md:border-l-0 border-border/40 md:before:hidden before:absolute before:left-[-1px] before:top-1 before:w-3 before:h-3 before:bg-muted-foreground/30 before:rounded-full before:outline before:outline-4 before:outline-background before:-translate-x-1/2">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    {item.version && (
                                        <Badge variant="secondary" className="font-normal text-xs">
                                            {item.version}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-muted-foreground whitespace-pre-wrap">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
