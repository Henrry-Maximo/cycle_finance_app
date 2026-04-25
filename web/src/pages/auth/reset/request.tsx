import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function Request() {
  return (
    <>
      <Helmet title="Recuperação" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Recupere o acesso a sua conta!
            </h1>
            <p className="text-muted-foreground text-sm">
              Informe seu e-mail abaixo para receber um link de atulização de
              senha.
            </p>
          </header>

          <form className="flex flex-col gap-6">
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

            <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98]">
              Enviar
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
              Já tem uma conta?{' '}
              <Link
                className="font-medium text-blue-600 hover:underline"
                to="/sign-in"
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
