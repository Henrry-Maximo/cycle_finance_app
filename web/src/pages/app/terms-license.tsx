import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export function TermsLicense() {
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Termos de Uso</DialogTitle>
        <DialogDescription>
          Leia com atenção antes de utilizar a plataforma.
        </DialogDescription>
      </DialogHeader>

      <Separator />

      <div className="flex flex-col gap-4 overflow-y-auto max-h-96 pr-1 text-sm text-muted-foreground">
        <div className="space-y-1">
          <p className="font-medium text-foreground">Sobre a plataforma</p>
          <p>
            O Cycle Finance é um sistema de gerenciamento financeiro que permite registrar
            despesas manualmente ou através da captura de comprovantes pela câmera do dispositivo.
            O sistema oferece visualizações e análises dos gastos por dia, mês e ano.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-foreground">Uso da plataforma</p>
          <p>
            Ao utilizar o Cycle Finance, você concorda em usar a plataforma apenas para fins
            legítimos. É proibido:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Usar a plataforma para fins ilegais ou não autorizados</li>
            <li>Tentar acessar dados de outros usuários</li>
            <li>Interferir no funcionamento adequado do serviço</li>
          </ul>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-foreground">Conta e acesso</p>
          <p>
            Cada usuário é identificado por um JWT renovado automaticamente via refresh token.
            Ao deletar sua conta, todas as despesas e categorias vinculadas serão removidas permanentemente.
            O token de reset de senha expira em 15 minutos e só pode ser usado uma vez.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-foreground">Privacidade e dados</p>
          <p>
            O Cycle Finance coleta e armazena os seguintes dados fornecidos pelo usuário:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Dados de cadastro: nome e e-mail</li>
            <li>Dados financeiros: despesas registradas e suas categorias</li>
          </ul>
          <p className="mt-2">
            Esses dados são armazenados exclusivamente para uso do próprio usuário e não são
            compartilhados com terceiros, exceto no caso descrito abaixo.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-foreground">Processamento de comprovantes por IA</p>
          <p>
            Ao utilizar a funcionalidade de escaneamento de comprovantes, a imagem enviada é
            transmitida ao modelo Gemini, desenvolvido pelo Google, exclusivamente para extração
            automática das informações do comprovante. Nenhuma imagem é armazenada pela plataforma
            após o processamento. O uso do Gemini está sujeito à{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Política de Privacidade do Google
            </a>
            .
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-foreground">Licença do código-fonte</p>
          <p>
            O código-fonte é distribuído sob a licença MIT. Isso se aplica ao código em si,
            não ao serviço hospedado nem aos dados dos usuários.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-foreground">Isenção de responsabilidade</p>
          <p>
            A plataforma é fornecida "no estado em que se encontra", sem garantias de qualquer tipo.
            O autor não se responsabiliza por danos decorrentes do uso ou incapacidade de uso do serviço.
          </p>
        </div>
      </div>
    </DialogContent>
  );
}