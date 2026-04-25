import { MagnifyingGlassIcon, TrashIcon } from '@phosphor-icons/react';
import { Helmet } from 'react-helmet-async';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function Expenses() {
  return (
    <>
      <Helmet title="Despesas" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Despesas</h1>
      </div>

      <div className="space-y-2.5">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input placeholder="Nome da despesa" className="h-8 w-[320px]" />
        </form>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>

                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>

                <TableHead>Preço</TableHead>
                <TableHead>Cartão</TableHead>

                <TableHead>Fornecedor</TableHead>
                <TableHead>CNPJ</TableHead>

                <TableHead>Estado/Município</TableHead>
                <TableHead>Criado há</TableHead>

                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Button variant="outline" size="default">
                    <MagnifyingGlassIcon className="h-3 w-3" />
                    <span className="sr-only">Detalhes da despesa</span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">
                  1
                </TableCell>
                <TableCell>Gasolina</TableCell>
                <TableCell>Transporte</TableCell>

                <TableCell>R$ 250.00</TableCell>
                <TableCell>4567</TableCell>

                <TableCell>Posto Ipiranga</TableCell>
                <TableCell>00.000.000/0001-00</TableCell>

                <TableCell>São Paulo/Embu das Artes</TableCell>
                <TableCell className="text-muted-foreground">2 dias</TableCell>

                <TableCell>
                  <Button variant="outline" size="default">
                    <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
