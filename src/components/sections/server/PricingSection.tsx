import { supabase } from "@/lib/supabase";
import Pricing, { PricingPlan } from "@/components/sections/Pricing";

export default async function PricingSection() {
    const { data: pricingPlans } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('created_at', { ascending: true });

    return <Pricing items={(pricingPlans as PricingPlan[]) || []} />;
}
