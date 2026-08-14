import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { RequestPasswordError } from '@/api/errors/request-password-error';
import { RequestPasswordFetchError } from '@/api/errors/request-password-fetch-error';
import { requestPassword } from '@/api/request-password';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestPasswordForm = z.object({
  email: z.string(),
});

type RequestPasswordForm = z.infer<typeof requestPasswordForm>;

export function Request() {
  // controle do formulário
  const { register, handleSubmit } = useForm<RequestPasswordForm>();

  const [resetUrl, setResetUrl] = useState<string>();

  // modificar dados - mais específico (roda apenas quando manda / sem cache)
  const { mutateAsync: requestPasswordFn } = useMutation({
    mutationFn: requestPassword,
  });

  async function handleRequestPassword(data: RequestPasswordForm) {
    try {
      const { message, response } = await requestPasswordFn({
        email: data.email,
      });

      const { url } = response.data;
      setResetUrl(url);

      // console.log('Reached home.');
      toast.success(message);
    } catch (err) {
      if (err instanceof RequestPasswordError) {
        toast.error(err.message);
      }

      if (err instanceof RequestPasswordFetchError) {
        toast.error(err.message);
      }
    }
  }

  return (
    <>
      <Helmet title="Recuperação" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-accent-foreground text-3xl font-semibold tracking-tight">
              Recupere o acesso a sua conta!
            </h1>
            <p className="text-muted-foreground text-sm">
              Informe seu e-mail abaixo para receber um link de atulização de
              senha.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(handleRequestPassword)}
            className="flex flex-col gap-6"
          >
            <Field className="space-y-2">
              <FieldLabel className="text-accent-foreground font-medium">
                E-mail
              </FieldLabel>
              <Input
                type="email"
                {...register('email')}
                placeholder="exemplo@email.com"
                className="text-muted-foreground h-11 transition-all focus:ring-blue-600"
              />
            </Field>

            <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-500 active:scale-[0.98] dark:hover:border-blue-800 dark:hover:text-blue-600">
              Enviar
            </Button>
          </form>

          {resetUrl && (
            <div className="rounded-sm border-2 px-4 py-2">
              <h1 className="text-accent-foreground text-sm font-semibold tracking-tight">
                Use o link abaixo!
              </h1>
              <Link
                to="/update"
                className="text-sm text-blue-500 hover:underline"
              >
                Clique aqui para redefinir sua senha
              </Link>
            </div>
          )}

          <footer className="text-center">
            <p className="text-accent-foreground text-sm">
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
