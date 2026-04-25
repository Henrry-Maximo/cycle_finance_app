import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInForm = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  async function handleSignIn(data: SignInForm) {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <>
      <Helmet title="Login" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="p-4 text-3xl font-semibold tracking-tight text-zinc-900">
              Entrar na conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Bem-vindo de volta! Insira seus dados para acessar.
            </p>
          </header>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-4">
              <Field className="space-y-2">
                <FieldLabel className="font-medium text-zinc-700">
                  E-mail
                </FieldLabel>
                <Input
                  {...register('email')}
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
                  <Link
                    to="/request"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="h-11 border-zinc-200"
                />
              </Field>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98]"
            >
              Acessar plataforma
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
              Não tem uma conta?{' '}
              <Link
                className="font-medium text-blue-600 hover:underline"
                to="/sign-up"
              >
                Cadastre-se
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
