import { CircleNotchIcon, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { signIn } from '@/api/sign-in';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { AuthenticationContext } from '@/contexts/authentication-context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInForm = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const { addCurrentTokenSession } = useContext(AuthenticationContext);
  const [showPassword, setShowPassword] = useState(false); // exibir e ocultar a senha

  const [searchParams] = useSearchParams(); // obter dados passados via URL

  const navigate = useNavigate(); // direcionamento

  const {
    register, // registrar inputs
    handleSubmit, // capturar formulário
    formState: { isSubmitting }, // estados do formulário
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '', // buscar por email após cadastro
    },
  });

  // passar função por mutation
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      const { token } = await authenticate({
        email: data.email,
        password: data.password,
      });

      addCurrentTokenSession(token);
      console.log(token);

      // localStorage.setItem('cycle_finance_api', token);
      // console.log(data);
      // throw new Error('');
      // await new Promise((resolve) => setTimeout(resolve, 2000));

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
                <div className="flex justify-between">
                  <FieldLabel className="text-accent-foreground font-medium">
                    Senha
                  </FieldLabel>
                  <div className="flex items-center justify-between">
                    <Link
                      to="/request"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="••••••••"
                    className="text-accent-foreground h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                    title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors hover:text-white"
                  >
                    <div className="relative h-4 w-4">
                      <EyeIcon
                        className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${showPassword ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
                      />
                      <EyeSlashIcon
                        className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${showPassword ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'}`}
                      />
                    </div>
                  </button>
                </div>
              </Field>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex h-11 w-full flex-row items-center justify-center gap-2 bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-500 active:scale-[0.98] dark:hover:border-blue-800 dark:hover:text-blue-600"
            >
              {isSubmitting && (
                <CircleNotchIcon className="h-14 w-14 animate-spin" />
              )}
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
