import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { signIn } from '@/api/sign-in';
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email, password: data.password });

      console.log(data);
      // throw new Error('');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Usuário autenticado com sucesso.');

      navigate('/');
    } catch {
      toast.error('Credenciais inválidas.');
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-accent-foreground p-4 text-3xl font-semibold tracking-tight">
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
                <FieldLabel className="text-accent-foreground font-medium">
                  E-mail
                </FieldLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="exemplo@email.com"
                  className="text-accent-foreground h-11 transition-all focus:ring-blue-600"
                />
              </Field>

              <Field className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel className="text-accent-foreground font-medium">
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
                  className="text-accent-foreground h-11"
                />
              </Field>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-500 active:scale-[0.98] dark:hover:border-blue-800 dark:hover:text-blue-600"
            >
              Acessar plataforma
            </Button>
          </form>

          <footer className="text-center">
            <p className="text-accent-foreground text-sm">
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
