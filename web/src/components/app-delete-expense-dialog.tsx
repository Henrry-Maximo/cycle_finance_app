import { SpinnerBallIcon, TrashIcon, XIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteExpense } from '@/contexts/delete-expense-context';
import { Separator } from './ui/separator';

export function DeleteExpensesDialog() {
  const { handleDeleteExpense, isPending } = useDeleteExpense();

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>
          Você tem certeza que deseja excluir a despesa?
        </DialogTitle>
        <DialogDescription>
          A despesa em questão será deletada permanentemente sem possibilidade
          de restauração.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form className="flex flex-col gap-4">
          <Separator />
          <DialogFooter className="flex flex-row justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="default"
                className="cursor-pointer"
                type="button"
                disabled={isPending}
              >
                <XIcon className="h-3 w-3" />
                <span>Cancelar</span>
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              size="default"
              className="cursor-pointer"
              type="button"
              onClick={handleDeleteExpense}
              disabled={isPending}
            >
              {isPending ? (
                <SpinnerBallIcon className="h-3 w-3 animate-spin" />
              ) : (
                <TrashIcon className="h-3 w-3 text-rose-500 dark:text-rose-400" />
              )}
              <span className="text-rose-500 dark:text-rose-400">Excluir</span>
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
}
