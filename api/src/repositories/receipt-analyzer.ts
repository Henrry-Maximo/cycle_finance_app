export interface AnalyzeReceiptRequest {
  fileBuffer: Buffer;
  mimeType: "image/jpeg" | "image/png";
}

export interface AnalyzeReceiptResponse {
  date: string;
  store: string;
  cpfOrCNPJ: string;
  stateOrCity: string;
  amount: number;
  code: string;
}

export interface ReceiptAnalyzerProvider {
  execute(data: AnalyzeReceiptRequest): Promise<AnalyzeReceiptResponse>;
}
