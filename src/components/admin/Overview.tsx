'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface OverviewProps {
    data: any[];
}

export function Overview({ data }: OverviewProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
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
                    width={80}
                    tickFormatter={(value) => `Rp ${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: '2px solid #000', boxShadow: '4px 4px 0px 0px #000', fontSize: '12px', fontWeight: 'bold' }}
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
