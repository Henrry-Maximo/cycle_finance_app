import { SpinnerBallIcon, TrashIcon, XIcon } from '@phosphor-icons/react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useDeleteMyAccount } from '@/contexts/delete-my-account-context';

export function DeleteMyAccountDialog() {
  const { handleDeleteMyAccount, isPending } = useDeleteMyAccount();

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Excluir conta</DialogTitle>
        <DialogDescription>
          Tem certeza? A conta e todos os dados cadastrados serão apagados
          permanentemente e de forma irreversível.
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
              onClick={handleDeleteMyAccount}
              disabled={isPending}
            >
              {isPending ? (
                <SpinnerBallIcon className="h-3 w-3 animate-spin" />
              ) : (
                <TrashIcon className="h-3 w-3" />
              )}
              <span>Excluir</span>
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
}
