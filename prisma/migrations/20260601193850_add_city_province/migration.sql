-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hospital" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Lahore',
    "province" TEXT NOT NULL DEFAULT 'Punjab',
    "emergency" BOOLEAN NOT NULL DEFAULT false,
    "beds" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "timings" TEXT NOT NULL,
    "established" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Hospital" ("address", "area", "beds", "createdAt", "emergency", "established", "id", "lat", "lng", "name", "phone", "rating", "timings", "type", "updatedAt") SELECT "address", "area", "beds", "createdAt", "emergency", "established", "id", "lat", "lng", "name", "phone", "rating", "timings", "type", "updatedAt" FROM "Hospital";
DROP TABLE "Hospital";
ALTER TABLE "new_Hospital" RENAME TO "Hospital";
CREATE INDEX "Hospital_area_idx" ON "Hospital"("area");
CREATE INDEX "Hospital_city_idx" ON "Hospital"("city");
CREATE INDEX "Hospital_province_idx" ON "Hospital"("province");
CREATE INDEX "Hospital_emergency_idx" ON "Hospital"("emergency");
CREATE INDEX "Hospital_type_idx" ON "Hospital"("type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
