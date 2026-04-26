import { MagnifyingGlassIcon } from '@phosphor-icons/react';

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
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID da despesa" className="h-8 w-auto" />
      <Input placeholder="Nome do Produto" className="h-8 w-[320px]" />

      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-45">
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

      <Button type="submit" variant="secondary" size="lg">
        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="lg">
        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
