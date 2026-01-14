"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [newsCount, setNewsCount] = useState<number | null>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            const { count } = await supabase
                .from("news")
                .select("*", { count: "exact", head: true });

            setNewsCount(count);

            const { data: txData } = await supabase
                .from("transactions")
                .select("*")
                .order('created_at', { ascending: false })
                .limit(5);

            if (txData) {
                setTransactions(txData);
                // Simple revenue calc from fetched items (ideal: separate query for sum)
                const revenue = txData.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
                setTotalRevenue(revenue);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/news">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total News
                            </CardTitle>
                            <Newspaper className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {newsCount === null ? "..." : newsCount}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Articles published
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Recent Revenue
                        </CardTitle>
                        <span className="text-muted-foreground">Rp</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            From last 5 transactions
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <div className="rounded-md border bg-background">
                    <div className="p-4">
                        {transactions.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No transactions found.</p>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="pb-2 font-medium text-muted-foreground">Customer</th>
                                        <th className="pb-2 font-medium text-muted-foreground">Amount</th>
                                        <th className="pb-2 font-medium text-muted-foreground">Status</th>
                                        <th className="pb-2 font-medium text-muted-foreground">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b last:border-0 hover:bg-muted/50">
                                            <td className="py-3">
                                                <div className="font-medium">{tx.customer_name}</div>
                                                <div className="text-xs text-muted-foreground">{tx.customer_email}</div>
                                            </td>
                                            <td className="py-3">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tx.amount)}
                                            </td>
                                            <td className="py-3">
                                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 ring-1 ring-inset ring-green-500/20">
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="py-3 text-muted-foreground">
                                                {new Date(tx.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
