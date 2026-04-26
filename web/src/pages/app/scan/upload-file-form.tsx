import { UploadSimpleIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export function UploadFileForm() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-accent-foreground text-3xl font-semibold tracking-tight">
          Faça o upload!
        </h1>
        <p className="text-muted-foreground text-sm">
          Anexe seu comprovante de compra para análise.
        </p>
      </header>

      <form className="flex flex-col gap-6">
        <div className="flex items-center justify-center space-y-4">
          <Button className="flex h-full flex-col gap-2 rounded-sm border-2 border-dashed border-slate-400 bg-zinc-900 px-8 py-8 text-white shadow-lg transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-95 active:scale-[0.98]">
            <UploadSimpleIcon className="h-16 w-16" />
            <span>UPLOAD</span>
          </Button>
        </div>

        <Button className="h-11 w-full bg-zinc-900 text-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-800 hover:text-blue-400 active:scale-[0.98]">
          Enviar para Análise
        </Button>
      </form>
    </div>
  );
}
