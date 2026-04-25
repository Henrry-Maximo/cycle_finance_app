import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function SignUp() {
  return (
    <>
      <Helmet title="Register" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Cadastre sua conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja bem-vindo! Insira seus dados para criar sua conta e utilizar
              hoje mesmo.
            </p>
          </header>

          <form className="flex flex-col gap-6">
            <div className="space-y-4">
              <Field className="space-y-2">
                <FieldLabel className="font-medium text-zinc-700">
                  Username
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="Henrry"
                  className="h-11 border-zinc-200 transition-all focus:ring-blue-600"
                />
              </Field>

              <Field className="space-y-2">
                <FieldLabel className="font-medium text-zinc-700">
                  E-mail
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="exemplo@email.com"
                  className="h-11 border-zinc-200 transition-all focus:ring-blue-600"
                />
              </Field>

              <Field className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel className="font-medium text-zinc-700">
                    Senha
                  </FieldLabel>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-zinc-200"
                />
              </Field>
            </div>

            <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98]">
              Cadastrar conta
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
              Já tem uma conta?{' '}
              <Link
                to="/sign-in"
                className="font-medium text-blue-600 hover:underline"
              >
                Faça login
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
