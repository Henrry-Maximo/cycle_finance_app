import { makeAnalyzeReceiptUseCase } from "@/use-cases/factories/make-analyze-receipt-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function analyzeReceiptController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = await request.file();

  if (!data) {
    return reply.status(400).send({
      message: "O arquivo do comprovante é obrigatório.",
    });
  }

  try {
    const fileBuffer = await data.toBuffer();
    const analyzeReceiptUseCase = makeAnalyzeReceiptUseCase();

    const { suggestions } = await analyzeReceiptUseCase.execute({
      fileBuffer,
      mimeType: data.mimetype,
    });

    return reply.status(200).send({ suggestions });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Invalid file type")) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
