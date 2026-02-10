import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import TypographyReveal from '@/components/sections/TypographyReveal';

export default function PrivacyTerms() {
    return (
        <main className="min-h-screen bg-background font-mono selection:bg-primary/20">
            <Navbar />
            <div className="container px-4 py-24 md:py-32 max-w-4xl mx-auto space-y-16">
                <section id="privacy" className="scroll-mt-24">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Privacy Policy</h1>
                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p>
                            At Clipiee, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h3>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team. This may include your name, email address, payment information, and usage data.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h3>
                        <p>
                            We use your information to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, offers, and events.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h3>
                        <p>
                            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Third-Party Services</h3>
                        <p>
                            We may use third-party services that collect, monitor, and analyze this type of information to increase our service's functionality. These third-party service providers have their own privacy policies addressing how they use such information.
                        </p>
                    </div>
                </section>

                <div className="w-full h-px bg-border/40" />

                <section id="terms" className="scroll-mt-24">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Terms of Service</h1>
                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p>
                            By accessing or using Clipiee's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Accounts</h3>
                        <p>
                            When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Intellectual Property</h3>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Clipiee and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Termination</h3>
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Limitation of Liability</h3>
                        <p>
                            In no event shall Clipiee, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>

                        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Changes</h3>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}
