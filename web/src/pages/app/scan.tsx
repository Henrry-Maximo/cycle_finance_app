import { Button } from "@/components/ui/button";
import { UploadSimpleIcon } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";

export function Scan() {
  return (
    <>
      <Helmet title="Scan" />

      <div className="flex flex-col gap-8 w-full  bg-black justify-center items-center h-screen">
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
      </div>
    </>
  );
}