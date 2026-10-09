export function TermsLicenseApi() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Termos de Uso — Cycle Finance API</h1>
      <p className="text-muted-foreground text-sm mb-6">Versão 1.0.0 · Em desenvolvimento</p>

      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Ao utilizar a Cycle Finance API, você concorda com os termos descritos abaixo.
          Esta API é mantida por{' '}
          <a
            href="https://github.com/Henrry-Maximo"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Henrique Maximo
          </a>
          .
        </p>

        <div className="space-y-2">
          <h2 className="text-base font-semibold">Uso Permitido</h2>
          <p className="text-sm text-muted-foreground">
            A API deve ser utilizada apenas para fins legítimos. É proibido:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-6 space-y-1">
            <li>Usar a API para fins ilegais ou não autorizados</li>
            <li>Interferir no funcionamento adequado do serviço</li>
            <li>Tentar acessar dados de outros usuários</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold">Privacidade e Dados</h2>
          <p className="text-sm text-muted-foreground">
            As despesas registradas e os dados de perfil são armazenados exclusivamente para uso do próprio usuário.
            Imagens de recibos enviadas para análise são transmitidas ao modelo Gemini (Google) apenas para processamento
            e extração das informações. Nenhuma imagem é armazenada pela API após a resposta ser retornada.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold">Isenção de Responsabilidade</h2>
          <p className="text-sm text-muted-foreground">
            A API é fornecida "no estado em que se encontra", sem garantias de qualquer tipo.
            O autor não se responsabiliza por danos decorrentes do uso ou incapacidade de uso do serviço.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold">Licença do Código-Fonte</h2>
          <p className="text-sm text-muted-foreground">
            O código-fonte da Cycle Finance API é distribuído sob a{' '}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              licença MIT
            </a>
            . Isso se aplica ao código em si, não ao serviço hospedado nem aos dados dos usuários.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold">Documentação</h2>
          <p className="text-sm text-muted-foreground">
            A documentação pública da API está disponível em{' '}
            <a
              href="https://cycle-finance-app-fcsp.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              cycle-finance-app-fcsp.onrender.com/docs
            </a>
            . O repositório está disponível no{' '}
            <a
              href="https://github.com/Henrry-Maximo/cycle_finance_app"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}