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
        <label className="bg-accent flex w-full max-w-sm flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-8 py-8 text-white shadow-sm transition-all hover:cursor-pointer hover:border-blue-600 hover:bg-blue-50/50 hover:text-blue-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800">
          <input type="file" accept="image/*" className="hidden" />
          <UploadSimpleIcon className="h-12 w-12 text-slate-500 group-hover:text-blue-600" />
          <span className="font-semibold tracking-wider text-slate-500 uppercase">
            Upload
          </span>
        </label>

        <Button className="text-foreground h-11 w-full bg-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-200 hover:text-blue-700 active:scale-[0.98] dark:bg-zinc-900 dark:hover:border-blue-800">
          Enviar para Análise
        </Button>
      </form>
    </div>
  );
}
