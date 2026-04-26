import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import colors from 'tailwindcss/colors';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data = [
  {
    date: '10/02',
    spent: 60,
  },
  {
    date: '11/02',
    spent: 80,
  },
  {
    date: '12/02',
    spent: 30,
  },
  {
    date: '13/02',
    spent: 10,
  },
  {
    date: '14/02',
    spent: 100,
  },
  {
    date: '15/02',
    spent: 40,
  },
];

export function SpentChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Gasto no período
          </CardTitle>
          <CardDescription>Gasto diário no período</CardDescription>
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
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />

            <CartesianGrid vertical={false} className="stroke-muted" />
            <Tooltip />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="spent"
              stroke={colors.blue['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
