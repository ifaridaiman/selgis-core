import { z } from 'zod';

export const ulasanSchema = z.object({
    lotNumber: z.string().min(1, "Lot number is required."),
    daerah: z.string().min(1, "Daerah is required."),
    mukim: z.string().min(1, "Mukim is required."),
    kordinatX: z.string().min(1, "Kordinat X is required."),
    kordinatY: z.string().min(1, "Kordinat Y is required."),
    tajukProjek: z.string().min(1, "Project title (tajuk projek) is required."),
    jenisPermohonan: z.string().min(1, "Jenis permohonan is required."),
    noFail: z.string().min(1, "File number (no fail) is required."),
    status: z.string().min(1, "Status is required."),
    bahagian: z.string().min(1, "Bahagian is required."),
    ulasan: z.string().min(1, "Ulasan is required."),
    folderPath: z.string().min(1, "Folder path is required."),
    xMin: z.number({ required_error: "xMin must be a number." }).optional(),
    xMax: z.number({ required_error: "xMax must be a number." }).optional(),
    yMin: z.number({ required_error: "yMin must be a number." }).optional(),
    yMax: z.number({ required_error: "yMax must be a number." }).optional(),
    panjang: z.number({ required_error: "Panjang must be a number." }).optional(),
    luas: z.number({ required_error: "Luas must be a number." }).optional(),
});
