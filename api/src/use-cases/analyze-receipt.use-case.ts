import { FileBufferCannotBeEmptyError } from "./errors/file-buffer-cannot-be-empty-error";
import { InvalidFileTypeError } from "./errors/invalid-file-type-error";
import {
  AnalyzeReceiptResponse,
  ReceiptAnalyzerProvider,
} from "../repositories/receipt-analyzer";

interface AnalyzeReceiptUseCaseRequest {
  fileBuffer: Buffer;
  mimeType: string;
}

interface AnalyzeReceiptUseCaseResponse {
  suggestions: AnalyzeReceiptResponse;
}

export class AnalyzeReceiptUseCase {
  constructor(private receiptAnalyzer: ReceiptAnalyzerProvider) {}

  async execute({
    fileBuffer,
    mimeType,
  }: AnalyzeReceiptUseCaseRequest): Promise<AnalyzeReceiptUseCaseResponse> {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(mimeType)) {
      throw new InvalidFileTypeError();
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new FileBufferCannotBeEmptyError();
    }

    const suggestions = await this.receiptAnalyzer.execute({
      fileBuffer,
      mimeType: mimeType as "image/jpeg" | "image/png",
    });

    return { suggestions };
  }
}
