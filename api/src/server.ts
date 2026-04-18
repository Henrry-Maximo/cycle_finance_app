import { app } from "./app";
import { env } from "./env";

app
  .listen({
    host: "0.0.0.0", // habilita acesso externo ao servidor
    port: env.PORT, // porta do servidor
  })
  .then(() => {
    console.log("HTTP Server Running! 🚀");
  });
