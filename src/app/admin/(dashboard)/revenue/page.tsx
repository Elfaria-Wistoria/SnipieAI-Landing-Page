"use client";

import { useState, useEffect } from "react";
import { getRevenueData, RevenueDataPoint, RevenuePeriod } from "@/app/actions/revenue";
import { getTeamMembers, TeamMember } from "@/app/actions/team";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { TeamMemberCard } from "@/components/admin/TeamMemberCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, DollarSign, TrendingUp, Calendar } from "lucide-react";

export default function RevenuePage() {
    const [period, setPeriod] = useState<RevenuePeriod>("month");
    const [data, setData] = useState<RevenueDataPoint[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [revenueResult, teamResult] = await Promise.all([
                    getRevenueData(period),
                    getTeamMembers()
                ]);
                setData(revenueResult);
                setTeamMembers(teamResult);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period]);

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const averageRevenue = data.length > 0 ? totalRevenue / data.length : 0;

    return (
        <div className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Revenue Analytics</h1>
                <Tabs value={period} onValueChange={(v) => setPeriod(v as RevenuePeriod)}>
                    <TabsList>
                        <TabsTrigger value="day">Daily</TabsTrigger>
                        <TabsTrigger value="month">Monthly</TabsTrigger>
                        <TabsTrigger value="year">Yearly</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {loading ? (
                <div className="flex h-[400px] item-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue ({period})</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Revenue per {period}</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(averageRevenue)}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{data.length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full">
                        <RevenueChart data={data} period={period} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Team Revenue Distribution</h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {teamMembers.map((member) => (
                                <TeamMemberCard
                                    key={member.id}
                                    member={member}
                                    totalRevenue={totalRevenue}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
