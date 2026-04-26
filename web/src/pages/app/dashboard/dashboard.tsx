import { Helmet } from 'react-helmet-async';

import { DayExpensesAmountCard } from './day-expenses-amount-card';
import { DaySpentCard } from './day-spent-card';
import { MonthExpensesAmountCard } from './month-expenses-amount-card';
import { MonthSpentCard } from './month-spent-card';
import { PopularSpentsChart } from './popular-spents-chart';
import { SpentChart } from './spent-chart';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthSpentCard />
          <MonthExpensesAmountCard />
          <DayExpensesAmountCard />
          <DaySpentCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <SpentChart />
          <PopularSpentsChart />
        </div>
      </div>
    </>
  );
}
