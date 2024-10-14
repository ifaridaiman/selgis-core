/*
  Warnings:

  - You are about to alter the column `koordinat_x` on the `Projek` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.
  - You are about to alter the column `koordinat_y` on the `Projek` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Projek] ALTER COLUMN [lotNumber] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Projek] ALTER COLUMN [koordinat_x] FLOAT(53) NOT NULL;
ALTER TABLE [dbo].[Projek] ALTER COLUMN [koordinat_y] FLOAT(53) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
