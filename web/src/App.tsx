import { Button } from "./components/ui/button";
import { Field, FieldLabel } from "./components/ui/field";
import { Input } from "./components/ui/input";

import logo from './assets/logo.png';

export function App() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-zinc-50">
      <div className="hidden lg:flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden">
        {/* <div className="absolute h-80 w-80 bg-blue-600/4- blur-[120px] rounded-full -top-10 -left-10" /> */}

        <div className="relative z-10 flex flex-col gap-6 h-full w-full py-2 px-4 border-r-2 border-blue-600">
          <header>
            <p className="text-zinc-600 text-sm">Cycle Finance Web.</p>
          </header>
          <main className="flex flex-col gap-6 items-center z-10 flex-1 justify-center">
            <img
              src={logo}
              alt="Logo Cycle Finance"
              className="w-52 h-auto drop-shadow-2xl"
            />
            <div className="text-center">
              <h2 className="text-zinc-200 text-4xl font-medium tracking-tight"><span className="text-blue-400">C</span>ycle <span className="text-blue-400">F</span>inance</h2>
              <p className="text-zinc-500 text-md">Sua plataforma de acompanhamento de gastos.</p>
            </div>
          </main>
          <footer className="flex justify-between">
            <p className="text-zinc-600 text-sm">© {new Date().getFullYear()} Cycle Finance.</p>
            <p className="text-zinc-600 text-sm">Todos os direitos reservados.</p>
          </footer>
        </div>
      </div>

      <main className="flex flex-col justify-center items-center p-8 lg:p-20">
        <div className="w-full max-w-100 flex flex-col gap-8">

          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Entrar na conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Bem-vindo de volta! Insira seus dados para acessar.
            </p>
          </header>

          <form className="flex flex-col gap-6">
            <div className="space-y-4">
              <Field className="space-y-2">
                <FieldLabel className="text-zinc-700 font-medium">E-mail</FieldLabel>
                <Input
                  type="email"
                  placeholder="exemplo@email.com"
                  className="h-11 border-zinc-200 focus:ring-blue-600 transition-all"
                />
              </Field>

              <Field className="space-y-2">
                <div className="flex justify-between items-center">
                  <FieldLabel className="text-zinc-700 font-medium">Senha</FieldLabel>
                  <a href="#" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</a>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-zinc-200"
                />
              </Field>
            </div>

            <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer text-white transition-all shadow-sm active:scale-[0.98]">
              Acessar plataforma
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
              Não tem uma conta? <a href="#" className="text-blue-600 font-medium hover:underline">Cadastre-se</a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
