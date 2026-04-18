
# Cycle Finance App

- Software para gerenciamento de gastos através da análise de comprovantes de pagamentos utilizando a câmera do dispositivo para escaneamento das informações para cadastramento na plataforma. Uma exibição claro de gastos por mês/ano.

[...Em desenvolvimento]

## Estrutura do Repositório
- **API**: Armazena o código backend da aplicação;
- **MOBILE**: Armazena a interface web do cliente;
- **WEB**: Armazena a interface mobile do cliente.

## Stack Ferramental
- **NODEJS**:
- **REACT**:
- **REACT-NATIVE**:

## Requisitos Funcionais

## Requisitos Não-Funcionais

## Regra de Negócio

## Fluxograma de Desenvolvimento

## Estrutura do Banco de Dados

## Comandos para Iniciar o Projeto

## Comandos de Desenvolvimento
- pnpm init -y
[criar package json para construir o backend em nodejs]

- pnpm install -D typescript @types/node tsx tsup
[instalação do typescript e seus pacotes. O "tsx" é uma biblioteca pra executar o código em tempo de desenvolvimento por causa do typescript, nativamente o nodejs não compreende. Ou seja, irá converter o código para javascript rodando automaticamente. O "tsup" é uma biblioteca para gerar a build do projeto para o ambiente de produção]

- npx tsc --init
[criar arquivo "tsconfig.json" para abrigar as configurações de uso do typescript]

- pnpm install dotenv
[responsável pelo parseamento dos dados inseridos no ".env" para uso na aplicação]

- pnpm install zod
[responsável pela validação dos dados do ".env"]

- pnpm create @eslint/config@latest
[instalação do ESLint para correções de problemas no código, exibe uma série de perguntas sobre]

- renomear "eslint.config.mts" para "eslint.config.mjs"
[o ESLint 10 tem bug com arquivos ".mts", renomear para ".mjs" resolve sem precisar de dependências extras]

- pnpm install -D prettier eslint-config-prettier
[o "prettier" formata o código automaticamente. O "eslint-config-prettier" desativa regras do ESLint que conflitam com o Prettier]

- criar ".prettierrc.js" na raiz do projeto
[arquivo de configuração do Prettier com as preferências de formatação do código. Usar ".js" ao invés de ".prettierrc" para suportar comentários explicativos nas opções]

- criar ".prettierignore" na raiz do projeto
[arquivo para o Prettier ignorar pastas como "node_modules" e "build" durante a formatação]

- adicionar "ignores" no "eslint.config.mjs"
[configura o ESLint para ignorar as pastas "node_modules" e "build" durante a análise]

- adicionar "baseUrl" e "paths" no "tsconfig.json"
[configura o alias "@" para importações absolutas a partir da pasta "src", evitando caminhos relativos longos como "../../"]