import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function run() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password_hash: await hash("123456", 6),
      role: "ADMIN",
    },
  });
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
