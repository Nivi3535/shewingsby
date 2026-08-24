/*
  Warnings:

  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `CategoryImage` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("createdAt", "gender", "id", "name", "updatedAt") SELECT "createdAt", "gender", "id", "name", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE TABLE "new_CategoryImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "CategoryImage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CategoryImage" ("categoryId", "id", "image") SELECT "categoryId", "id", "image" FROM "CategoryImage";
DROP TABLE "CategoryImage";
ALTER TABLE "new_CategoryImage" RENAME TO "CategoryImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
