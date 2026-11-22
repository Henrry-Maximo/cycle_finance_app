import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ExpenseForm } from './expense-form';
import { UploadFileForm } from './upload-file-form';
import type { ExpenseAnalyzeResponse } from '@/api/expense-analyze';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Scan() {
  const [isSubmitFileUpload, setIsSubmitFileUpload] = useState(false);
  const [extracted, setExtracted] = useState<ExpenseAnalyzeResponse | null>(
    null,
  );

  return (
    <>
      <Helmet title="Scan" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Escanear</h1>
        {isSubmitFileUpload && (
          <p className="text-muted-foreground text-xs/relaxed">
            Alguns campos não podem ser editados, é necessário gerar uma nova
            análise.
          </p>
        )}
        {isSubmitFileUpload && extracted ? (
          <>
            <ExpenseForm
              data={extracted}
              setIsSubmitFileUpload={setIsSubmitFileUpload}
            />

            {/* <Button
              className="w-64"
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitFileUpload(false)}
            >
              Nova Análise
            </Button> */}
          </>
        ) : (
          <UploadFileForm
            onSuccess={(data) => {
              setExtracted(data);
              setIsSubmitFileUpload(true);
            }}
          />
        )}

        {!isSubmitFileUpload && !extracted && (
          <div className="flex w-full justify-center">
            <div className="flex w-44 items-center justify-center gap-2">
              <Separator orientation="horizontal" className="w-2"></Separator>
              <span>OU</span>
              <Separator orientation="horizontal" className="w-2"></Separator>
            </div>
          </div>
        )}

        <div className="flex w-full items-center justify-center gap-2">
          {!isSubmitFileUpload && !extracted && (
            <Button
              type="button"
              variant="ghost"
              className="h-8 w-full cursor-pointer hover:border-2 hover:border-zinc-100 md:w-auto"
              onClick={() => {
                setExtracted({
                  store: '',
                  cpfOrCNPJ: '',
                  stateOrCity: '',
                  amount: 0,
                  code: '',
                  date: new Date().toISOString(),
                });
                setIsSubmitFileUpload(true);
              }}
            >
              Cadastro Manual
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
