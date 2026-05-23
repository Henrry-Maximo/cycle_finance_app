import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { getCategoriesUser } from '@/api/get-categories-user';
import { registerExpense } from '@/api/register-expense';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const registerExpenseForm = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(240),
  enterprise: z.string().min(1).max(48),
  cnpj: z.string().min(1).max(16),
  source: z.string().min(1).max(48),
  price: z.string().min(1).max(16),
  card_last_digits: z.string().min(1).max(3),
  category_id: z.string().min(1),
});

type RegisterExpenseForm = z.infer<typeof registerExpenseForm>;

interface TokenRegisterExpensePayload {
  sub: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  user_id: string;
}

export interface GetCategoriesUserForm {
  categories: Category[];
}

export function ExpenseForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterExpenseForm>({
    defaultValues: {
      category_id: '',
    },
  });

  const { mutateAsync: registerExpenseFn } = useMutation({
    mutationFn: registerExpense,
  });

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['user-categories'],
    queryFn: getCategoriesUser,
  });

  async function handleRegisterExpense(data: RegisterExpenseForm) {
    try {
      const token = localStorage.getItem('cycle_finance_api');

      if (!token) {
        throw new Error('Usuário não identificado.');
      }

      const decodedToken = jwtDecode<TokenRegisterExpensePayload>(token);
      const userId = decodedToken.sub;

      const { message } = await registerExpenseFn({
        title: data.title,
        enterprise: data.enterprise,
        description: data.description,
        cnpj: data.cnpj,
        source: data.source,
        price: Number(data.price),
        card_last_digits: data.card_last_digits,
        user_id: userId,
        category_id: data.category_id,
      });

      toast.success(message);
    } catch {
      toast.error('Erro ao cadastrar despesa.');
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center px-16 py-4"
        onSubmit={handleSubmit(handleRegisterExpense)}
      >
        <Card className="grid w-full grid-cols-2 gap-8 px-4">
          <Field>
            <FieldLabel
              htmlFor="title"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Título
            </FieldLabel>
            <Input
              {...register('title')}
              id="title"
              type="text"
              placeholder="Digite o nome do produto(s)"
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <FieldLabel
              {...register('description')}
              htmlFor="description"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Descrição
            </FieldLabel>
            <Input
              id="description"
              type="text"
              placeholder="Digite uma descrição para a despesa"
              disabled={isSubmitting}
            />
          </Field>
        </Card>

        {/* <Separator /> */}

        <Card className="grid w-full grid-cols-2 gap-8 px-4">
          <Field>
            <FieldLabel
              htmlFor="enterprise"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Empresa
            </FieldLabel>
            <Input
              id="enterprise"
              type="text"
              placeholder="Digite o nome da empresa"
              {...register('enterprise')}
              disabled={isSubmitting}
            />
            <FieldDescription>
              Empresa obtida através do comprovante
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="cnpj"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              CNPJ
            </FieldLabel>
            <Input
              {...register('cnpj')}
              id="cnpj"
              placeholder="Digite o CNPJ da empresa"
              type="text"
              disabled={isSubmitting}
            />
            <FieldDescription>
              CNPJ obtido através do comprovante
            </FieldDescription>
          </Field>
        </Card>

        <Card className="flex w-full flex-col gap-8 px-4 md:grid md:grid-cols-5">
          <Field className="md:col-span-2">
            <FieldLabel
              htmlFor="source"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Estado/Município
            </FieldLabel>
            <Input
              {...register('source')}
              id="source"
              type="text"
              placeholder="Digite o estado e a cidade"
              disabled={isSubmitting}
            />
            <FieldDescription>
              Localização obtida através do comprovante
            </FieldDescription>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel
              htmlFor="price"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Preço
            </FieldLabel>
            <Input
              {...register('price')}
              id="price"
              type="text"
              placeholder="Digite o valor da despesa"
              disabled={isSubmitting}
            />
            <FieldDescription>
              Preço obtido através do comprovante
            </FieldDescription>
          </Field>

          <Field className="md:col-span-1">
            <FieldLabel
              htmlFor="cart"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Cartão
            </FieldLabel>
            <Input
              {...register('card_last_digits')}
              id="cart"
              type="number"
              placeholder="Digite os últimos 3 dígitos"
              disabled={isSubmitting}
            />
            <FieldDescription>
              Digítos do cartão obtido através do comprovante
            </FieldDescription>
          </Field>
        </Card>

        <Card className="flex w-full flex-col gap-8 px-4 md:grid md:grid-cols-1">
          <Field className="flex w-full">
            <FieldLabel
              htmlFor="category"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Categoria
            </FieldLabel>

            <Controller
              name="category_id"
              control={control}
              render={({ field: { name, onChange, value } }) => {
                return (
                  <Select
                    defaultValue="all"
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={isLoadingCategories || isSubmitting}
                  >
                    <SelectTrigger id="category" className="h-8 w-45">
                      <SelectValue
                        placeholder={
                          isLoadingCategories
                            ? 'Carregando categorias...'
                            : 'Selecione uma categoria'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesData?.categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              }}
            />

            <FieldDescription>
              Escolha uma categoria{' '}
              <span className="text-rose-500">
                (é necessário realizar o cadastro com antecedência).
              </span>
            </FieldDescription>
          </Field>
        </Card>

        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2 md:grid md:grid-cols-2">
            <Button
              type="submit"
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98] sm:grid-cols-1 md:grid-cols-2"
            >
              Cadastrar Despesa
            </Button>
            <Button
              className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98] sm:grid-cols-1 md:grid-cols-2"
              disabled
            >
              Analisar Comprovante Novamente
            </Button>
          </div>

          <FieldDescription className="w-72 text-center md:w-full">
            Cheque as informações acima e só proceda com o cadastro se tudo
            estiver correto. Caso o contrário, peça uma nova análise.
          </FieldDescription>
        </div>
      </form>
    </div>
  );
}
