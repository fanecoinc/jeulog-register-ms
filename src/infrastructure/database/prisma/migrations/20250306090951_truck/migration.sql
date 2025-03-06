-- CreateTable
CREATE TABLE "TruckTractor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "isTruck" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "TruckTractor_plate_key" ON "TruckTractor"("plate");
