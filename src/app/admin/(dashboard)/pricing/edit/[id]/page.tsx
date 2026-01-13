import PricingForm from "@/components/admin/PricingForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function EditPricingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: plan } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('id', id)
        .single();

    if (!plan) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/pricing">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Edit Pricing Plan</h1>
                    <span className="text-sm text-muted-foreground">{plan.title}</span>
                </div>
            </div>

            <PricingForm mode="edit" initialData={plan} />
        </div>
    );
}
