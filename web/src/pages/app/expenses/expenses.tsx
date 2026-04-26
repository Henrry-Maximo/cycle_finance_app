import { Helmet } from 'react-helmet-async';

import { Pagination } from '@/components/app-pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ExpenseTableFilters } from './expense-table-filters';
import { ExpenseTableRow } from './expense-table-row';

export function Expenses() {
  return (
    <>
      <Helmet title="Despesas" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Despesas</h1>
        <div className="space-y-2.5">
          <ExpenseTableFilters />

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
                  return <ExpenseTableRow key={i} />;
                })}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  );
}
