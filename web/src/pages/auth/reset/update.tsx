import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { updatePassword } from '@/api/update-password';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPasswordForm = z.object({
  password: z.string().min(6),
});

type ResetPasswordForm = z.infer<typeof resetPasswordForm>;

export function Update() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { register, handleSubmit } = useForm<ResetPasswordForm>();

  const { mutateAsync: updatePasswordFn } = useMutation({
    mutationFn: updatePassword,
  });

  async function handleResetPassword(data: ResetPasswordForm) {
    try {
      const token = searchParams.get('token');
      if (!token) {
        toast.error('Token inválido.');
        navigate('/request');
        return;
      }

      await updatePasswordFn({
        password: data.password,
        token,
      });

      toast.success('A senha foi redefinida com sucesso.');
      navigate('/sign-in');
    } catch {
      toast.error('Error ao redefinir senha.');
    }
  }

  return (
    <>
      <Helmet title="Confirmação" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-accent-foreground text-3xl font-semibold tracking-tight">
              Confirme sua nova senha abaixo!
            </h1>
            <p className="text-muted-foreground text-sm">
              Informe corretamente sua nova senha seguindo os critérios de
              validações exigidas na etapa.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">
              <Field className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-accent-foreground font-medium">
                    Senha
                  </FieldLabel>
                </div>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="text-accent-foreground h-11"
                />
              </Field>

              <Field className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-accent-foreground font-medium">
                    Digite a senha novamente
                  </FieldLabel>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="text-accent-foreground h-11"
                />
              </Field>
            </div>

            <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-500 active:scale-[0.98] dark:hover:border-blue-800 dark:hover:text-blue-600">
              Confirmar
            </Button>
          </form>

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
