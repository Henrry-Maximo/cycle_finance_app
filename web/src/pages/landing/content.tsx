import { PieExample } from "@/components/app-pie-example";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export function Content() {
  const SEQUENCIA = [
    'Saiba para onde vai cada real.',
    2000,
    'Envie o comprovante e deixe o sistema ler os dados.',
    2000,
    'Economize tempo no cadastro das despesas com IA.',
    2000,
    'Entenda os seus gastos, pense no futuro.',
    2000,
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

  const FOCO =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  return (
    <>
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

        <PieExample />
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
    </>
  );
}
