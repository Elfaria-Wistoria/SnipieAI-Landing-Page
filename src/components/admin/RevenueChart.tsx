"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { RevenueDataPoint } from "@/app/actions/revenue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueChartProps {
    data: RevenueDataPoint[];
    period: string; // 'day' | 'month' | 'year'
}

export function RevenueChart({ data, period }: RevenueChartProps) {
    const periodLabel = period === "day" ? "Daily" : period === "month" ? "Monthly" : "Yearly";

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>{periodLabel} Revenue</CardTitle>
                <CardDescription>
                    Revenue breakdown by {period}.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] w-full">
                    {data.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No data available for this period.
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', notation: "compact" }).format(value)}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--muted)' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Period
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                {payload[0].payload.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Revenue
                                                            </span>
                                                            <span className="font-bold">
                                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payload[0].value as number)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="currentColor"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-primary"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
