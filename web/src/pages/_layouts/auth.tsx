import { WarningCircleIcon } from '@phosphor-icons/react';
import { Outlet } from 'react-router-dom';

import logoDark from '@/assets/logo_dark.png';

export function AuthLayout() {
  return (
    <div className="grid h-screen grid-cols-1 overflow-hidden antialiased lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-zinc-950 lg:flex">
        {/* <div className="absolute h-80 w-80 bg-blue-600/4- blur-[120px] rounded-full -top-10 -left-10" /> */}

        <div className="relative z-10 flex h-full w-full flex-col gap-6 border-r-2 border-blue-600 px-4 py-2">
          <header className="flex justify-between">
            <p className="text-sm text-zinc-600">Cycle Finance Web.</p>
            <a
              href="https://github.com/Henrry-Maximo"
              target="_blank"
              className="text-sm text-zinc-600"
              rel="noreferrer"
            >
              Eu, Henrry-Maximo.
            </a>
          </header>
          <main className="z-10 flex flex-1 flex-col items-center justify-center gap-6">
            <img
              src={logoDark}
              className="h-24 w-24"
              alt="logo cycle finance app"
            />
            <div className="text-center">
              <h2 className="text-4xl font-medium tracking-tight text-zinc-200">
                <span className="text-blue-400">C</span>ycle{' '}
                <span className="text-blue-400">F</span>inance
              </h2>
              <p className="text-md text-zinc-500">
                Sua plataforma de acompanhamento de gastos.
              </p>
            </div>
            <div className="flex w-md flex-col items-center justify-center gap-2">
              <p className="flex items-center gap-2 font-semibold text-red-700">
                <WarningCircleIcon className="h-6 w-6" /> Plataforma em
                Desenvolvimento (Fase Alpha)
              </p>
              <p className="text-muted-foreground mt-1 text-center text-xs">
                Este é um ambiente de testes. Os dados cadastrados aqui podem
                ser limpos ou apagados a qualquer momento devido a manutenções
                no banco de dados.
              </p>
            </div>
          </main>
          <footer className="flex justify-between">
            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} Cycle Finance.
            </p>
            <p className="text-sm text-zinc-600">
              Todos os direitos reservados.
            </p>
          </footer>
        </div>
      </div>

      <div className="h-full overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
