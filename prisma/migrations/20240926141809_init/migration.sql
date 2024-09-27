/*
  Warnings:

  - The primary key for the `Projek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `projekId` to the `Ulasan` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Ulasan] ADD [projekId] NVARCHAR(1000) NOT NULL;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Projek'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Projek] (
    [id] NVARCHAR(1000) NOT NULL,
    [lotNumber] INT NOT NULL,
    [daerah] NVARCHAR(1000) NOT NULL,
    [mukim] NVARCHAR(1000) NOT NULL,
    [koordinat_x] NVARCHAR(1000) NOT NULL,
    [koordinat_y] NVARCHAR(1000) NOT NULL,
    [tajukProjek] NVARCHAR(1000) NOT NULL,
    [jenisPermohonan] NVARCHAR(1000) NOT NULL,
    [noFail] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [bahagian] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Projek_pkey] PRIMARY KEY CLUSTERED ([id])
);
IF EXISTS(SELECT * FROM [dbo].[Projek])
    EXEC('INSERT INTO [dbo].[_prisma_new_Projek] ([bahagian],[daerah],[id],[jenisPermohonan],[koordinat_x],[koordinat_y],[lotNumber],[mukim],[noFail],[status],[tajukProjek]) SELECT [bahagian],[daerah],[id],[jenisPermohonan],[koordinat_x],[koordinat_y],[lotNumber],[mukim],[noFail],[status],[tajukProjek] FROM [dbo].[Projek] WITH (holdlock tablockx)');
DROP TABLE [dbo].[Projek];
EXEC SP_RENAME N'dbo._prisma_new_Projek', N'Projek';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Ulasan] ADD CONSTRAINT [Ulasan_projekId_fkey] FOREIGN KEY ([projekId]) REFERENCES [dbo].[Projek]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
