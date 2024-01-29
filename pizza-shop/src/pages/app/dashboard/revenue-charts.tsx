import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

export function RevenueCharts() {
    const data = [
        { revenue: 800, date: '21/01' },
        { revenue: 900, date: '22/01' },
        { revenue: 1500, date: '23/01' },
        { revenue: 700, date: '24/01' },
        { revenue: 950, date: '25/01' },
        { revenue: 700, date: '26/01' },
        { revenue: 2000, date: '26/01' },
    ]

    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                        Receita no Período
                    </CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={data} style={{ fontSize: 12 }}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

                        <YAxis
                            stroke="#888"
                            axisLine={false}
                            tickLine={false}
                            width={80}
                            tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        />

                        <CartesianGrid vertical={false} className="stroke-muted" />

                        <Line
                            type="linear"
                            strokeWidth={2}
                            dataKey="revenue"
                            stroke={colors.emerald['500']}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
