import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { getCategoriesUser } from '@/api/get-categories-user';
import { registerCategory } from '@/api/register-category';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const registerCategoryForm = z.object({
  title: z.string().min(1).max(28),
  description: z.string().min(1).max(240),
});

type RegisterCategoryForm = z.infer<typeof registerCategoryForm>;

export function CategoryDetails() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterCategoryForm>();

  const { mutateAsync: registerCategoryFn } = useMutation({
    mutationFn: registerCategory,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['user-categories'],
    queryFn: getCategoriesUser,
  });

  async function handleRegisterCategory(data: RegisterCategoryForm) {
    try {
      await registerCategoryFn({
        title: data.title,
        description: data.description,
      });

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
          <div className="grid gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Nome</Label>
              <Input
                id="title"
                type="text"
                placeholder="Digite o nome da categoria"
                {...register('title')}
                disabled={isSubmitting}
              />
              <p className="text-muted-foreground text-xs">
                Preencha com o nome da categoria que deseja utilizar no cadastro
                das despesas.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                type="text"
                placeholder="Digite o nome da categoria"
                {...register('description')}
                disabled={isSubmitting}
              />
              <p className="text-muted-foreground text-xs">
                Cadastre a descrição de sua categoria.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <Button
              variant="ghost"
              size="default"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              <PencilIcon className="h-3 w-3" />
              <span>Cadastrar</span>
            </Button>
            <Button variant="ghost" size="default" className="cursor-pointer">
              <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
              <span className="text-rose-500 dark:text-rose-400">Cancelar</span>
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle>Lista de Categorias</DialogTitle>
            <DialogDescription>Detalhes da categoria</DialogDescription>
          </DialogHeader>

          <Table>
            <TableHeader>
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
                      >
                        <TrashIcon className="dark: h-3 w-3 text-rose-500 dark:text-rose-400" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
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
    </DialogContent>
  );
}
