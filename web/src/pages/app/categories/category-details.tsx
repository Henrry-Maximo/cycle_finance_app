import { PencilIcon, TrashIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function CategoryDetails() {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Gerencimaneto de Categorias</DialogTitle>
        <DialogDescription>Informações acerca das categorias</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="text-category">Nome</Label>
            <Input
              id="text-category"
              type="text"
              placeholder="Digite o nome da categoria"
            />
            <p className="text-muted-foreground text-xs">
              Preenchar com o nome da categoria que deseja utilizar no cadastro
              das despesas.
            </p>
          </div>
          <div className="flex flex-row justify-end">
            <Button variant="ghost" size="default" className="cursor-pointer">
              <PencilIcon className="h-3 w-3" />
              <span>Cadastrar</span>
            </Button>
            <Button variant="ghost" size="default" className="cursor-pointer">
              <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
              <span className="text-rose-500 dark:text-rose-400">Cancelar</span>
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle>Lista de Categorias</DialogTitle>
            <DialogDescription>Detalhes da categoria</DialogDescription>
          </DialogHeader>

          <Table>
            {/* <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Descrição</TableHead>
              </TableRow>
            </TableHeader> */}

            {/* <TableBody>
              <TableRow>
                <TableCell className="font-medium">Gasolina</TableCell>
                <TableCell className="max-w-md text-right wrap-break-word whitespace-normal">
                  Despesa realizada para deslocamento até o trabalho não
                  precisando colocar gasolina durante a semana.
                </TableCell>
              </TableRow>
            </TableBody> */}

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total da Categorias:</TableCell>
                <TableCell className="text-right font-medium">34</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </DialogContent>
  );
}
