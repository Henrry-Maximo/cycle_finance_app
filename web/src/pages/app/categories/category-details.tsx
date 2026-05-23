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
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-24">ID</TableHead> */}
                <TableHead className="w-12">Título</TableHead>
                <TableHead className="w-52">Descrição</TableHead>
                <TableHead className="w-16">Criado há</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                {/* <TableCell className="font-medium">
                  019e3524-7c5a-75cd-b52e-239dad66fa0c
                </TableCell> */}
                <TableCell className="font-medium">Alimentação</TableCell>
                <TableCell className="max-w-md wrap-break-word whitespace-normal">
                  Categoria criada para monitoramento dos gastos em relação a
                  comida, alimentação no geral, etc...
                </TableCell>
                <TableCell className="text-muted-foreground flex flex-col">
                  <span className="font-light">25/04/2026</span>
                  <span className="font-semibold">2 dias</span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="default"
                    className="cursor-pointer"
                  >
                    <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total da Categorias:</TableCell>
                <TableCell className="text-right font-medium">1</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </DialogContent>
  );
}
