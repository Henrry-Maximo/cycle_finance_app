import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

import { ExpenseDetails } from './expense-details';

// export interface ExpenseTableRowProps {}

export function ExpenseTableRow() {
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

          <ExpenseDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">1</TableCell>
      <TableCell className="font-medium">Gasolina</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-muted-foreground font-medium">Transporte</span>
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
        <Button variant="ghost" size="default" className="cursor-pointer">
          <PencilIcon className="h-3 w-3" />
          <span className="sr-only">Editar</span>
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="default" className="cursor-pointer">
          <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
          <span className="sr-only">Excluir</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
