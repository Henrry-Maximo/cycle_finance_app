import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { CircleNotchIcon } from '@phosphor-icons/react';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { requestPassword } from '@/api/request-password';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { RequestPasswordError } from '@/api/errors/request-password-error';
import { RequestPasswordFetchError } from '@/api/errors/request-password-fetch-error';
import { Input } from '@/components/ui/input';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestPasswordForm = z.object({
  email: z
    .email('Email inválido.')
    .min(1, 'Email dete ter mais que 1 caracter.')
    .max(72, 'Email deve ter no máximo 72 caracteres.'),
});

type RequestPasswordForm = z.infer<typeof requestPasswordForm>;

export function Request() {
  // controle do formulário
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RequestPasswordForm>({
    resolver: zodResolver(requestPasswordForm),
  });

  // variável pra armazenar URL Token
  const [resetUrl, setResetUrl] = useState<string>();

  // modificar dados - mais específico (roda apenas quando manda / sem cache)
  const { mutateAsync: requestPasswordFn } = useMutation({
    mutationFn: requestPassword,
  });

  async function handleRequestPassword(data: RequestPasswordForm) {
    try {
      const { url } = await requestPasswordFn({
        email: data.email,
      });

      setResetUrl(url);
      toast.success('Link de renovação enviado com sucesso!');
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
            <h1 className="text-accent-foreground p-4 text-3xl font-semibold tracking-tight">
              Recupere sua conta!
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
                {...register('email')}
                type="email"
                placeholder="email"
                className="text-muted-foreground h-11 transition-all focus:ring-blue-600"
              />
            </Field>

            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-500 active:scale-[0.98] dark:hover:border-blue-800 dark:hover:text-blue-600"
            >
              {isSubmitting && (
                <CircleNotchIcon className="h-14 w-14 animate-spin" />
              )}
              Enviar
            </Button>
          </form>

          {resetUrl && (
            <div className="rounded-sm border-2 px-4 py-2">
              <h1 className="text-accent-foreground text-sm font-semibold tracking-tight">
                Use o link abaixo!
              </h1>
              <Link
                to={resetUrl}
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
