import { File, ListIcon, UserCircleIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';

import { getProfileUser } from '@/api/get-profile-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import { DropdownMenu } from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

export function AppSidebar() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'], // chave identificadora da requisição (assim utiliza o cache)
    queryFn: getProfileUser, // dados
    staleTime: Infinity,
  });

  return (
    <Dialog>
      <Sidebar className="border-r-2 border-blue-400">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                {/* <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger> */}
                <SidebarMenuButton>Menu</SidebarMenuButton>
                {/* <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
              </DropdownMenuContent> */}
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* <SidebarGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer justify-start"
                >
                  <ListIcon className="mr-2 h-4 w-4" />
                  <span>Categoria</span>
                </Button>
              </DropdownMenuItem>
            </DialogTrigger>
          </SidebarGroup> */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer justify-start"
                >
                  <ListIcon className="mr-2 h-4 w-4" />
                  <span>Minhas Categorias</span>
                </Button>
              </DialogTrigger>
            </SidebarGroupLabel>

            <SidebarGroupLabel>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer justify-start"
                >
                  <File className="mr-2 h-4 w-4" />
                  <span>Meus uploads</span>
                </Button>
              </DialogTrigger>
            </SidebarGroupLabel>

            {/* <SidebarGroupAction>
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction> */}
            {/* <SidebarGroupContent></SidebarGroupContent> */}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center">
              <SidebarMenuButton>
                <UserCircleIcon />
                {isLoadingProfile ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <>
                    <span className="hidden transition-colors duration-300 md:block md:text-xs md:font-medium">
                      {profile?.name
                        .split('-')
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}
                    </span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Separator orientation="horizontal" className="h-auto" />
          </SidebarMenu>

          <footer className="flex justify-between">
            <p className="text-xs text-zinc-600">Cycle Finance.</p>
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()}
            </p>
          </footer>
        </SidebarFooter>
      </Sidebar>
    </Dialog>
  );
}
