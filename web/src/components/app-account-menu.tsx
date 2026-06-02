import {
  ArrowDownLeftIcon,
  GearIcon,
  ListIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getProfileUser } from '@/api/get-profile-user';
import {
  StoreCategoriesDialog
} from '@/components/app-store-categories-dialog';

import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

type AccountMenuProps = {
  handleLogout: () => Promise<void>;
};

export function AccountMenu({ handleLogout }: AccountMenuProps) {
  // realizar a requisição
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'], // chave identificadora da requisição (assim utiliza o cache)
    queryFn: getProfileUser, // dados
    staleTime: Infinity,
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            {isLoadingProfile ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <>
                <span className="hidden transition-colors duration-300 md:block md:text-xs md:font-medium">
                  {profile?.user.name
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>
                <ArrowDownLeftIcon className="h-4 w-4" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.user.name}</span>
                <span className="text-muted-foreground text-xs font-normal">
                  {profile?.user.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Button
                variant="ghost"
                className="w-full cursor-pointer justify-start"
              >
                <ListIcon className="mr-2 h-4 w-4" />
                <span>Categoria</span>
              </Button>

              {/* <Link to="/settings">
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Configurações</span>
            </Link> */}
            </DropdownMenuItem>
          </DialogTrigger>

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
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <SignOutIcon className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreCategoriesDialog />
    </Dialog>
  );
}
