
# Cycle Finance App
![alt text](logo.png)
- Software para gerenciamento de gastos através da análise de comprovantes de pagamentos utilizando a câmera do dispositivo para escaneamento das informações para cadastramento na plataforma. Uma exibição claro de gastos por mês/ano.

> 🚧 **Status:** Em desenvolvimento

## Estrutura do Repositório
- **API**: Armazena o código backend da aplicação;
- **MOBILE**: Armazena a interface web do cliente;
- **WEB**: Armazena a interface mobile do cliente.

## Stack Ferramental
- **Backend:** Node.js (Fastify), PrismaORM v7, PostgreSQL, Docker, Zod, tsup, tsx.
- **Frontend:** React.js.
- **Mobile:** React Native.
- **Tooling:** TypeScript, ESLint, Prettier.

## Documentação de Negócio

### Requisitos Funcionais (RF)
*   [x] O usuário deve poder se cadastrar
*   [ ] O usuário deve poder se logar
*   [x] O usuário deve poder registrar um comprovante
*   [x] O usuário deve poder registrar uma categoria
*   [] O usuário deve poder visualizar todas as suas despesas
*   [] O usuário deve poder visualizar todos as suas categorias
*   [] O administrador deve poder visualizar todos os usuários

### Requisitos Não-Funcionais (RNF)
*   [x] O banco de dados deve utilizar UUID v7 para performance
*   [x] A senha do usuário deve estar em formato hash

### Regras de Negócio (RN)
*   [ ] (Exemplo: Não é possível deletar uma categoria com gastos vinculados)

## Fluxograma de Desenvolvimento
![alt text](fluxograma.png)

## Estrutura do Banco de Dados

- [x] Users
- [x] Expenses
- [x] Categories 

## Comandos para Iniciar o Projeto

## Comandos de Desenvolvimento

### Backend
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

- pnpm install prisma -D
[instala o Prisma CLI como dependência de desenvolvimento]

- npx prisma -h
[exibe todos os comandos disponíveis do Prisma CLI]

- npx prisma init
[inicializa o Prisma no projeto, criando a pasta "prisma/" com o "schema.prisma", o ".env" com a variável "DATABASE_URL" e o "prisma.config.ts"]

- pnpm install @prisma/client
[instala o Prisma Client para acesso ao banco de dados com tipagem]

- npx prisma generate
[gera o Prisma Client a partir do schema. No Prisma 7, gera na pasta "generated/prisma" ao invés da "node_modules"]

- npx prisma --version
[exibe a versão atual do Prisma instalada no projeto]

- pnpm install @prisma/adapter-pg
[instala o adaptador do PostgreSQL para o Prisma 7. A partir da v7, o Prisma separou o core do driver de banco, exigindo um adaptador explícito na instanciação do PrismaClient]

- docker -v
[verifica se o Docker está instalado e exibe a versão]

- docker ps
[lista os containers em execução]

- docker ps -a
[lista todos os containers, incluindo os parados]

- docker run
[cria e inicia um container]

- docker rm <nome-do-container>
[remove um container parado]

- docker run --name api-cycle-finance-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apicyclefinance -p 5432:5432 bitnami/postgresql
[cria e inicia o container do PostgreSQL com usuário "docker", senha "docker" e banco "apicyclefinance" na porta 5432. A imagem utilizada é a "bitnami/postgresql"]

- configurar DATABASE_URL no ".env"
[após criar o container, atualizar a variável no ".env" com a string de conexão: postgresql://docker:docker@localhost:5432/apicyclefinance]

- criar "docker-compose.yml" na raiz do projeto
[arquivo para orquestrar os containers do projeto. Define o serviço do PostgreSQL com a imagem "bitnami/postgresql", usuário "docker", senha "docker", banco "apicyclefinance" e porta 5432]

- docker compose up -d
[sobe os containers definidos no "docker-compose.yml" em segundo plano]

- pnpm add bcryptjs
[responsável pelo hash da senha do usuário que está se cadastrando]

### Frontend
- pnpm add tailwindcss @tailwindcss/vite
[instalação do tailwindcss no projeto, sendo necessário realizar modificações em vite.config.ts para aceitar "@" como raiz]

- pnpm i @types/node -D
[para que o vite consiga trabalhar com aliases de importação no momento de build]

- pnpm dlx shadcn-ui@latest init  
- npx shadcn@latest init
[instalação da biblioteca de componentes shadcn-ui e uso do cli para iniciar arquivo de configurações]

- pnpm install localforage match-sorter sort-by
[instalação do react router dom mais dependencias de desenvolvimento]