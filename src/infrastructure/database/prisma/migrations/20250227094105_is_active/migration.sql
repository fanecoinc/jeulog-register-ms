/*
  Warnings:

  - Added the required column `isActive` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "legalPerson" BOOLEAN NOT NULL,
    "document" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "polygon" TEXT NOT NULL,
    "isHeadquarter" BOOLEAN NOT NULL,
    "isOrigin" BOOLEAN NOT NULL,
    "isDestiny" BOOLEAN NOT NULL,
    "isCarrier" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Person" ("cep", "city", "createdAt", "deletedAt", "document", "id", "isCarrier", "isDestiny", "isHeadquarter", "isOrigin", "key", "latitude", "legalPerson", "longitude", "name", "polygon", "state", "updatedAt") SELECT "cep", "city", "createdAt", "deletedAt", "document", "id", "isCarrier", "isDestiny", "isHeadquarter", "isOrigin", "key", "latitude", "legalPerson", "longitude", "name", "polygon", "state", "updatedAt" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_key_key" ON "Person"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
