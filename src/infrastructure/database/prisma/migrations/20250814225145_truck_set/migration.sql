/*
  Warnings:

  - You are about to drop the column `isBlocked` on the `TruckSet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TruckSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "dedicatedFleet" BOOLEAN NOT NULL DEFAULT false,
    "blockedDescription" TEXT,
    "createdAt" DATETIME NOT NULL,
    "truckTractorId" TEXT NOT NULL,
    "cartOneId" TEXT,
    "cartTwoId" TEXT,
    "cartThreeId" TEXT,
    "ownerId" TEXT NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "TruckSet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_cartThreeId_fkey" FOREIGN KEY ("cartThreeId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_cartTwoId_fkey" FOREIGN KEY ("cartTwoId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_cartOneId_fkey" FOREIGN KEY ("cartOneId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_truckTractorId_fkey" FOREIGN KEY ("truckTractorId") REFERENCES "TruckTractor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TruckSet" ("blockedDescription", "cartOneId", "cartThreeId", "cartTwoId", "createdAt", "dedicatedFleet", "deletedAt", "id", "ownerId", "status", "truckTractorId", "updatedAt") SELECT "blockedDescription", "cartOneId", "cartThreeId", "cartTwoId", "createdAt", "dedicatedFleet", "deletedAt", "id", "ownerId", "status", "truckTractorId", "updatedAt" FROM "TruckSet";
DROP TABLE "TruckSet";
ALTER TABLE "new_TruckSet" RENAME TO "TruckSet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
