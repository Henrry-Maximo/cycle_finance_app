import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@phosphor-icons/react';
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
                <TableHead className="w-16"></TableHead>

                <TableHead className="w-10.5">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="w-48">Categoria</TableHead>

                <TableHead className="w-35">Preço</TableHead>
                {/* <TableHead className="w-4">Cartão</TableHead> */}

                <TableHead>Fornecedor</TableHead>
                {/* <TableHead>CNPJ</TableHead> */}

                {/* <TableHead>Estado/Município</TableHead> */}
                <TableHead className="w-45">Criado há</TableHead>

                <TableHead className="w-41"></TableHead>
                <TableHead className="w-33"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Button variant="outline" size="default">
                        <MagnifyingGlassIcon className="h-3 w-3" />
                        <span className="sr-only">Detalhes da despesa</span>
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">
                      1
                    </TableCell>
                    <TableCell className="font-medium">Gasolina</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                        <span className="text-muted-foreground font-medium">
                          Transporte
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">R$ 250.00</TableCell>
                    {/* <TableCell>456</TableCell> */}

                    <TableCell>Posto Ipiranga</TableCell>
                    {/* <TableCell>00.000.000/0001-00</TableCell> */}

                    {/* <TableCell>São Paulo/Embu das Artes</TableCell> */}
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
                        <PencilIcon className="h-3 w-3" />
                        <span className="sr-only">Editar</span>
                      </Button>
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
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
