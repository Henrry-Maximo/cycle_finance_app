import { Helmet } from 'react-helmet-async';

import { DayExpensesAmountCard } from './day-expenses-amount-card';
import { DaySpentCard } from './day-spent-card';
import { MonthExpensesAmountCard } from './month-expenses-amount-card';
import { MonthSpentCard } from './month-spent-card';
import { PopularSpentsChart } from './popular-spents-chart';
import { SpentChart } from './spent-chart';

export function Dashboard() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting()}, <span className="text-primary">Henrique Maximo</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Dashboard: resumo das suas finanças.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <MonthSpentCard />
          <MonthExpensesAmountCard />
          <DayExpensesAmountCard />
          <DaySpentCard />
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-9">
          <SpentChart />
          <PopularSpentsChart />
        </div>
      </div>
    </>
  );
}
