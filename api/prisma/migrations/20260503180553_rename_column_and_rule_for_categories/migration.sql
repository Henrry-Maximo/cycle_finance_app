/*
  Warnings:

  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `CNPJ` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `expenses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,title]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "CNPJ",
DROP COLUMN "createdAt",
ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "categories_user_id_title_key" ON "categories"("user_id", "title");
