import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Request() {
  return (
    <>
      <Helmet title="Recuperação" />

      <main className="flex flex-col justify-center items-center p-8 lg:p-20 h-full">
        <div className="w-full max-w-100 flex flex-col gap-8">
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
              <FieldLabel className="text-zinc-700 font-medium">
                E-mail
              </FieldLabel>
              <Input
                type="email"
                placeholder="exemplo@email.com"
                className="h-11 border-zinc-200 focus:ring-blue-600 transition-all"
              />
            </Field>

            <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer text-white transition-all shadow-sm active:scale-[0.98]">
              Enviar
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
              Já tem uma conta?{" "}
              <Link
                className="text-blue-600 font-medium hover:underline"
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
