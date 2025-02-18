/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" DROP NOT NULL;
