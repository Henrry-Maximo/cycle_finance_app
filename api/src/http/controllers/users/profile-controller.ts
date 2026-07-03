import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-fetch-user-profile-use-case";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  // await req.jwtVerify(); // responsável por verificar se o token é valido & criamos uma função pra validar "verifyJWT"

  // console.log(req.user); // exibe informações do payload do JWT
  // console.log(req.user.sub); // exibe id do usuário

  // const getUserProfileBodySchema = z.object({
  //   userId: z.string().min(1),
  // });

  // const { userId } = getUserProfileBodySchema.parse(req.body);
  // console.log(req.headers); // authorization header bearer

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute({
      userId: req.user.sub,
    });

    return reply.status(200).send({
      ...user,
      password_hash: undefined,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    // return reply.status(500).send(); // TODO: fix me
    throw err;
  }
}
