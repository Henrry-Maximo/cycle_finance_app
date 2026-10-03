import { FunnelIcon, FunnelXIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const expenseFiltersSchema = z.object({
  expenseId: z.string().optional(),
  expenseName: z.string().optional(),
  category: z.string().optional(),
});

type ExpenseFiltersSchema = z.infer<typeof expenseFiltersSchema>;

export function ExpenseTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const expenseId = searchParams.get('order');
  const expenseName = searchParams.get('expenseName');
  const category = searchParams.get('category');

  const { register, handleSubmit, control, reset } =
    useForm<ExpenseFiltersSchema>({
      resolver: zodResolver(expenseFiltersSchema),
      defaultValues: {
        expenseId: expenseId ?? '',
        expenseName: expenseName ?? '',
        category: category ?? 'all',
      },
    });

  function handleFilter({
    expenseId,
    expenseName,
    category,
  }: ExpenseFiltersSchema) {
    setSearchParams((state) => {
      if (expenseId) {
        state.set('expenseId', expenseId);
      } else {
        state.delete('expenseId');
      }

      if (expenseName) {
        state.set('expenseName', expenseName);
      } else {
        state.delete('expenseName');
      }

      if (category) {
        state.set('category', category);
      } else {
        state.delete('category');
      }

      state.set('page', '1');
      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('expenseId');
      state.delete('expenseName');
      state.delete('category');
      state.set('page', '1');

      return state;
    });

    reset({
      expenseId: '',
      expenseName: '',
      category: 'all',
    });
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleFilter)}>
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
        <span className="shrink-0 text-sm font-semibold">Filtros:</span>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Input
            placeholder="ID da despesa"
            className="h-8 w-full md:w-32"
            {...register('expenseId')}
          />
          <Input
            placeholder="Nome do Produto"
            className="h-8 w-full md:w-64"
            {...register('expenseName')}
          />
          <Controller
            name="category"
            control={control}
            disabled={true}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Select
                  defaultValue="all"
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger className="h-8 w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Categorias</SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          ></Controller>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 md:w-auto md:flex-col">
          <Button
            type="submit"
            variant="secondary"
            className="h-8 w-full cursor-pointer md:w-auto"
          >
            <FunnelIcon className="mr-2 h-4 w-4" />
            <span className="flex-1">Filtrar resultados</span>
          </Button>

          <Button
            onClick={handleClearFilters}
            type="button"
            variant="outline"
            className="h-8 w-full cursor-pointer md:w-auto"
          >
            <FunnelXIcon className="mr-2 h-4 w-4" />
            <span className="flex-1">Remover filtros</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
