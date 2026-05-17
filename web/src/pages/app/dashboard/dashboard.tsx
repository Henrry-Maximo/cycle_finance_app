import { SpinnerIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import { metricsUser } from '@/api/metrics-user';

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

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: metricsUser,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

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

        {isLoading ? (
          <div className="grid h-28 grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-4">
            <SpinnerIcon className="h-12 w-12 animate-spin" />
            <SpinnerIcon className="h-12 w-12 animate-spin" />
            <SpinnerIcon className="h-12 w-12 animate-spin" />
            <SpinnerIcon className="h-12 w-12 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <DayExpensesAmountCard amount={metrics?.count_expenses_day ?? 0} />
            <DaySpentCard amount={metrics?.total_expenses_day ?? 0} />
            <MonthExpensesAmountCard
              amount={metrics?.count_expenses_month ?? 0}
            />
            <MonthSpentCard amount={metrics?.total_expenses_month ?? 0} />
          </div>
        )}

        <div className="flex flex-col gap-4 md:grid md:grid-cols-9">
          <SpentChart />
          <PopularSpentsChart />
        </div>
      </div>
    </>
  );
}
