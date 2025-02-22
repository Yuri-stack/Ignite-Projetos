import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date(),
    })

    const { data: dailyRevenueInPeriod } = useQuery({
        queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
        queryFn: () =>
            getDailyRevenueInPeriod({
                from: dateRange?.from,
                to: dateRange?.to,
            }),
    })

    // const chartData = useMemo(() => {
    //     return dailyRevenueInPeriod?.map((chartItem) => {
    //         return {
    //             date: chartItem.date,
    //             receipt: chartItem.receipt / 100,
    //         }
    //     })
    // }, [dailyRevenueInPeriod])

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
                        Receita no período
                    </CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>

                <div className="flex items-center gap-3">
                    <Label>Período</Label>
                    <DateRangePicker date={dateRange} onDateChange={setDateRange} />
                </div>
            </CardHeader>
            <CardContent>
                {data && (
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={data} style={{ fontSize: 12 }}>
                            <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
                            <YAxis
                                stroke="#888"
                                axisLine={false}
                                tickLine={false}
                                width={80}
                                tickFormatter={(value: number) =>
                                    value.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })
                                }
                            />
                            <CartesianGrid vertical={false} className="stroke-muted" />
                            <Line
                                stroke={colors.violet[500]}
                                type="linear"
                                strokeWidth={2}
                                dataKey="receipt"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}