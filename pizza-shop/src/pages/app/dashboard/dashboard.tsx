import { Helmet } from 'react-helmet-async'
import { MonthRevenueCard } from './month-revenue-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthOrdersCanceledAmountCard } from './month-canceled-orders-amount-card'
import { RevenueCharts } from './revenue-charts'
import { PopularProductsChart } from './popular-products-chart'

export function Dashboard() {
    return (
        <>
            <Helmet title="Dashboard" />
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    Dashboard
                </h1>

                <div className='grid grid-cols-4 gap-4'>
                    <MonthRevenueCard />
                    <MonthOrdersAmountCard />
                    <DayOrdersAmountCard />
                    <MonthOrdersCanceledAmountCard />
                </div>

                <div className='grid grid-cols-9 gap-4'>
                    <RevenueCharts />
                    <PopularProductsChart />
                </div>
            </div>
        </>
    )
}