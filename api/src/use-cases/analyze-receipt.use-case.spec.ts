import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnalyzeReceiptUseCase } from "./analyze-receipt.use-case";
import { ReceiptAnalyzerProvider } from "../repositories/receipt-analyzer";

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
    const { suggestions } = await sut.execute({
      fileBuffer: Buffer.from("fake-image-data"),
      mimeType: "image/jpeg",
    });

    expect(suggestions.title).toBe("Mercado Central");
    expect(suggestions.amount).toBe(42.5);
  });

  // it("should not be able to analyze an invalid file type", async () => {
  //   const mockReceiptAnalyzer: ReceiptAnalyzerProvider = { execute: vi.fn() };
  //   const sut = new AnalyzeReceiptUseCase(mockReceiptAnalyzer);

  //   await expect(
  //     sut.execute({
  //       fileBuffer: Buffer.from("fake-pdf"),
  //       mimeType: "application/pdf",
  //     }),
  //   ).rejects.toThrow("Invalid file type. Only JPEG and PNG are allowed.");
  // });
});
