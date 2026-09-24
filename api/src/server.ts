import { app } from "./app";
import { env } from "./env";
import { prisma } from "./lib/prisma";
import { redisClient } from "./lib/redis";

async function main() {
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`.catch(() => {
    throw new Error("Failed to connect to database");
  });

  await redisClient.ping().catch(() => {
    throw new Error("Failed to connect to Redis");
  });

  await app.listen({
    host: "0.0.0.0",
    port: env.PORT,
  });
}

main()
  .then(() => {
    console.log(`HTTP Server Running! 🚀`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
