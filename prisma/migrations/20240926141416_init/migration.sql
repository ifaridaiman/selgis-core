/*
  Warnings:

  - You are about to drop the column `Bahagian` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `Daerah` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `JenisPermohonan` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `Koordinat_x` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `Koordinat_y` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `Mukim` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `NoFail` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Projek` table. All the data in the column will be lost.
  - You are about to drop the column `TajukProjek` on the `Projek` table. All the data in the column will be lost.
  - Added the required column `bahagian` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `daerah` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisPermohonan` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `koordinat_x` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `koordinat_y` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mukim` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noFail` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tajukProjek` to the `Projek` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Projek] DROP COLUMN [Bahagian],
[Daerah],
[JenisPermohonan],
[Koordinat_x],
[Koordinat_y],
[Mukim],
[NoFail],
[Status],
[TajukProjek];
ALTER TABLE [dbo].[Projek] ADD [bahagian] NVARCHAR(1000) NOT NULL,
[daerah] NVARCHAR(1000) NOT NULL,
[jenisPermohonan] NVARCHAR(1000) NOT NULL,
[koordinat_x] NVARCHAR(1000) NOT NULL,
[koordinat_y] NVARCHAR(1000) NOT NULL,
[mukim] NVARCHAR(1000) NOT NULL,
[noFail] NVARCHAR(1000) NOT NULL,
[status] NVARCHAR(1000) NOT NULL,
[tajukProjek] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
