/*
  Warnings:

  - You are about to drop the `CategoryImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN "description" TEXT;
ALTER TABLE "Category" ADD COLUMN "image" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CategoryImage";
PRAGMA foreign_keys=on;
