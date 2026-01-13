import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border/40 py-12 bg-muted/20">
            <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
                        Clipiee_
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Built for creators, by creators.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-foreground">Twitter</Link>
                    <Link href="#" className="hover:text-foreground">GitHub</Link>
                    <Link href="#" className="hover:text-foreground">Discord</Link>
                </div>

                <div className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Clipiee Inc.
                </div>
            </div>
        </footer>
    );
}
