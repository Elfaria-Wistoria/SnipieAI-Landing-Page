import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Edit, Plus, Trash2, CreditCard } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { revalidatePricing } from "@/app/actions/pricing";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

async function deletePricingPlan(formData: FormData) {
    'use server'
    const id = formData.get('id') as string;
    await supabase.from('pricing_plans').delete().eq('id', id);
    await revalidatePricing();
}

export default async function AdminPricingPage() {
    const { data: plans } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <CreditCard className="w-8 h-8" />
                    Pricing Plans
                </h1>
                <Link href="/admin/pricing/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Plan
                    </Button>
                </Link>
            </div>

            <div className="border rounded-lg bg-background/50 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Features</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!plans?.length ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No pricing plans found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            plans.map((plan) => (
                                <TableRow key={plan.id}>
                                    <TableCell className="font-medium">
                                        {plan.title}
                                        {plan.popular && <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">Popular</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-bold">{plan.currency}{plan.price}</span>
                                        <span className="text-xs text-muted-foreground">{plan.frequency}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-muted-foreground text-sm">
                                            {Array.isArray(plan.features) ? plan.features.length : 0} features
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {format(new Date(plan.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <Link href={`/admin/pricing/edit/${plan.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <form action={deletePricingPlan}>
                                                <input type="hidden" name="id" value={plan.id} />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    type="submit"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
