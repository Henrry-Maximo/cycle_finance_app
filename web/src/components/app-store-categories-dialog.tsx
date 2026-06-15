import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { deleteCategoryUser } from '@/api/delete-category-user';
import { getCategoriesUser } from '@/api/get-categories-user';
import { registerCategory } from '@/api/register-category';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Textarea } from './ui/textarea';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const storeCategoriesSchema = z.object({
  title: z.string().min(1).max(28),
  description: z.string().min(1).max(240),
});

type StoreCategoriesSchema = z.infer<typeof storeCategoriesSchema>;

export function StoreCategoriesDialog() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreCategoriesSchema>();
  const queryClient = useQueryClient();

  const { mutateAsync: registerCategoryFn } = useMutation({
    mutationFn: registerCategory,
  });

  const { mutateAsync: deleteCategoryUserFn } = useMutation({
    mutationFn: deleteCategoryUser,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['user-categories'],
    queryFn: getCategoriesUser,
  });

  async function handleDeleteCategory(id: string) {
    try {
      await deleteCategoryUserFn(id);
      await queryClient.invalidateQueries({ queryKey: ['user-categories'] });
      toast.success('A categoria foi apagada com sucesso!');
    } catch {
      toast.error('Error ao apagar a categoria.');
    }
  }

  async function handleRegisterCategory(data: StoreCategoriesSchema) {
    try {
      await registerCategoryFn({
        title: data.title,
        description: data.description,
      });
      await queryClient.invalidateQueries({ queryKey: ['user-categories'] });
      toast.success('Categoria cadastrada com sucesso.');
    } catch {
      toast.error('Erro ao cadastrar categoria.');
    }
  }

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Gerencimaneto de Categorias</DialogTitle>
        <DialogDescription>Informações acerca das categorias</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleRegisterCategory)}
        >
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left">
                Nome
              </Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  type="text"
                  placeholder="Digite o nome da categoria"
                  {...register('title')}
                  disabled={isSubmitting}
                />
                <p className="text-muted-foreground text-xs">
                  Preencha com o nome da categoria que deseja utilizar no
                  cadastro das despesas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Descrição
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  placeholder="Digite uma descrição para a sua categoria. Ex.: serve para..."
                  {...register('description')}
                  disabled={isSubmitting}
                />
                <p className="text-muted-foreground text-xs">
                  Cadastre a descrição de sua categoria.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end">
            <Button
              variant="success"
              size="default"
              className="cursor-pointer"
              disabled={isSubmitting}
              type="submit"
            >
              <PencilIcon className="h-3 w-3" />
              <span>Cadastrar</span>
            </Button>
            <Button
              variant="ghost"
              size="default"
              className="cursor-pointer"
              type="button"
            >
              <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
              <span className="text-rose-500 dark:text-rose-400">Cancelar</span>
            </Button>
          </DialogFooter>
        </form>

        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle>Lista de Categorias</DialogTitle>
            <DialogDescription>Detalhes da categoria</DialogDescription>
          </DialogHeader>

          <div className="max-h-62 overflow-y-auto">
            <Table>
              <TableHeader className="bg-popover sticky top-0 z-10">
                <TableRow>
                  {/* <TableHead className="w-24">ID</TableHead> */}
                  <TableHead className="w-12">Título</TableHead>
                  <TableHead className="w-52">Descrição</TableHead>
                  <TableHead className="w-16">Criado há</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categoriesData?.categories.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      {/* <TableCell className="font-medium">
                  019e3524-7c5a-75cd-b52e-239dad66fa0c
                </TableCell> */}
                      <TableCell className="font-medium">
                        {category.title}
                      </TableCell>
                      <TableCell className="max-w-md wrap-break-word whitespace-normal">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-muted-foreground flex flex-col">
                        <span className="font-light">
                          {format(category.created_at, 'dd/MM/yyyy')}
                        </span>
                        <span className="font-semibold">
                          {formatDistanceToNow(category.created_at, {
                            locale: ptBR,
                            addSuffix: true,
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="default"
                          className="cursor-pointer"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

              <TableFooter className="bg-popover sticky bottom-0">
                <TableRow>
                  <TableCell colSpan={3}>Total da Categorias:</TableCell>
                  <TableCell className="text-right font-medium">
                    {categoriesData?.categories.length ?? 0}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
