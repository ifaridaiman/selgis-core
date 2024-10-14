/*
  Warnings:

  - Added the required column `xMax` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xMin` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yMax` to the `Projek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yMin` to the `Projek` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Projek] ADD [xMax] FLOAT(53) NOT NULL,
[xMin] FLOAT(53) NOT NULL,
[yMax] FLOAT(53) NOT NULL,
[yMin] FLOAT(53) NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Projek_lotNumber_idx] ON [dbo].[Projek]([lotNumber]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Projek_tajukProjek_idx] ON [dbo].[Projek]([tajukProjek]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
