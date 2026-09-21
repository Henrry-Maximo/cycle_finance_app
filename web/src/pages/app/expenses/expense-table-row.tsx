import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

import { deleteExpenseUser } from '@/api/delete-expense-user';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

import { ExpenseDetails } from './expense-details';
import { DeleteExpensesDialog } from '@/components/app-delete-expense-dialog';
import { DeleteExpenseContext } from '@/contexts/delete-expense-context';
import { UpdateExpenseDialog } from '@/components/app-update-expense-dialog';

export interface ExpenseTableRowProps {
  expense: {
    id: string;
    title: string;
    enterprise: string;
    description: string | null;
    cnpj: string | null;
    source: string | null;
    price: number;
    card_last_digits: string;
    created_at: Date;
    user_id: string;
    category_id: string;
  };
}

export function ExpenseTableRow({ expense }: ExpenseTableRowProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteExpenseUserFn, isPending } = useMutation({
    mutationFn: deleteExpenseUser,
  });

  async function handleDeleteExpense() {
    try {
      await deleteExpenseUserFn(expense.id);
      await queryClient.invalidateQueries({ queryKey: ['user-expenses'] });
      toast.success('A despesa foi apagada com sucesso!');
    } catch {
      toast.error('Error ao apagar a despesa.');
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="default">
              <MagnifyingGlassIcon className="h-3 w-3" />
              <span className="sr-only">Detalhes da despesa</span>
            </Button>
          </DialogTrigger>

          <ExpenseDetails key={expense.id} expense={expense} />
        </Dialog>
      </TableCell>
      <TableCell className="w-2 truncate font-mono text-xs font-medium">
        {expense.id.substring(0, 12) + '...'}
      </TableCell>
      <TableCell className="font-medium">{expense.title}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-muted-foreground font-medium">
            {expense.category_id.substring(0, 12) + '...'}
          </span>
        </div>
      </TableCell>

      <TableCell className="font-medium">
        {expense.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      {/* <TableCell>456</TableCell> */}

      <TableCell>{expense.enterprise}</TableCell>
      {/* <TableCell>00.000.000/0001-00</TableCell> */}

      {/* <TableCell>São Paulo/Embu das Artes</TableCell> */}
      <TableCell className="text-muted-foreground flex flex-col">
        <span className="font-light">
          {format(expense.created_at, 'dd/MM/yyyy')}
        </span>
        <span className="font-semibold">
          {formatDistanceToNow(expense.created_at, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </TableCell>

      {/* <TableCell>
        <Button variant="ghost" size="default" className="cursor-pointer">
          <PencilIcon className="h-3 w-3" />
          <span className="sr-only">Editar</span>
        </Button>
      </TableCell> */}

      <Dialog>
        <DialogTrigger asChild>
          <TableCell>
            <Button variant="ghost" size="default" className="cursor-pointer">
              <PencilIcon className="h-3 w-3" />
              <span className="sr-only">Editar</span>
            </Button>
          </TableCell>
        </DialogTrigger>

        <UpdateExpenseDialog />
      </Dialog>

      <DeleteExpenseContext.Provider value={{ handleDeleteExpense, isPending }}>
        <Dialog>
          <DialogTrigger asChild>
            <TableCell>
              <Button variant="ghost" size="default" className="cursor-pointer">
                <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
                <span className="sr-only">Excluir</span>
              </Button>
            </TableCell>
          </DialogTrigger>

          <DeleteExpensesDialog />
        </Dialog>
      </DeleteExpenseContext.Provider>
    </TableRow>
  );
}
