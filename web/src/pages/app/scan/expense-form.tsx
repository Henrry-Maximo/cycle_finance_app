import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ExpenseForm() {
  return (
    <div className="flex items-center justify-center">
      <form
        action=""
        className="flex flex-col items-center justify-center gap-8 px-16 py-12"
      >
        <div className="grid w-full grid-cols-2 gap-8">
          <Field>
            <FieldLabel
              htmlFor="title"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Título
            </FieldLabel>
            <Input
              id="title"
              type="text"
              placeholder="Digite o nome do produto(s)"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Descrição
            </FieldLabel>
            <Input
              id="description"
              type="text"
              placeholder="Digite uma descrição para a despesa"
            />
          </Field>
        </div>

        <div className="grid w-full grid-cols-2 gap-8">
          <Field>
            <FieldLabel
              htmlFor="enterprise"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Empresa
            </FieldLabel>
            <Input id="enterprise" type="text" value="Mercado Ceifa" disabled />
            <FieldDescription>
              Empresa obtida através do comprovante
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="cnpj"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              CNPJ
            </FieldLabel>
            <Input id="cnpj" type="text" value="XX.XXX.XXX/0001-XX" disabled />
            <FieldDescription>
              CNPJ obtido através do comprovante
            </FieldDescription>
          </Field>
        </div>

        <div className="flex w-full flex-col gap-8 md:grid md:grid-cols-5">
          <Field className="md:col-span-2">
            <FieldLabel
              htmlFor="source"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Estado/Município
            </FieldLabel>
            <Input
              id="source"
              type="text"
              value="Estado de São Paulo / Embu das Artes"
              disabled
            />
            <FieldDescription>
              Localização obtida através do comprovante
            </FieldDescription>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel
              htmlFor="price"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Preço
            </FieldLabel>
            <Input id="price" type="text" value="R$ 34.50" disabled />
            <FieldDescription>
              Preço obtido através do comprovante
            </FieldDescription>
          </Field>

          <Field className="md:col-span-1">
            <FieldLabel
              htmlFor="cart"
              className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
            >
              Cartão
            </FieldLabel>
            <Input id="cart" type="number" value="353" disabled />
            <FieldDescription>
              Digítos do cartão obtido através do comprovante
            </FieldDescription>
          </Field>
        </div>

        <Field>
          <FieldLabel
            htmlFor="category"
            className="text-foreground px-2 align-middle text-lg font-medium whitespace-break-spaces"
          >
            Categoria
          </FieldLabel>

          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-45">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              <SelectItem value="transport">Transporte</SelectItem>
              <SelectItem value="food">Alimentação</SelectItem>
              <SelectItem value="study">Estudo</SelectItem>
              <SelectItem value="home">Casa</SelectItem>
              <SelectItem value="leisure">Lazer</SelectItem>
            </SelectContent>
          </Select>

          <FieldDescription>
            Escolha uma categoria{' '}
            <span className="text-rose-500">
              (é necessário realizar o cadastro com antecedência).
            </span>
          </FieldDescription>
        </Field>

        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2 md:grid md:grid-cols-2">
            <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98] sm:grid-cols-1 md:grid-cols-2">
              Cadastrar Despesa
            </Button>
            <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98] sm:grid-cols-1 md:grid-cols-2">
              Analisar Comprovante Novamente
            </Button>
          </div>

          <FieldDescription className="w-72 text-center md:w-full">
            Cheque as informações acima e só proceda com o cadastro se tudo
            estiver correto. Caso o contrário, peça uma nova análise.
          </FieldDescription>
        </div>
      </form>
    </div>
  );
}
