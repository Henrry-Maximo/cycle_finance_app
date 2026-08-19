import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ExpenseForm } from './expense-form';
import { UploadFileForm } from './upload-file-form';

export function Scan() {
  const [isSubmitFileUpload] = useState(false);

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

      {isSubmitFileUpload ? <ExpenseForm /> : <UploadFileForm />}
    </>
  );
}
