/*
  Warnings:

  - You are about to drop the `response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "response";

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Response_email_key" ON "Response"("email");
