-- CreateTable
CREATE TABLE "Projek" (
    "id" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "daerah" TEXT NOT NULL,
    "mukim" TEXT NOT NULL,
    "koordinat_x" DOUBLE PRECISION NOT NULL,
    "koordinat_y" DOUBLE PRECISION NOT NULL,
    "xMin" DOUBLE PRECISION NOT NULL,
    "yMin" DOUBLE PRECISION NOT NULL,
    "xMax" DOUBLE PRECISION NOT NULL,
    "yMax" DOUBLE PRECISION NOT NULL,
    "tajukProjek" TEXT NOT NULL,
    "jenisPermohonan" TEXT NOT NULL,
    "noFail" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bahagian" TEXT NOT NULL,

    CONSTRAINT "Projek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ulasan" (
    "id" SERIAL NOT NULL,
    "projekId" TEXT NOT NULL,
    "ulasan" TEXT NOT NULL,
    "folderPath" TEXT NOT NULL,

    CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_projekId_fkey" FOREIGN KEY ("projekId") REFERENCES "Projek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
