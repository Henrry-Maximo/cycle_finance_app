import { Card, CardContent } from './ui/card';

export function PieExample() {
  let acumulado = 0;

  const CIRCUNFERENCIA = 2 * Math.PI * 70;

  const CATEGORIAS = [
    { nome: 'Alimentação', pct: 0.52, cor: '#10b981' },
    { nome: 'Lazer', pct: 0.28, cor: '#f5b400' },
    { nome: 'Transporte', pct: 0.2, cor: '#ff2d55' },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="bg-border grid grid-cols-2 gap-px overflow-hidden rounded-md border">
          {[
            ['Gasto do dia', 'R$ 84,20'],
            ['Gasto do mês', 'R$ 1.248,40'],
          ].map(([rotulo, valor]) => (
            <div key={rotulo} className="bg-card p-4">
              <p className="text-muted-foreground text-xs">{rotulo}</p>
              <p className="mt-2 text-xl font-bold">{valor}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
          <svg
            viewBox="0 0 180 180"
            className="h-40 w-40 shrink-0"
            role="img"
            aria-label="Gráfico de categorias: Alimentação 52%, Lazer 28%, Transporte 20%"
          >
            <g transform="rotate(-90 90 90)">
              <circle
                cx="90"
                cy="90"
                r="70"
                fill="none"
                strokeWidth="18"
                className="stroke-muted"
              />
              {CATEGORIAS.map((c) => {
                const comprimento = c.pct * CIRCUNFERENCIA - 4;
                const deslocamento = -acumulado * CIRCUNFERENCIA;
                acumulado += c.pct;
                return (
                  <circle
                    key={c.nome}
                    cx="90"
                    cy="90"
                    r="70"
                    fill="none"
                    stroke={c.cor}
                    strokeWidth="18"
                    strokeDasharray={`${comprimento} ${CIRCUNFERENCIA}`}
                    strokeDashoffset={deslocamento}
                  />
                );
              })}
            </g>
          </svg>

          <ul className="w-full space-y-3 text-sm">
            {CATEGORIAS.map((c) => (
              <li
                key={c.nome}
                className="flex items-center justify-between gap-6"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: c.cor }}
                    aria-hidden="true"
                  />
                  {c.nome}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(c.pct * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-muted-foreground mt-5 text-xs">
          Exemplo ilustrativo com dados fictícios.
        </p>
      </CardContent>
    </Card>
  );
}
