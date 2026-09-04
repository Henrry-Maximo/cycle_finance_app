import { FastifyReply, FastifyRequest } from "fastify";

export async function logout(_: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("refreshToken", {
    secure: true, // cookie encripitado via HTTPs
    sameSite: true, // cookie somente acessível dentro do mesmo domínio
    httpOnly: true, // acessado somente pelo backend da aplicação (contexto da requisição/resposta)
  });

  return reply.status(200).send({ message: "Logout realizado com sucesso!" });
}
