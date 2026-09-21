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
// import { useUpdateExpense } from '@/contexts/update-expense-context';
// import { UpdateExpenseBody } from '@/api/update-expense';

// type UpdateExpenseForm = Omit<UpdateExpenseBody, 'id'>;

export function UpdateExpenseDialog() {
  // const { expense, handleUpdateExpense, isPending } = useUpdateExpense();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     title: expense.title,
  //     enterprise: expense.enterprise,
  //     description: expense.description,
  //     cnpj: expense.cnpj,
  //     source: expense.source,
  //     price: expense.price,
  //     card_last_digits: expense.card_last_digits,
  //   },
  // });

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Editar despesa</DialogTitle>
      </DialogHeader>

      <form
        // onSubmit={handleSubmit(handleUpdateExpense)}
        className="flex flex-col gap-4"
      >
        <Separator />

        <Field>
          <FieldLabel>Título</FieldLabel>
          {/* <Input {...register('title')} /> */}
        </Field>
        <Field>
          <FieldLabel>Empresa</FieldLabel>
          {/* <Input {...register('enterprise')} /> */}
        </Field>
        <Field>
          <FieldLabel>Descrição</FieldLabel>
          {/* <Input {...register('description')} /> */}
        </Field>
        <Field>
          <FieldLabel>CNPJ</FieldLabel>
          {/* <Input {...register('cnpj')} /> */}
        </Field>
        <Field>
          <FieldLabel>Fonte</FieldLabel>
          {/* <Input {...register('source')} /> */}
        </Field>
        <Field>
          <FieldLabel>Valor</FieldLabel>
          <Input
            // {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
          />
        </Field>
        <Field>
          <FieldLabel>Últimos dígitos do cartão</FieldLabel>
          {/* <Input {...register('card_last_digits')} maxLength={4} /> */}
        </Field>

        <Separator />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">
            {/* {isPending && <SpinnerBallIcon className="h-3 w-3 animate-spin" />} */}
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
