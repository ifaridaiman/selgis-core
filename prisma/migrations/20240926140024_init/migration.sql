/*
  Warnings:

  - Added the required column `folderPath` to the `Ulasan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulasan` to the `Ulasan` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Ulasan] ADD [folderPath] NVARCHAR(1000) NOT NULL,
[ulasan] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Projek] (
    [id] INT NOT NULL IDENTITY(1,1),
    [lotNumber] INT NOT NULL,
    [Daerah] NVARCHAR(1000) NOT NULL,
    [Mukim] NVARCHAR(1000) NOT NULL,
    [Koordinat_x] NVARCHAR(1000) NOT NULL,
    [Koordinat_y] NVARCHAR(1000) NOT NULL,
    [TajukProjek] NVARCHAR(1000) NOT NULL,
    [JenisPermohonan] NVARCHAR(1000) NOT NULL,
    [NoFail] NVARCHAR(1000) NOT NULL,
    [Status] NVARCHAR(1000) NOT NULL,
    [Bahagian] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Projek_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
