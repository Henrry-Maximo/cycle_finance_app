import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { registerUser } from '@/api/register-user';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signUpForm = z.object({
  username: z
    .string()
    .min(3, 'Username deve ter mais que 3 caracteres.')
    .max(18, 'Username deve ter no máximo 18 caracteres.')
    .regex(/^[a-zA-Z0-9_]+$/, 'Somente letras e underline são permitidos.'),
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 4 caracteres.')
    .max(62, 'Senha deve ter no máximo 32 caracteres.')
    .regex(/^\S+$/, 'Senha não deve conter espaços.'),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  });

  async function handleSignIn(data: SignUpForm) {
    try {
      const { message } = await registerUserFn({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // console.log(data);
      // throw new Error('');
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(message, {
        // action: {
        //   label: 'Register',
        //   onClick: () => navigate(`sign-in?email=${data.email}`),
        // },
      });

      navigate(`/sign-in?email=${data.email}`);
    } catch {
      toast.error('Error ao cadastrar usuário.');
    }
  }

  return (
    <>
      <Helmet title="Register" />

      <main className="flex h-full flex-col items-center justify-center p-8 lg:p-20">
        <div className="flex w-full max-w-100 flex-col gap-8">
          <header className="flex flex-col gap-2 text-left">
            <h1 className="text-accent-foreground p-4 text-3xl font-semibold tracking-tight">
              Cadastre sua conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja bem-vindo(a)! Informe seus dados para criar sua conta e
              utilizar hoje mesmo.
            </p>
          </header>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-4">
              <Field className="space-y-2">
                <FieldLabel className="text-accent-foreground font-medium">
                  Usuário
                </FieldLabel>
                <Input
                  {...register('username')}
                  type="text"
                  placeholder="username"
                  className="text-accent-foreground h-11 transition-all focus:ring-blue-600"
                />

                {errors.username && (
                  <span className="text-xs text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </Field>

              <Field className="space-y-2">
                <FieldLabel className="text-accent-foreground font-medium">
                  E-mail
                </FieldLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="email"
                  className="text-accent-foreground h-11 transition-all focus:ring-blue-600"
                />

                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
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
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
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

                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </Field>
            </div>

            <Button
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-500 active:scale-[0.98] dark:hover:border-blue-800 dark:hover:text-blue-600"
              disabled={isSubmitting}
            >
              Cadastrar conta
            </Button>

            <Field orientation="horizontal">
              <Checkbox
                className="dark:border-accent ml-4 cursor-pointer dark:border-2"
                id="terms-checkbox"
                name="terms-checkbox"
                required
                disabled={isSubmitting}
              />
              <Label
                htmlFor="terms-checkbox"
                className="text-accent-foreground cursor-pointer text-xs leading-relaxed"
              >
                Ao continuar, você concorda com nossos termos de serviços e
                política de privacidade.
              </Label>
            </Field>
          </form>

          <footer className="text-center">
            <p className="text-accent-foreground text-sm">
              Já tem uma conta?{' '}
              <Link
                to="/sign-in"
                className="font-medium text-blue-600 hover:underline"
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
