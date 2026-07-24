import { ExternalServiceUnavailableError } from "@/use-cases/errors/external-service-unavailable-error";
import { RequestPerMinutePerModelFreeError } from "@/use-cases/errors/request-per-minute-per-model-free-error";
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

    const { extracted } = await analyzeReceiptUseCase.execute({
      fileBuffer,
      mimeType: data.mimetype,
    });

    return reply.status(200).send({ extracted });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Invalid file type")) {
      return reply.status(400).send({ message: error.message });
    }

    if (error instanceof ExternalServiceUnavailableError) {
      return reply.status(503).send({ message: error.message });
    }

    if (error instanceof RequestPerMinutePerModelFreeError) {
      return reply.status(429).send({ message: error.message });
    }

    throw error;
  }
}
