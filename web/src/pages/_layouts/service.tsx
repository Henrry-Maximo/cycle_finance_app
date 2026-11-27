import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';

import logoDark from '@/assets/logo_dark.png';
import logoWhite from '@/assets/logo_white.png';

export function ServiceLayout() {
  const FOCO =
  'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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
          <div className="flex items-center justify-center gap-2">
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
        <Outlet />
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
