import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TypeAnimation } from 'react-type-animation';

import logoDark from '@/assets/logo_dark.png';
import logoWhite from '@/assets/logo_white.png';

const CIRCUNFERENCIA = 2 * Math.PI * 70;

// Foco padrão do shadcn, para os links de texto e do rodapé
const FOCO =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

// Cores das categorias são dados, então ficam fixas (mesmas do dashboard)
const CATEGORIAS = [
  { nome: 'Alimentação', pct: 0.52, cor: '#10b981' },
  { nome: 'Lazer', pct: 0.28, cor: '#f5b400' },
  { nome: 'Transporte', pct: 0.2, cor: '#ff2d55' },
];

const RECURSOS = [
  {
    titulo: 'Registro manual',
    texto:
      'Cadastre título, categoria, valor, fornecedor e data da despesa em poucos campos.',
  },
  {
    titulo: 'Leitura de comprovante',
    texto:
      'Envie uma foto em JPEG ou PNG de até 5 MB. O sistema extrai as informações e sugere valores e datas.',
  },
  {
    titulo: 'Painel do gasto',
    texto:
      'Veja o total do dia e do mês, o gasto diário no período e as categorias mais usadas.',
  },
  {
    titulo: 'Histórico filtrado',
    texto:
      'Filtre as despesas por período e categoria. A lista é paginada em 15 itens por página.',
  },
];

const PASSOS = [
  {
    titulo: 'Crie sua conta',
    texto:
      'Cadastre-se com e-mail e senha. Se esquecer a senha, redefina pelo e-mail.',
  },
  {
    titulo: 'Registre seus gastos',
    texto:
      'Digite a despesa ou envie o comprovante e revise os dados sugeridos.',
  },
  {
    titulo: 'Acompanhe no painel',
    texto: 'Veja totais, gráficos e categorias sempre que quiser.',
  },
];

const PRIVACIDADE = [
  'Senhas são guardadas em hash. Nem o administrador consegue vê-las.',
  'A sessão usa JWT com refresh token e é encerrada ao apagar a conta.',
  'Apagar a conta remove também todas as despesas e categorias vinculadas.',
  'Sua chave da API Gemini é usada somente para leitura de comprovantes.',
];

const SEQUENCIA = [
  'Saiba para onde vai cada real.',
  2000,
  'Envie o comprovante e deixe o sistema ler os dados.',
  2000,
];

function ChartsExample() {
  let acumulado = 0;

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

export function ServiceLayout() {
  return (
    <div className="bg-background text-foreground min-h-screen antialiased">
      <a
        href="#conteudo"
        className="bg-primary text-primary-foreground sr-only rounded-md px-3 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>

      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Mesma lógica de tema do app: o Tailwind escolhe a logo pela classe "dark" */}
          <div className='flex gap-2 justify-center items-center'>
            <img
              src={logoDark}
              alt="Cycle Finance"
              className="hidden h-9 w-auto dark:block"
            />
            <img
              src={logoWhite}
              alt="Cycle Finance"
              className="h-9 w-auto dark:hidden"
            />

            <h1 className="text-xs leading-tight font-bold tracking-tight">
              Cycle Finance
            </h1>
          </div>

          <nav className="flex items-center gap-2" aria-label="Principal">
            <Button asChild variant="ghost">
              <Link to="/sign-in">Entrar</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/sign-up">Criar conta</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="min-h-[3lh] text-4xl leading-tight font-bold tracking-tight md:min-h-[2lh] md:text-5xl">
              <TypeAnimation
                sequence={SEQUENCIA}
                wrapper="span"
                speed={1}
                repeat={Infinity}
              />
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed">
              Registre despesas digitando ou enviando a foto do comprovante. O
              Cycle Finance organiza tudo e mostra seus gastos por dia, mês e
              período.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/sign-up">Criar conta</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/sign-in">Entrar na conta</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-start gap-3">
              <Badge variant="outline">Fase alpha</Badge>
              <p className="text-muted-foreground text-xs">
                Algumas funcionalidades ainda estão em desenvolvimento.
              </p>
            </div>
          </div>

          <ChartsExample />
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Registre, consulte e entenda seus gastos
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {RECURSOS.map((r) => (
                <Card key={r.titulo}>
                  <CardHeader>
                    <CardTitle>{r.titulo}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {r.texto}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Como funciona
            </h2>

            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {PASSOS.map((p, i) => (
                <li key={p.titulo} className="space-y-3 border-t pt-6">
                  <Badge variant="secondary">Passo {i + 1}</Badge>
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {p.texto}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Seus dados ficam protegidos
              </h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Leia nossos{' '}
                <Link
                  to="/termos"
                  className={`text-primary font-medium underline underline-offset-4 ${FOCO}`}
                >
                  termos de serviço e política de privacidade
                </Link>
                .
              </p>
            </div>

            <ul className="divide-y border-t">
              {PRIVACIDADE.map((item) => (
                <li key={item} className="py-4 text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Comece a acompanhar seus gastos.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/sign-up">Criar conta</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/sign-in">Já tenho conta</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© 2026 Cycle Finance. Todos os direitos reservados.</p>
          <nav className="flex flex-wrap gap-6" aria-label="Rodapé">
            <a
              href="https://cycle-finance-app-fcsp.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className={`hover:text-foreground transition-colors ${FOCO}`}
            >
              Documentação da API
            </a>
            <Link
              to="/termos"
              className={`hover:text-foreground transition-colors ${FOCO}`}
            >
              Termos de serviço e Privacidade
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
