/*
  Warnings:

  - You are about to drop the column `profilePicUrl` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePicUrl",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "passwordHash" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");
