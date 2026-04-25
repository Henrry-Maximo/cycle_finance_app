import { Outlet } from 'react-router-dom';

import logo from '@/assets/logo.png';

export function AuthLayout() {
  return (
    <div className="grid h-screen grid-cols-1 bg-zinc-50 lg:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-zinc-950 lg:flex">
        {/* <div className="absolute h-80 w-80 bg-blue-600/4- blur-[120px] rounded-full -top-10 -left-10" /> */}

        <div className="relative z-10 flex h-full w-full flex-col gap-6 border-r-2 border-blue-600 px-4 py-2">
          <header>
            <p className="text-sm text-zinc-600">Cycle Finance Web.</p>
          </header>
          <main className="z-10 flex flex-1 flex-col items-center justify-center gap-6">
            <img
              src={logo}
              alt="Logo Cycle Finance"
              className="h-auto w-52 drop-shadow-2xl"
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

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
