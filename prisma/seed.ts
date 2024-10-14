import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Creating projek with associated ulasans
    // const projek = await prisma.projek.create({
    //     data: {
    //         lotNumber: "S12345",
    //         daerah: "Kuala Lumpur",
    //         mukim: "Bukit Bintang",
    //         koordinat_x: 3.1357,
    //         koordinat_y: 101.6880,
    //         xMin: 3.1357,
    //         yMin: 101.6880,
    //         xMax: 3.1357,
    //         yMax: 101.6880,
    //         tajukProjek: "Commercial Development",
    //         jenisPermohonan: "New Construction",
    //         noFail: "KL2024/01",
    //         status: "In Progress",
    //         bahagian: "Development",
    //         ulasans: {
    //             create: [
    //                 {
    //                     ulasan: "Initial Review - Everything looks good.",
    //                     folderPath: "/documents/review1.pdf",
    //                 },
    //                 {
    //                     ulasan: "Environmental Impact Assessment required.",
    //                     folderPath: "/documents/eia_report.pdf",
    //                 }
    //             ]
    //         }
    //     }
    // });

    console.log("Seeded projek with ulasans:", projek);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
