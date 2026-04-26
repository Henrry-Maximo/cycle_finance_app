import { TrendUpIcon } from '@phosphor-icons/react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import colors from 'tailwindcss/colors';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  {
    category: 'Aliementação',
    amount: 18,
    fill: colors.emerald['500'],
  },
  {
    category: 'Transporte',
    amount: 4,
    fill: colors.rose['500'],
  },
  {
    category: 'Casa',
    amount: 14,
    fill: colors.yellow['500'],
  },
  {
    category: 'Lazer',
    amount: 2,
    fill: colors.blue['500'],
  },
  {
    category: 'Estudo',
    amount: 7,
    fill: colors.purple['500'],
  },
];

export function PopularSpentsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Categorias populares
          </CardTitle>
          <TrendUpIcon className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              stroke="var(--color-background)"
              shape={(props) => (
                <Sector
                  {...props}
                  className="cursor-pointer transition-opacity outline-none hover:opacity-80"
                />
              )}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 12 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].category.length > 12
                      ? data[index].category.substring(0, 12).concat('...')
                      : data[index].category}{' '}
                    ({value})
                  </text>
                );
              }}
              cursor="pointer"
              outerRadius={86} // termina
              innerRadius={64} // começa
              strokeWidth={8}
              // fill={colors.emerald['500']}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
