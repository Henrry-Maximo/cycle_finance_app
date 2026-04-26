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

export function ExpenseDetails() {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>ID: 1</DialogTitle>
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
                    Transporte
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Serviço/Produto
              </TableCell>
              <TableCell className="text-right">Gasolina</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Cartão (dígitos finais)
              </TableCell>
              <TableCell className="text-muted-foreground text-right">
                546
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Fornecedor (empresa)
              </TableCell>
              <TableCell className="text-right">Mercado Ceifa</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="text-right">há 2 dias</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de criação
              </TableCell>
              <TableCell className="text-right">25/04/2026</TableCell>
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
              <TableCell className="font-medium">Gasolina</TableCell>
              <TableCell className="text-right">R$ 54,99</TableCell>
              <TableCell className="text-right leading-tight whitespace-pre-line">
                {'São Paulo / Embu das Artes'.replace(' / ', '\n')}
              </TableCell>
              <TableCell className="max-w-md text-right wrap-break-word whitespace-normal">
                Despesa realizada para deslocamento até o trabalho não
                precisando colocar gasolina durante a semana.
              </TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total da despesa:</TableCell>
              <TableCell className="text-right font-medium">R$ 54,99</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
