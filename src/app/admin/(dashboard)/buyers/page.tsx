import { supabaseAdmin } from "@/lib/supabase-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { getLogger } from "@/lib/logger";

const logger = getLogger('AdminBuyers');

export const dynamic = 'force-dynamic';

interface Buyer {
    email: string;
    customer_name: string;
    total_spent: number;
    transaction_count: number;
    last_purchase_date: string;
}

export default async function BuyersPage() {
    logger.info('Rendering Buyers Page');

    const { data: transactions, error } = await supabaseAdmin
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        logger.error({ err: error }, 'Failed to fetch transactions');
        return (
            <div className="p-8">
                <div className="text-red-500">Failed to load buyers data.</div>
            </div>
        );
    }

    // Process transactions to aggregate by unique buyer (email)
    const buyersMap = new Map<string, Buyer>();

    transactions?.forEach((tx) => {
        // Use email as unique identifier. 
        // Note: Some legacy transactions might not have emails if not enforced, 
        // but typically they do in this system. fallback to customer_name or id if needed.
        const email = tx.customer_email;
        if (!email) return;

        const amount = Number(tx.amount) || 0;
        const date = tx.created_at;

        if (buyersMap.has(email)) {
            const buyer = buyersMap.get(email)!;
            buyer.total_spent += amount;
            buyer.transaction_count += 1;
            // Since we iterate desc, the first encounter is the latest date
            // But to be safe lets compare
            if (new Date(date) > new Date(buyer.last_purchase_date)) {
                buyer.last_purchase_date = date;
            }
        } else {
            buyersMap.set(email, {
                email: email,
                customer_name: tx.customer_name || 'Unknown',
                total_spent: amount,
                transaction_count: 1,
                last_purchase_date: date
            });
        }
    });

    const buyers = Array.from(buyersMap.values());

    return (
        <div className="space-y-6 pb-10">
            <h1 className="text-3xl font-bold">Buyers</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Unique Buyers</CardTitle>
                    <CardDescription>
                        List of all unique customers who have made a purchase.
                        Total Buyers: {buyers.length}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Total Spent</TableHead>
                                <TableHead className="text-right">Transactions</TableHead>
                                <TableHead className="text-right">Last Purchase</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {buyers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        No buyers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                buyers.map((buyer) => (
                                    <TableRow key={buyer.email}>
                                        <TableCell className="font-medium">{buyer.customer_name}</TableCell>
                                        <TableCell>{buyer.email}</TableCell>
                                        <TableCell className="text-right">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(buyer.total_spent)}
                                        </TableCell>
                                        <TableCell className="text-right">{buyer.transaction_count}</TableCell>
                                        <TableCell className="text-right">
                                            {format(new Date(buyer.last_purchase_date), "PPP")}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
