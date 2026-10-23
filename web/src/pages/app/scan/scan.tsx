import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ExpenseForm } from './expense-form';
import { UploadFileForm } from './upload-file-form';
import type { ExpenseAnalyzeResponse } from '@/api/expense-analyze';

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
      </div>

      {isSubmitFileUpload && extracted ? (
        <ExpenseForm data={extracted} />
      ) : (
        <UploadFileForm
          onSuccess={(data) => {
            setExtracted(data);
            setIsSubmitFileUpload(true);
          }}
        />
      )}
    </>
  );
}
