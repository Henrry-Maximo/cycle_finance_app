export interface AnalyzeReceiptRequest {
  fileBuffer: Buffer;
  mimeType: "image/jpeg" | "image/png";
}

export interface AnalyzeReceiptResponse {
  title: string;
  amount: number;
  date: string;
  cpfOrCNPJ: string;
  transactionId: string;
  city: string;
  state: string;
}

export interface ReceiptAnalyzerProvider {
  execute(data: AnalyzeReceiptRequest): Promise<AnalyzeReceiptResponse>;
}
