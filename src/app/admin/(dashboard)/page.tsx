import { supabaseAdmin } from "@/lib/supabase-admin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Newspaper, DollarSign, CreditCard, Activity } from "lucide-react";
import Link from "next/link";
import { Overview } from "@/components/admin/Overview";
import { SalesTrend } from "@/components/admin/SalesTrend";

export const dynamic = 'force-dynamic'; // Ensure it runs on every request for fresh data

export default async function AdminDashboardPage() {
    // Parallel data fetching for performance
    const [newsRes, txRes] = await Promise.all([
        supabaseAdmin.from("news").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("transactions").select("*").order('created_at', { ascending: false })
    ]);

    const newsCount = newsRes.count;
    const transactions = txRes.data || [];

    // Process data on the server
    const recentSales = transactions.slice(0, 5);
    const salesCount = transactions.length;

    const totalRevenue = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    // Group by day for charts
    const dailyData: Record<string, number> = {};
    const trendMap: Record<string, number> = {};

    transactions.forEach(curr => {
        const date = new Date(curr.created_at).toLocaleDateString('en-US', { weekday: 'short' });

        // Revenue
        dailyData[date] = (dailyData[date] || 0) + (Number(curr.amount) || 0);

        // Count
        trendMap[date] = (trendMap[date] || 0) + 1;
    });

    // Transform for Recharts (Recharts expects array)
    // Note: This simplistic approach reverses the keys order which relies on entry order. 
    // Ideally we should generate the last 7 days keys properly. 
    // For now keeping parity with original logic: reverse keys.
    const chartData = Object.keys(dailyData).map(key => ({
        name: key,
        total: dailyData[key]
    })).reverse();

    if (chartData.length === 0) {
        ["Mon", "Tue", "Wed", "Thu", "Fri"].forEach(day => {
            chartData.push({ name: day, total: 0 });
        });
    }

    const salesTrendData = Object.keys(trendMap).map(key => ({
        name: key,
        total: trendMap[key]
    })).reverse();

    if (salesTrendData.length === 0) {
        ["Mon", "Tue", "Wed", "Thu", "Fri"].forEach(day => {
            salesTrendData.push({ name: day, total: 0 });
        });
    }

    return (
        <div className="space-y-6 pb-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{salesCount}</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Link href="/admin/news">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active News</CardTitle>
                            <Newspaper className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{newsCount ?? "..."}</div>
                            <p className="text-xs text-muted-foreground">Articles published</p>
                        </CardContent>
                    </Card>
                </Link>

            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>Daily revenue breakdown.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 pt-6">
                        <Overview data={chartData} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Sales Trend</CardTitle>
                        <CardDescription>
                            Daily number of transactions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SalesTrend data={salesTrendData} />
                    </CardContent>
                </Card>

                <Card className="col-span-7">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made {salesCount} sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentSales.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No transactions found.</p>
                            ) : (
                                recentSales.map((tx) => (
                                    <div key={tx.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {tx.items && tx.items.length > 0 ? tx.items[0].name : "Product"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {tx.customer_name} ({tx.customer_email})
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            +{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tx.amount)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
