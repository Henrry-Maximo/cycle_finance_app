import { useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

import { getProfileUser } from '@/api/get-profile-user';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DeleteMyAccountDialog } from '@/components/app-delete-my-account';
import { DeleteMyAccountContext } from '@/contexts/delete-my-account-context';
import { toast } from 'sonner';
import { deleteMyAccount } from '@/api/delete-my-account';

export function Settings() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileUser,
    staleTime: Infinity,
  });

  const { mutateAsync: deleteMyAccountFn, isPending } = useMutation({
    mutationFn: deleteMyAccount,
  });

  async function handleDeleteMyAccount() {
    try {
      await deleteMyAccountFn(profile?.id && null);

      toast.success('O usuário foi excluído com sucesso!');
    } catch {
      toast.error('Erro ao excluir usuário. Tente novamente!');
    }
  }

  return (
    <>
      <Helmet title="Settings" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:grid md:grid-cols-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Gerencie as informações básicas da sua conta.
              </CardDescription>
            </CardHeader>
            {isLoadingProfile ? (
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-28.75" />{' '}
              </CardContent>
            ) : (
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" disabled defaultValue={profile?.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    disabled
                    defaultValue={profile?.email}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <Button variant="outline" disabled className="w-fit">
                    Atualizar perfil
                  </Button>
                  <DeleteMyAccountContext.Provider
                    value={{ handleDeleteMyAccount, isPending }}
                  >
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="destructive" className="w-fit">
                          Apagar minha conta
                        </Button>
                      </DialogTrigger>

                      <DeleteMyAccountDialog />
                    </Dialog>
                  </DeleteMyAccountContext.Provider>
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Atualize sua senha de acesso.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-pass">Senha Atual</Label>
                  <Input id="current-pass" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass">Nova Senha</Label>
                  <Input id="new-pass" type="password" />
                </div>
              </div>
              <Button variant="outline" disabled className="w-fit">
                Alterar senha
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Integração com IA</CardTitle>
            <CardDescription>
              Insira sua chave de API para habilitar o processamento inteligente
              de notas e despesas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">Gemini API Key</Label>
              <Input id="api-key" type="password" placeholder="AIzaSy..." />
              <p className="text-muted-foreground text-xs">
                Sua chave é usada apenas para leitura de documentos via OCR.
              </p>
            </div>
            <Button variant="secondary" disabled className="w-fit">
              Salvar chave de API
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
