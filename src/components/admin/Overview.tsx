'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface OverviewProps {
    data: any[];
}

export function Overview({ data }: OverviewProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
                    tickFormatter={(value) => `Rp ${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                    itemStyle={{ color: '#000' }}
                    formatter={(value: any) => [`Rp ${new Intl.NumberFormat('id-ID').format(Number(value))}`, 'Revenue']}
                />
                <Bar
                    dataKey="total"
                    fill="#adfa1d"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
