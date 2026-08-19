import { UploadSimpleIcon } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { ExpenseAnalyze } from '@/api/expense-analyze';
import { Button } from '@/components/ui/button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const expenseAnalyzeProps = z.object({
  file: z.instanceof(File),
});

type ExpenseAnalyzeProps = z.infer<typeof expenseAnalyzeProps>;

export function UploadFileForm() {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const { handleSubmit } = useForm<ExpenseAnalyzeProps>();

  const { mutateAsync: ExpenseAnalyzeFn } = useMutation({
    mutationFn: ExpenseAnalyze,
  });

  async function handleFileUpload(data: ExpenseAnalyzeProps) {
    await ExpenseAnalyzeFn({
      file: data.file,
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleFileUpload)}
      >
        <label className="bg-accent flex w-full max-w-sm flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-8 py-8 text-white shadow-sm transition-all hover:cursor-pointer hover:border-blue-600 hover:bg-blue-50/50 hover:text-blue-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-500 dark:hover:bg-zinc-800">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <UploadSimpleIcon className="h-12 w-12 text-slate-500 group-hover:text-blue-600" />
          <span className="font-semibold tracking-wider text-slate-500 uppercase">
            Upload
          </span>
        </label>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}

        <Button
          type="submit"
          className="text-foreground h-11 w-full bg-white shadow-sm transition-all hover:cursor-pointer hover:border-2 hover:border-blue-600 hover:bg-zinc-200 hover:text-blue-700 active:scale-[0.98] dark:bg-zinc-900 dark:hover:border-blue-800"
        >
          Enviar para Análise
        </Button>
      </form>
    </div>
  );
}
