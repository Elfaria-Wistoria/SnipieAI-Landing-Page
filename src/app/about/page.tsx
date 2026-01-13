export default function AboutPage() {
    return (
        <div className="container py-20 font-mono">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl text-muted-foreground mb-6">
                    We are building the tools for the next generation of creators.
                </p>
                <p className="mb-4">
                    Clasely started with a simple mission: make it easier to create and share high-quality content.
                    We believe that everyone has a story to tell, and our tools are designed to amplify your voice.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="p-6 border rounded-lg bg-muted/20">
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p>To empower creators with professional-grade tools that are intuitive and accessible.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-muted/20">
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p>A world where creativity knows no bounds, and technical barriers never get in the way of expression.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
