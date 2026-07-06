# Cycle Finance App

![alt text](logo.png)

- Software para gerenciamento financeiro que permite registrar despesas manualmente ou através da captura de comprovantes utilizando a câmera do dispositivo. O sistema oferece visualizações e análises dos gastos por dia, mês e ano.

> 🚧 **Status:** Em desenvolvimento

## Estrutura do Repositório

- **API**: Armazena o código backend da aplicação;
- **WEB**: Armazena a interface web do cliente;
- **MOBILE**: Armazena a interface mobile do cliente.

## Stack Ferramental

- **Backend:** Node.js, Fastify, PrismaORM v7, PostgreSQL, Redis, Docker, Zod, Swagger, FastifyMultipart, GeminiIA Client API.
- **Frontend:** React.js, React-Hook-Form, React-Router, Tanstack-Query, Shadcn, RadixUI, PhosphorIcons, Axios, Date-fns, Zod, Sonner, ReCharts, React-Helmet, Tailwindcss.
- **Mobile:** React Native.
- **Tooling:** TypeScript, ESLint, Prettier, tsup, tsx.

## Documentação de Negócio

## Arquitetura

- API REST utilizando Fastify
- Autenticação baseada em JWT
- Controle de acesso baseado em papéis (RBAC)
- Persistência com PostgreSQL
- Cache e Rate Limiting com Redis
- Validação de entrada com Zod
- ORM Prisma

### Requisitos Funcionais (RF)

- [x] O usuário deve poder se cadastrar;
- [x] O usuário deve poder se logar;
- [x] O usuário deve poder resetar a senha;
- [x] O usuário deve poder registrar uma categoria;
- [x] O usuário deve poder registrar um comprovante;
- [x] O usuário deve poder visualizar suas informações de perfil;
- [x] O usuário deve poder visualizar o histórico de todas as suas despesas;
- [x] O usuário deve poder visualizar o histórico de todas as suas categorias;
- [x] O usuário deve poder visualizar a quantidade de despesas registradas;
- [x] O usuário deve poder visualizar a quantidade de despesas registradas no dia;
- [x] O usuário deve poder visualizar o valor gasto do mês;
- [x] O usuário deve poder visualizar o valor gasto do dia;
- [x] O usuário deve poder deletar depesas;
- [x] O usuário deve poder deletar categorias;
- [x] O usuário deve poder deletar a própria conta;
- [x] O usuário deve poder atualizar as informações de seu perfil;
- [x] O usuário deve poder atualizar uma despesa;
- [x] O usuário deve poder atualizar uma categoria;
- [ ] O usuário deve poder filtrar seu histórico de despesas por período e por categoria.
- [ ] O usuário deve poder importar uma planilha contendo gastos para cadastramento em lote;
- [x] O usuário deve poder enviar o comprovante e o sistema deve extrair as informações;
- [x] O sistema deve sugerir valores e datas com base no comprovante;
- [x] O administrador deve poder visualizar todos os usuários.

### Requisitos Não-Funcionais (RNF)

- [x] A senha do usuário precisa estar em formato hash;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 15 itens por página; 
- [x] O banco de dados deve utilizar UUID v7 para performance e identificação;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token) entre as requisições;
- [x] Todos os usuários devem ser identificados pela permissão de "membro" ou "admin";
- [x] O Redis deve ser utilizado para cache e rate limiting;
- [x] O sistema deve possuir tratamento centralizado de erros;
- [x] O administrador não pode visualizar senhas dos usuários.
- [x] A API deve registrar logs de erros e auditoria;
- [x] Todas as rotas precisam estar documentadas utilizando o swagger;
- [ ] A API deve tratar as datas considerando o fuso horário do usuário/padronizar tudo em UTC no banco e fazer a conversão na camada de aplicação;
- [ ] Realizar integração com ferramenta externa de log: DataDog, NewRelic, Sentry;
- [ ] As imagens dos comprovantes devem ser armazenadas em um serviço de Object Storage (S3/R2);
- [x] Deve ser possível realizar o upload nos seguintes formatos: JPEG, PNG;

### Regras de Negócio (RN)

- [x] O usuário não deve poder se cadastrar com e-mail duplicado;
- [x] O usuário não deve poder cadastrar categorias com o mesmo título;
- [x] O usuário não deve poder deletar despesas de outro usuário;
- [x] O usuário não deve poder deletar categorias de outro usuário;
- [x] O usuário não deve poder deletar uma categoria com gastos vinculados;
- [x] O usuário não deve poder cadastrar mais que 15 categorias;
- [x] O usuário só pode atualizar despesas e categorias criadas por ele mesmo.
- [ ] Ao deletar uma conta, todas as despesas e categorias vinculadas devem ser deletadas em cascata;
- [x] O token de reset de senha deve expirar em 15 minutos e só pode ser usado uma vez;
- [x] O usuário que solicitou renovação de senha não pode cadastrar a mesma senha novamente;
- [ ] Se a planilha contiver um gasto com uma categoria que ultrapasse o limite de 15 categorias, ou se a linha estiver corrompida, o sistema deve rejeitar o lote inteiro e retornar um relatório de erros;
- [ ] Deve ter um limite de tamanho para o upload da foto (máximo 5MB);
- [x] O usuário só pode atualizar a própria despesa;
- [x] O usuário não deve poder atualizar a despesa com a mesma categoria já em uso por ela;
- [x] Os usuários, por padrão, recebem o cargo (permissão) de "membro";
- [x] O usuário não deve poder visualizar despesas de outros usuários;
- [x] O usuário não deve poder atualizar despesas de outros usuários;
- [x] O administrador pode visualizar todos os usuários;

## Fluxograma de Desenvolvimento

![alt text](fluxograma.png)

## Estrutura do Banco de Dados

### Entidades

- [x] Users
- [x] Expenses
- [x] Categories

### Relacionamentos

- Um usuário possui várias despesas
- Um usuário possui até 15 categorias
- Uma categoria pode possuir várias despesas
- Uma despesa pertence a uma categoria

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

- pnpm install vitest vite-tsconfig-paths -D
  [biblioteca para escrever testes unitários, integração e end to end]

- pnpm install @vitest/coverage-v8
  [biblioteca para exibir cobertura de testes nos casos de uso, validar se algum item não foi testado, deve utilizar no package: "test:coverage": "vitest run --coverage"]

- pnpm install -D @vitest/ui
  [uma inteface visual que destaca o relacionamento dos testes com os módulos da aplicação, deve utilizar no package: "test:ui": "vitest --ui"]

- set "DATABASE_URL=" && npx prisma migrate deploy
  [subir tabelas na hospedagem do banco de dados]

- Depreciações no tsconfig.json (TypeScript 5+)
  - Avisos de funções descontinuadas que deixarão de funcionar no TypeScript 7.0 (como baseUrl e moduleResolution: "node"):
    - Solução: Removar a propriedade "baseUrl", ajustar os mapeamentos de caminhos (paths) para o formato relativo "./" e atualize a estratégia de resolução de módulos:
    ```
    JSON
    {
      "compilerOptions": {
        "module": "NodeNext",
        moduleResolution": "NodeNext",
        "paths": {
          ["./src/*"]
        }
      }
    }
    ```
(Nota: Utilizar "moduleResolution": "Bundler", pois o build do projeto seja gerenciado pelo empacotador tsup).

- pnpm install @fastify/swagger @fastify/swagger-ui
[biblioteca swagger pare realizar o mapeamento de entrada e saída de dados, realizando uma documentação dos endpoints da API]

- pnpm install fastify-type-provider-zod
[biblioteca para realizar a integração do zod validation com a ferramenta de documentação swagger]

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

- pnpm create @eslint/config@latest
  [gera a base do arquivo de configuração e instala as dependências iniciais do ESLint e TypeScript]

- pnpm install -D prettier eslint-config-prettier prettier-plugin-tailwindcss eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
  [instala apenas o que o CLI do ESLint não instala: Prettier, suporte para Tailwind e plugins específicos de React Hooks/Refresh]

- configurar "eslint.config.ts" com plugins de React e Prettier
  [é necessário configurar o arquivo (que pode ser mantido em .ts nas versões atuais) para injetar os plugins "react-hooks", "react-refresh" e o "eslint-config-prettier". Isso garante a aplicação das regras do React 19 e evita que o ESLint brigue com a formatação do Prettier]

```Typescript
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "build", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  prettierConfig,
);
```

- criar ".prettierrc.mjs" na raiz do projeto
  [arquivo de configuração do Prettier usando padrão ESM. Inclui o "prettier-plugin-tailwindcss" para habilitar a ordenação automática das classes do Tailwind no atributo className ao salvar o arquivo]

```Javascript
/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
};
```

- criar ".prettierignore" na raiz do projeto
  [arquivo para o Prettier ignorar diretórios como "node_modules", "dist" e "build", evitando processamento desnecessário e lentidão durante a formatação automática]

```
node_modules
dist
build
```

- configurar "resolve.alias" no "vite.config.ts"
  [utiliza o módulo "path" do Node.js para mapear o caractere "@" diretamente para a pasta "src", permitindo resolver importações absolutas de forma manual sem dependências extras]

```Typescript
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

- adicionar "baseUrl" e "paths" no "tsconfig.json"
  [configuração obrigatória para que o TypeScript e o VS Code reconheçam o alias "@", habilitando o preenchimento automático (autocomplete) e a navegação entre arquivos]

```Typescript
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
```

- configurar ".vscode/settings.json" na pasta do projeto
  [configuração de workspace que define o Prettier como formatador padrão e ativa o "source.fixAll.eslint". Isso faz com que o VS Code corrija erros de lint e organize as classes do Tailwind automaticamente ao salvar (Ctrl + S)]

```Typescript
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
}
```

- pnpm i -D eslint-plugin-simple-import-sort
  [organiza importações dos arquivos no projeto]

```Typescript
  plugins: {
    react: pluginReact,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "simple-import-sort": simpleImportSort,
  },
  rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
```

- pnpm i react-hook-form zod @hookform/resolvers
  [lidar com formulário no react utilizando validação com o zod e habilitando integração entre as ferramentas com resolvers]

- pnpm install sonner
  [biblioteca de componente toast já estilizado e pronto para uso]

- pnpm i recharts
  [biblioteca para construção de gráficos do dashboard]

- pnpm install axios
  []

- pnpm install zod
  []

- pnpm install @tanstack/react-query
  []
