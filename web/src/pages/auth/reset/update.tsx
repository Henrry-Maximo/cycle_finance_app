import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function Update() {
  return (
    <>
      <Helmet title="Confirmação" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Confirme sua nova senha abaixo!
            </h1>
            <p className="text-muted-foreground text-sm">
              Informe corretamente sua nova senha seguindo os critérios de
              validações exigidas na etapa.
            </p>
          </header>

          <form className="flex flex-col gap-6">
            <div className="space-y-4">
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

              <Field className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel className="font-medium text-zinc-700">
                    Digite a senha novamente
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
              Confirmar
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
