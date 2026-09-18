import { TrashIcon, XIcon } from '@phosphor-icons/react';

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

export function DeleteExpensesDialog() {
  const { handleDeleteExpense } = useDeleteExpense();

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
          <DialogFooter className="flex flex-row justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="default"
                className="cursor-pointer"
                type="button"
              >
                <XIcon className="h-3 w-3" />
                <span>Cancelar</span>
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              size="default"
              className="cursor-pointer"
              type="submit"
              onClick={handleDeleteExpense}
              // disabled={isSubmitting}
            >
              <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
              <span className="text-rose-500 dark:text-rose-400">Excluir</span>
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
}
