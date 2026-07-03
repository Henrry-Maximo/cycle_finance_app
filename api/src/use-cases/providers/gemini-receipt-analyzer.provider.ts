import { type GoogleGenAI } from "@google/genai";
import { z } from "zod";
import {
  AnalyzeReceiptRequest,
  AnalyzeReceiptResponse,
  ReceiptAnalyzerProvider,
} from "../../repositories/receipt-analyzer";
import { ai } from "@/lib/gemini";

const geminiSchema = z.object({
  title: z.string(),
  amount: z.number(),
  date: z.string(),
  category: z.string(),
});

export class GeminiReceiptAnalyzerProvider implements ReceiptAnalyzerProvider {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = ai;
  }

  async execute({
    fileBuffer,
    mimeType,
  }: AnalyzeReceiptRequest): Promise<AnalyzeReceiptResponse> {
    const imagePart = {
      inlineData: {
        data: fileBuffer.toString("base64"),
        mimeType,
      },
    };

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        imagePart,
        'Extraia o título do estabelecimento, valor total decimal, data no formato YYYY-MM-DD e uma categoria lógica deste comprovante (se não tiver categoria, deixe "coloque a categoria").',
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            amount: { type: "NUMBER" },
            date: { type: "STRING" },
            category: { type: "STRING" },
          },
          required: ["title", "amount", "date", "category"],
        },
      },
    });

    if (!response.text) {
      throw new Error("Gemini failed to return text.");
    }

    return geminiSchema.parse(JSON.parse(response.text));
  }
}
