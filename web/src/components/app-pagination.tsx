import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
} from '@phosphor-icons/react';

import { Button } from './ui/button';

export interface PaginationProps {
  pageIndex: number; // página atual, começa em zero
  totalCount: number; // total de registros
  perPage: number; // número de registros por página
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1; // ceil: realiza o arredondamento pra cima

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex} de {pages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            variant="outline"
            className="h-8 w-8 cursor-pointer p-0"
            // disabled
          >
            <CaretDoubleLeftIcon className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            variant="outline"
            className="h-8 w-8 cursor-pointer p-0"
            // disabled
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            onClick={() => onPageChange(pageIndex)}
            variant="outline"
            className="h-8 w-8 cursor-pointer p-0"
          >
            <ArrowRightIcon className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            onClick={() => onPageChange(pages - 1)}
            variant="outline"
            className="h-8 w-8 cursor-pointer p-0"
          >
            <CaretDoubleRightIcon className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
