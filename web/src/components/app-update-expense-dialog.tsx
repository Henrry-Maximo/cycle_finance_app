import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { Separator } from './ui/separator';
import { useMutation } from '@tanstack/react-query';
import { updateExpense } from '@/api/update-expense';
import z from 'zod';
import { useUpdateExpense } from '@/contexts/update-expense-context';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { SpinnerBallIcon } from '@phosphor-icons/react';
// import { useUpdateExpense } from '@/contexts/update-expense-context';
// import { UpdateExpenseBody } from '@/api/update-expense';

// type UpdateExpenseForm = Omit<UpdateExpenseBody, 'id'>;

const updateExpenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  enterprise: z.string(),
  description: z.string(),
  cnpj: z.string(),
  source: z.string(),
  price: z.string(),
  card_last_digits: z.string(),
});

type UpdateExpenseSchema = z.infer<typeof updateExpenseSchema>;

export function UpdateExpenseDialog() {
  const { expense, isPending } = useUpdateExpense();

  const { mutateAsync: updateExpenseFn } = useMutation({
    mutationFn: updateExpense,
  });

  async function handleUpdateExpense() {
    try {
      await updateExpenseFn({
        id: expense.id,
        title: expense.title,
        enterprise: expense.enterprise,
        description: expense.description ?? '',
        cnpj: expense.cnpj ?? '',
        source: expense.source ?? '',
        price: Number(expense.price),
        card_last_digits: expense.card_last_digits,
      });

      toast.success('Despesa atualizada com sucesso!');
    } catch {
      toast.error('Erro ao atualizar despesa.');
    }
  }

  const { register, handleSubmit } = useForm<UpdateExpenseSchema>({
    defaultValues: {
      title: expense.title,
      enterprise: expense.enterprise,
      description: expense.description ?? '',
      cnpj: expense.cnpj ?? '',
      source: expense.source ?? '',
      price: expense.price ? expense.price.toString() : '',
      card_last_digits: expense.card_last_digits,
    },
  });

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Editar despesa</DialogTitle>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(handleUpdateExpense)}
        className="flex flex-col gap-4"
      >
        <Separator />

        <Field>
          <FieldLabel>Título</FieldLabel>
          <Input {...register('title')} />
        </Field>
        <Field>
          <FieldLabel>Empresa</FieldLabel>
          <Input {...register('enterprise')} />
        </Field>
        <Field>
          <FieldLabel>Descrição</FieldLabel>
          <Input {...register('description')} />
        </Field>
        <Field>
          <FieldLabel>CNPJ</FieldLabel>
          <Input {...register('cnpj')} />
        </Field>
        <Field>
          <FieldLabel>Fonte</FieldLabel>
          <Input {...register('source')} />
        </Field>
        <Field>
          <FieldLabel>Valor</FieldLabel>
          <Input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
          />
        </Field>
        <Field>
          <FieldLabel>Últimos dígitos do cartão</FieldLabel>
          <Input {...register('card_last_digits')} maxLength={4} />
        </Field>

        <Separator />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">
            {isPending && <SpinnerBallIcon className="h-3 w-3 animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
