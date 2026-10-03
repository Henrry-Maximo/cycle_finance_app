import { TrendUpIcon } from '@phosphor-icons/react';
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import colors from 'tailwindcss/colors';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getPopularCategories } from '@/api/popular-categories-chart';

const COLORS = [
  colors.emerald['500'],
  colors.rose['500'],
  colors.yellow['500'],
  colors.blue['500'],
  colors.purple['500'],
  colors.orange['500'],
  colors.pink['500'],
  colors.teal['500'],
  colors.cyan['500'],
  colors.indigo['500'],
  colors.red['500'],
  colors.green['500'],
  colors.amber['500'],
  colors.violet['500'],
  colors.sky['500'],
];

export function PopularSpentsChart() {
  const { data: popularCategories } = useQuery({
    queryKey: ['user-expenses', 'popular-categories'],
    queryFn: getPopularCategories,
  });

  const chartData = popularCategories
    ?.filter((item) => item.count > 0)
    .map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length],
    }));

  return (
    <Card className="md:col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Categorias populares
          </CardTitle>
          <TrendUpIcon className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        {popularCategories && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
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
                  const x = cx + radius * Math.cos(-midAngle! * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle! * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {popularCategories[index].name.length > 12
                        ? popularCategories[index].name
                            .substring(0, 12)
                            .concat('...')
                        : popularCategories[index].name}{' '}
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
        )}
      </CardContent>
    </Card>
  );
}
