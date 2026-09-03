import { beforeEach,describe, expect, it, vi } from "vitest";

import { ReceiptAnalyzerProvider } from "../repositories/receipt-analyzer";
import { AnalyzeReceiptUseCase } from "./analyze-receipt.use-case";
import { FileBufferCannotBeEmptyError } from "./errors/file-buffer-cannot-be-empty-error";
import { InvalidFileTypeError } from "./errors/invalid-file-type-error";

let sut: AnalyzeReceiptUseCase;

describe("Analyze Receipt Use Case", () => {
  beforeEach(() => {
    const mockReceiptAnalyzer: ReceiptAnalyzerProvider = {
      execute: vi.fn().mockResolvedValue({
        title: "Mercado Central",
        amount: 42.5,
        date: "2026-07-02",
        category: "Alimentação",
      }),
    };

    sut = new AnalyzeReceiptUseCase(mockReceiptAnalyzer);
  });

  it("should be able to analyze a valid receipt image", async () => {
    const { extracted } = await sut.execute({
      fileBuffer: Buffer.from("fake-image-data"),
      mimeType: "image/jpeg",
    });

    expect(extracted.title).toBe("Mercado Central");
    expect(extracted.amount).toBe(42.5);
  });

  it("should not be able to analyze an invalid file type", async () => {
    const mockReceiptAnalyzer: ReceiptAnalyzerProvider = { execute: vi.fn() };
    const sut = new AnalyzeReceiptUseCase(mockReceiptAnalyzer);

    await expect(
      sut.execute({
        fileBuffer: Buffer.from("fake-pdf"),
        mimeType: "application/pdf",
      }),
    ).rejects.toBeInstanceOf(InvalidFileTypeError);
  });

  it("should not be able to analyze with an empty file buffer", async () => {
    const mockReceiptAnalyzer: ReceiptAnalyzerProvider = { execute: vi.fn() };
    const sut = new AnalyzeReceiptUseCase(mockReceiptAnalyzer);

    await expect(
      sut.execute({
        fileBuffer: Buffer.alloc(0),
        mimeType: "image/jpeg",
      }),
    ).rejects.toBeInstanceOf(FileBufferCannotBeEmptyError);
  });

  it("should not be able to analyze with a null file buffer", async () => {
    const mockReceiptAnalyzer: ReceiptAnalyzerProvider = { execute: vi.fn() };
    const sut = new AnalyzeReceiptUseCase(mockReceiptAnalyzer);

    await expect(
      sut.execute({
        fileBuffer: null as unknown as Buffer,
        mimeType: "image/jpeg",
      }),
    ).rejects.toBeInstanceOf(FileBufferCannotBeEmptyError);
  });
});
