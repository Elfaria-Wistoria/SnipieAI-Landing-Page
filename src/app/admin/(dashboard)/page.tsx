import { supabaseAdmin } from "@/lib/supabase-admin";
import DeleteButton from "@/components/admin/DeleteButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Newspaper, DollarSign, CreditCard, Activity, Package } from "lucide-react";
import Link from "next/link";
import { Overview } from "@/components/admin/Overview";
import { SalesTrend } from "@/components/admin/SalesTrend";
import { getLogger } from "@/lib/logger";

export const dynamic = 'force-dynamic'; // Ensure it runs on every request for fresh data

const logger = getLogger('AdminDashboard');

export default async function AdminDashboardPage() {
    logger.info('Rendering Admin Dashboard');

    // Parallel data fetching for performance
    const [
        { data: transactions, error: txError },
    ] = await Promise.all([
        supabaseAdmin.from("transactions").select("*").eq('status', 'SUCCESS').order('created_at', { ascending: false }),
    ]);

    if (txError) logger.error({ err: txError }, 'Failed to fetch transactions');

    const safeTransactions = transactions || [];

    // Process data on the server
    const recentSales = safeTransactions.slice(0, 5);
    const salesCount = safeTransactions.length;

    const totalRevenue = safeTransactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    // Group by day for charts
    const dailyData: Record<string, number> = {};
    const trendMap: Record<string, number> = {};

    safeTransactions.forEach(curr => {
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

    logger.info({
        revenue: totalRevenue,
        salesCount,
    }, 'Fetched admin dashboard data');

    return (
        <div className="space-y-6 pb-10">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-black dark:text-white">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium dark:text-gray-200">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold dark:text-white">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium dark:text-gray-200">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold dark:text-white">+{salesCount}</div>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">+180.1% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle className="dark:text-white">Overview</CardTitle>
                        <CardDescription className="dark:text-gray-400">Daily revenue breakdown.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 pt-6">
                        <Overview data={chartData} />
                    </CardContent>
                </Card>
                <Card className="col-span-3 dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle className="dark:text-white">Sales Trend</CardTitle>
                        <CardDescription className="dark:text-gray-400">
                            Daily number of transactions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SalesTrend data={salesTrendData} />
                    </CardContent>
                </Card>

                <Card className="col-span-7 dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle className="dark:text-white">Recent Sales</CardTitle>
                        <CardDescription className="dark:text-gray-400">
                            You made {salesCount} sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentSales.length === 0 ? (
                                <p className="text-muted-foreground text-sm dark:text-gray-500">No transactions found.</p>
                            ) : (
                                recentSales.map((tx) => (
                                    <div key={tx.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none dark:text-gray-200">
                                                {tx.items && tx.items.length > 0 ? tx.items[0].name : "Product"}
                                            </p>
                                            <p className="text-sm text-muted-foreground dark:text-gray-400">
                                                {tx.customer_name} ({tx.customer_email})
                                            </p>
                                        </div>
                                        <div className="ml-auto flex items-center gap-4">
                                            <div className="font-medium dark:text-white">
                                                +{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(tx.amount)}
                                            </div>
                                            <DeleteButton table="transactions" id={tx.id} />
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
