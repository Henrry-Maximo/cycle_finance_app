import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true }); // validar que o usuário está autenticado, mas não olha o cabeçalho da requisição, mas sim para os cookies
  // se passar: refreshToken existe e ainda é válido -> gera novo token

  const token = await reply.jwtSign(
    {
      role: req.user.role,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "7d", // usuário perde autenticação se ficar 7 dias sem acessar
      },
    },
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/", // todas as rotas podem ler este cookie
      secure: true, // cookie encripitado via HTTPs
      sameSite: "none", // permite cross-site (Vercel + Render)
      httpOnly: true, // acessado somente pelo backend da aplicação (contexto da requisição/resposta)
    })
    .status(200)
    .send({
      token,
    });
}
