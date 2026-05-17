import {
  ArrowDownLeftIcon,
  GearIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import type { ReactEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type AccountMenuProps = {
  handleLogout: () => Promise<void>;
};

export function AccountMenu({ handleLogout }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="outline"
          className="flex items-center gap-2 select-none"
        >
          Minha Conta
          <ArrowDownLeftIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-lg font-bold">Henrry Maximo</span>
          <span className="text-muted-foreground text-xs font-normal">
            henrry.maximo@gmail.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/settings">
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer text-rose-500 dark:text-rose-400"
        >
          <Button onClick={handleLogout}>
            <SignOutIcon className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
