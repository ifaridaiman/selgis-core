BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [sde].[Projek] (
    [id] NVARCHAR(1000) NOT NULL,
    [lotNumber] NVARCHAR(1000) NOT NULL,
    [daerah] NVARCHAR(1000) NOT NULL,
    [mukim] NVARCHAR(1000) NOT NULL,
    [koordinat_x] FLOAT(53) NOT NULL,
    [koordinat_y] FLOAT(53) NOT NULL,
    [xMin] FLOAT(53) NOT NULL,
    [yMin] FLOAT(53) NOT NULL,
    [xMax] FLOAT(53) NOT NULL,
    [yMax] FLOAT(53) NOT NULL,
    [tajukProjek] NVARCHAR(1000) NOT NULL,
    [jenisPermohonan] NVARCHAR(1000) NOT NULL,
    [noFail] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [bahagian] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Projek_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [sde].[Ulasan] (
    [id] INT NOT NULL IDENTITY(1,1),
    [projekId] NVARCHAR(1000) NOT NULL,
    [ulasan] NVARCHAR(1000) NOT NULL,
    [folderPath] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Ulasan_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [sde].[Ulasan] ADD CONSTRAINT [Ulasan_projekId_fkey] FOREIGN KEY ([projekId]) REFERENCES [sde].[Projek]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
