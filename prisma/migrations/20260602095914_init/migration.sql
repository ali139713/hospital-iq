-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Lahore',
    "province" TEXT NOT NULL DEFAULT 'Punjab',
    "emergency" BOOLEAN NOT NULL DEFAULT false,
    "beds" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "timings" TEXT NOT NULL,
    "established" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Hospital_area_idx" ON "Hospital"("area");

-- CreateIndex
CREATE INDEX "Hospital_city_idx" ON "Hospital"("city");

-- CreateIndex
CREATE INDEX "Hospital_province_idx" ON "Hospital"("province");

-- CreateIndex
CREATE INDEX "Hospital_emergency_idx" ON "Hospital"("emergency");

-- CreateIndex
CREATE INDEX "Hospital_type_idx" ON "Hospital"("type");

-- CreateIndex
CREATE INDEX "Specialty_hospitalId_idx" ON "Specialty"("hospitalId");

-- CreateIndex
CREATE INDEX "Specialty_name_idx" ON "Specialty"("name");

-- AddForeignKey
ALTER TABLE "Specialty" ADD CONSTRAINT "Specialty_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;
