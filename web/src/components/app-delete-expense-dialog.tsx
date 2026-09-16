import { PencilIcon, TrashIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function DeleteExpensesDialog() {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Você tem certeza que deseja excluir Despesa?</DialogTitle>
        <DialogDescription>
          A despesa em questão será deletada permanentemente.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form className="flex flex-col gap-4">
          <DialogFooter className="flex flex-row justify-end">
            <Button
              variant="success"
              size="default"
              className="cursor-pointer"
              // disabled={isSubmitting}
              type="submit"
            >
              {/* <PencilIcon className="h-3 w-3" /> */}
              <span>Cancelar</span>
            </Button>
            <Button
              variant="ghost"
              size="default"
              className="cursor-pointer"
              type="button"
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
