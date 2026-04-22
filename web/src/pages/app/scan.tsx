import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";

export function Scan() {
  return (
    <>
      <Helmet title="Scan" />

      {/* <div className="flex flex-col gap-8 w-full  bg-black justify-center items-center h-screen">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-200">
            Faça o upload!
          </h1>
          <p className="text-sm text-stone-400">
            Anexe seu comprovante de compra para análise.
          </p>
        </header>

        <form className="flex flex-col gap-6">
          <div className="flex space-y-4 justify-center items-center">
            <Button className="flex flex-col gap-2 h-full bg-zinc-900 border-dashed border-2 border-slate-400 rounded-sm hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-400 text-white transition-all active:scale-[0.98] px-8 py-8 active:scale-95 shadow-lg">
              <UploadSimpleIcon className="h-16 w-16" />
              <span>UPLOAD</span>
            </Button>
          </div>

          <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-400 text-white transition-all shadow-sm active:scale-[0.98]">
            Enviar para Análise
          </Button>
        </form>
      </div> */}

      <div className="flex h-screen w-full justify-center items-center bg-black">
        <form
          action=""
          className="flex flex-col gap-8 justify-center items-center px-16 py-12 text-white"
        >
          <div className="grid grid-cols-2 w-full gap-8">
            <Field>
              <FieldLabel htmlFor="">Título</FieldLabel>
              <Input
                id=""
                type="text"
                placeholder="Digite o nome do produto(s)"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="">Descrição</FieldLabel>
              <Input
                id=""
                type="text"
                placeholder="Digite uma descrição para a despesa"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 w-full gap-8">
            <Field>
              <FieldLabel htmlFor="">Empresa</FieldLabel>
              <Input id="" type="text" value="Mercado Ceifa" disabled />
              <FieldDescription>
                Empresa obtida através do comprovante
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="">CNPJ</FieldLabel>
              <Input id="" type="text" value="XX.XXX.XXX/0001-XX" disabled />
              <FieldDescription>
                CNPJ obtido através do comprovante
              </FieldDescription>
            </Field>
          </div>

          <div className="grid grid-cols-3 w-full gap-8">
            <Field>
              <FieldLabel htmlFor="">Estado/Município</FieldLabel>
              <Input
                id=""
                type="text"
                value="Estado de São Paulo / Embu das Artes"
                disabled
              />
              <FieldDescription>
                Localização obtida através do comprovante
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="">Preço</FieldLabel>
              <Input id="" type="text" value="R$ 34.50" disabled />
              <FieldDescription>
                Preço obtido através do comprovante
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="">Cartão</FieldLabel>
              <Input id="" type="number" value="353" disabled />
              <FieldDescription>
                Digítos do cartão obtido através do comprovante
              </FieldDescription>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="">Categoria</FieldLabel>
            <Input
              id=""
              type="text"
              value=""
              placeholder="Escolha uma categoria"
            />
            <FieldDescription>
              Escolha uma categoria.{" "}
              <span className="text-red-600">
                (é necessário realizar o cadastro com antecedência)
              </span>
            </FieldDescription>
          </Field>

          <div className="flex flex-col gap-2 mt-8 items-center justify-center">
            <div className="flex gap-2 items-center justify-center">
              <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-400 text-white transition-all shadow-sm active:scale-[0.98]">
                Cadastrar Despesa
              </Button>
              <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-400 text-white transition-all shadow-sm active:scale-[0.98]">
                Analisar Comprovante Novamente
              </Button>
            </div>

            <FieldDescription className="text-center">
              Cheque as informações acima e só proceda com o cadastro se tudo
              estiver correto. Caso o contrário, peça uma nova análise.
            </FieldDescription>
          </div>
        </form>
      </div>
    </>
  );
}
