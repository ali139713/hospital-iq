-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "phone" TEXT NOT NULL,
    "emergency" BOOLEAN NOT NULL DEFAULT false,
    "beds" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "timings" TEXT NOT NULL,
    "established" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "hospitalId" TEXT NOT NULL,
    CONSTRAINT "Specialty_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Hospital_area_idx" ON "Hospital"("area");

-- CreateIndex
CREATE INDEX "Hospital_emergency_idx" ON "Hospital"("emergency");

-- CreateIndex
CREATE INDEX "Hospital_type_idx" ON "Hospital"("type");

-- CreateIndex
CREATE INDEX "Specialty_hospitalId_idx" ON "Specialty"("hospitalId");

-- CreateIndex
CREATE INDEX "Specialty_name_idx" ON "Specialty"("name");
