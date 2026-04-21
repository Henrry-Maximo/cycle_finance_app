import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <>
      <Helmet title="Register" />

      <main className="flex flex-col justify-center items-center p-8 lg:p-20">
        <div className="w-full max-w-100 flex flex-col gap-8">
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
                <FieldLabel className="text-zinc-700 font-medium">
                  Username
                </FieldLabel>
                <Input
                  type="text"
                  placeholder="Henrry"
                  className="h-11 border-zinc-200 focus:ring-blue-600 transition-all"
                />
              </Field>

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

              <Field className="space-y-2">
                <div className="flex justify-between items-center">
                  <FieldLabel className="text-zinc-700 font-medium">
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

            <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer text-white transition-all shadow-sm active:scale-[0.98]">
              Cadastrar conta
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
              Já tem uma conta?{" "}
              <Link
                to="/sign-in"
                className="text-blue-600 font-medium hover:underline"
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
