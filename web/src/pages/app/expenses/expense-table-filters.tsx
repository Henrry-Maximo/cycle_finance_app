import { FunnelIcon, FunnelXIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ExpenseTableFilters() {
  return (
    <form className="w-full">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
        <span className="shrink-0 text-sm font-semibold">Filtros:</span>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Input placeholder="ID da despesa" className="h-8 w-full md:w-32" />
          <Input placeholder="Nome do Produto" className="h-8 w-full md:w-64" />
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              <SelectItem value="transport">Transporte</SelectItem>
              <SelectItem value="food">Alimentação</SelectItem>
              <SelectItem value="study">Estudo</SelectItem>
              <SelectItem value="home">Casa</SelectItem>
              <SelectItem value="leisure">Lazer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 md:w-auto md:flex-col">
          <Button
            type="submit"
            variant="secondary"
            className="h-8 w-full cursor-pointer md:w-auto"
          >
            <FunnelIcon className="mr-2 h-4 w-4" />
            <span className="flex-1">Filtrar resultados</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-8 w-full cursor-pointer md:w-auto"
          >
            <FunnelXIcon className="mr-2 h-4 w-4" />
            <span className="flex-1">Remover filtros</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
