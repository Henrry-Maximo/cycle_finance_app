import { api } from '@/lib/axios';

interface ExpenseAnalyzeRequest {
  file: File;
}

interface ExpenseAnalyzeResponse {
  extracted: {
    title: string;
    amount: number;
    date: string;
    transactionId: string;
    city: string;
    cpfOrCNPJ: string;
    state: string;
  };
}

export async function ExpenseAnalyze({
  file,
}: ExpenseAnalyzeRequest): Promise<ExpenseAnalyzeResponse> {
  try {
    const formData = new FormData();
    formData.append('receipt', file);

    const response = await api.post<ExpenseAnalyzeResponse>(
      '/expenses/analyze',
      formData,
    );

    // if (response.status != 200) {
    //   throw new Error('Não foi possível realizar a leitura do comprovante.');
    // }

    const { extracted } = response.data;
    return { extracted };
  } catch {
    throw new Error('Houve um problema com a análise do comprovante.');
  }
}
