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
        model: "gemini-3.5-flash-lite",
        contents: [
          imagePart,
          `
          Extraia TODOS os campos abaixo do comprovante. Sempre retorne os 6 campos.

            - date: data no formato YYYY-MM-DDTHH:mm:ss.SSSZ
            - store: nome do estabelecimento (ex: NOVA VISTA ALEGRE)
            - cpfOrCNPJ: CPF ou CNPJ
            - stateOrCity: cidade e/ou UF (ex: EMBU DAS ARTES/SP)
            - amount: valor total em decimal com ponto (ex: 24.98)
            - code: últimos 4 dígitos do cartão (ex: 7105)

            Regras:
            - Campo não encontrado ou ilegível → string vazia ""
            - amount não encontrado → 0
            - Não omita nenhum campo do JSON
            - Não invente dados
          `,
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              date: { type: "STRING" },
              store: { type: "STRING" },
              cpfOrCNPJ: { type: "STRING" },
              stateOrCity: { type: "STRING" },
              amount: { type: "NUMBER" },
              code: { type: "STRING" },
            },
            required: [
              "date",
              "store",
              "cpfOrCNPJ",
              "stateOrCity",
              "amount",
              "code",
            ],
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
