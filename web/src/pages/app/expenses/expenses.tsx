import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import { Pagination } from '@/components/app-pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getExpensesUser } from '../../../api/get-expenses-user';
import { ExpenseTableFilters } from './expense-table-filters';
import { ExpenseTableRow } from './expense-table-row';
import { useSearchParams } from 'react-router-dom';
import z from 'zod';
import { useEffect } from 'react';

export function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1');

  const { data: result } = useQuery({
    queryKey: ['user-expenses', pageIndex], // incluir paramêtro pra atualização
    queryFn: () => getExpensesUser({ pageIndex }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((url) => {
      url.set('page', (pageIndex + 1).toString());

      return url;
    });
  }

  useEffect(() => {
    const url = searchParams.get('page');

    if (url && url === '0') {
      setSearchParams((url) => {
        url.set('page', (1).toString());

        return url;
      });
    }
  }, []);

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
                {result &&
                  result.expenses.map((expense) => {
                    return (
                      <ExpenseTableRow key={expense.id} expense={expense} />
                    );
                  })}
                {/* {Array.from({ length: 10 }).map((_, i) => {
                  return <ExpenseTableRow key={i} />;
                })} */}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
