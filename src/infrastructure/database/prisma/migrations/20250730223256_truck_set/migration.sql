-- CreateTable
CREATE TABLE "TruckSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "dedicatedFleet" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "blockedDescription" TEXT,
    "createdAt" DATETIME NOT NULL,
    "truckTractorId" TEXT NOT NULL,
    "cartOneId" TEXT NOT NULL,
    "cartTwoId" TEXT NOT NULL,
    "cartThreeId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "TruckSet_truckTractorId_fkey" FOREIGN KEY ("truckTractorId") REFERENCES "TruckTractor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_cartOneId_fkey" FOREIGN KEY ("cartOneId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_cartTwoId_fkey" FOREIGN KEY ("cartTwoId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_cartThreeId_fkey" FOREIGN KEY ("cartThreeId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TruckSet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
