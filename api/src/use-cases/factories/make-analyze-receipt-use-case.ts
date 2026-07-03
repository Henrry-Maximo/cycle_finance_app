import { AnalyzeReceiptUseCase } from "../analyze-receipt.use-case";
import { GeminiReceiptAnalyzerProvider } from "../providers/gemini-receipt-analyzer.provider";

export function makeAnalyzeReceiptUseCase() {
  const geminiProvider = new GeminiReceiptAnalyzerProvider();
  const useCase = new AnalyzeReceiptUseCase(geminiProvider);

  return useCase;
}
