import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetMetricsUserUseCase } from "@/use-cases/factories/make-get-metrics-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getMeticsUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const getMetricsUserUseCase = makeGetMetricsUserUseCase();

    const {
      count_expenses_day,
      total_expenses_day,
      count_expenses_month,
      total_expenses_month,
    } = await getMetricsUserUseCase.execute({
      userId: req.user.sub,
    });

    return reply.status(200).send({
      count_expenses_day,
      total_expenses_day,
      count_expenses_month,
      total_expenses_month,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
