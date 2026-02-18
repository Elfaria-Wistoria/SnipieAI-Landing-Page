import { supabase } from "@/lib/supabase";
import Pricing, { PricingPlan } from "@/components/sections/Pricing";

export default async function PricingSection() {
    // Static data to replace DB fetch
    const pricingPlans: PricingPlan[] = [
        {
            id: 'lifetime-static',
            title: 'Lifetime License',
            price: '29',
            currency: '$',
            frequency: '/one-time',
            description: 'Lifetime License',
            features: [
                "Unlimited AI Clips",
                "Auto-Captions & Subtitles",
                "Face Tracking (Auto-Crop)",
                "1080p Import & Export",
                "No Watermark",
                "Offline Processing (Private)",
                "Mac & Windows Support",
                "Free Updates Forever"
            ],
            button_text: 'Get SnipieAI Now',
            button_link: '/download',
            popular: true
        }
    ];

    return <Pricing items={pricingPlans} />;
}
