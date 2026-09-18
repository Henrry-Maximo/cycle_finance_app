import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ExpenseDetailsProps {
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

export function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>ID: {expense.id ?? ''}</DialogTitle>
        <DialogDescription>Detalhes da despesa</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Categoria</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="text-muted-foreground font-medium">
                    {expense.category_id ?? ''}
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Serviço/Produto
              </TableCell>
              <TableCell className="text-right">
                {expense.title ?? ''}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Cartão (dígitos finais)
              </TableCell>
              <TableCell className="text-muted-foreground text-right">
                {expense.card_last_digits ?? ''}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Fornecedor (empresa)
              </TableCell>
              <TableCell className="text-right">
                {expense.enterprise ?? ''}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="text-right">
                {formatDistanceToNow(expense.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de criação
              </TableCell>
              <TableCell className="text-right">
                {format(expense.created_at, 'dd/MM/yyyy')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Estado/Município</TableHead>
              <TableHead className="text-right">Descrição</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{expense.title}</TableCell>
              <TableCell className="text-right">
                {expense.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
              <TableCell className="text-right leading-tight whitespace-pre-line">
                {expense.source ?? expense.source!.replace(' / ', '\n')}
              </TableCell>
              <TableCell className="max-w-md text-right wrap-break-word whitespace-normal">
                {expense.description ?? ''}
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total da despesa:</TableCell>
              <TableCell className="text-right font-medium">
                {expense.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
