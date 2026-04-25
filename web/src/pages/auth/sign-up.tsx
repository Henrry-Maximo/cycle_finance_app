import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUpForm = z.object({
  username: z.string().min(3).max(18),
  email: z.email(),
  password: z.string().min(6),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  async function handleSignIn(data: SignUpForm) {
    try {
      console.log(data);
      // throw new Error('');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Usuário cadastrado com sucesso.');

      navigate('/sign-in');
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
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Cadastre sua conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja bem-vindo! Insira seus dados para criar sua conta e utilizar
              hoje mesmo.
            </p>
          </header>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="space-y-4">
              <Field className="space-y-2">
                <FieldLabel className="font-medium text-zinc-700">
                  Username
                </FieldLabel>
                <Input
                  {...register('username')}
                  type="text"
                  placeholder="Henrry"
                  className="h-11 border-zinc-200 transition-all focus:ring-blue-600"
                />
              </Field>

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
                </div>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 border-zinc-200"
                />
              </Field>
            </div>

            <Button
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98]"
              disabled={isSubmitting}
            >
              Cadastrar conta
            </Button>

            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox"
                name="terms-checkbox"
                required
                disabled={isSubmitting}
              />
              <Label
                htmlFor="terms-checkbox"
                className="text-muted-foreground ml-2 text-xs leading-relaxed"
              >
                Ao continuar, você concorda com nossos termos de serviços e
                política de privacidade.
              </Label>
            </Field>
          </form>

          <footer className="text-center">
            <p className="text-sm text-zinc-500">
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
