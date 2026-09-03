import { ApiError, type GoogleGenAI } from "@google/genai";

import { ai } from "@/lib/gemini";

import {
  AnalyzeReceiptRequest,
  AnalyzeReceiptResponse,
  ReceiptAnalyzerProvider,
} from "../../repositories/receipt-analyzer";
import { ExternalServiceUnavailableError } from "../errors/external-service-unavailable-error";
import { RequestPerMinutePerModelFreeError } from "../errors/request-per-minute-per-model-free-error";

export class GeminiReceiptAnalyzerProvider implements ReceiptAnalyzerProvider {
  // constructor(private ai: GoogleGenAI) {}
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

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          imagePart,
          "Extraia o título do estabelecimento ou nome do proprietário, valor total em decimal, data no formato YYYY-MM-DD, CPF OU CNPJ, os quatro digitos do cartão, cidade e estado. Entenda que alguns comprovantes são diferentes de outros. Ou seja, pode ter ou não as informações acima.",
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              amount: { type: "NUMBER" },
              date: { type: "STRING" },
              cpfOrCNPJ: { type: "STRING" },
              transactionId: { type: "STRING" },
              city: { type: "STRING" },
              state: { type: "STRING" },
            },
            required: ["title", "amount", "date", "transactionId"],
          },
        },
      });

      if (!response.text) {
        throw new ExternalServiceUnavailableError();
      }

      return JSON.parse(response.text);
    } catch (err) {
      if (err instanceof ApiError && err.status == 429) {
        throw new RequestPerMinutePerModelFreeError();
      }

      throw err;
    }
  }
}
