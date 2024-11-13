import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed `Projek` data
  const projek1 = await prisma.projek.create({
    data: {
      lotNumber: '4001',
      daerah: 'Klang',
      mukim: 'Mukim Kapar',
      koordinat_x: 101.5923,
      koordinat_y: 3.2646,
      tajukProjek: 'Projek Sungai Kuari',
      jenisPermohonan: 'Kuari/ Perlombongan',
      noFail: 'SG001',
      status: 'Ulasan Teknikal',
      bahagian: 'Bahagian Pengurusan Sungai',
      rings: `[[[11309223.836957322, 363764.38661855017], [11309536.751041874, 363470.5817910701], [11309125.902014831, 363525.5209051533], [11308879.870330032, 363668.84033319034], [11309223.836957322, 363764.38661855017]]]`,
      panjang: '100',
      luas: '250',
      tajukSurat: 'Surat Ulasan Teknikal Kuari',
      tarikhUlasan: new Date('2024-01-15'),
    },
  });

  const projek2 = await prisma.projek.create({
    data: {
      lotNumber: '4002',
      daerah: 'Klang',
      mukim: 'Mukim Kapar',
      koordinat_x: 101.582,
      koordinat_y: 3.268,
      tajukProjek: 'Projek Sungai Rizab',
      jenisPermohonan: 'Penggunaan rizab sungai',
      noFail: 'SG002',
      status: 'Tidak Lengkap',
      bahagian: 'Bahagian Pengurusan Sungai',
      rings: `[[[11309223.836957322, 363764.38661855017], [11309536.751041874, 363470.5817910701], [11309125.902014831, 363525.5209051533], [11308879.870330032, 363668.84033319034], [11309223.836957322, 363764.38661855017]]]`,
      panjang: '110',
      luas: '260',
      tajukSurat: 'Surat Tidak Lengkap Rizab Sungai',
      tarikhUlasan: new Date('2024-02-10'),
    },
  });

  // Add `Ulasan` entries for each `Projek`
  await prisma.ulasan.createMany({
    data: [
      {
        projekId: projek1.id,
        ulasan: 'Projek ini disokong dengan syarat tambahan.',
        folderPath: 'C:\\docs\\UlasanProjek1-1.pdf',
      },
      {
        projekId: projek1.id,
        ulasan: 'Pemantauan berkala diperlukan untuk keselamatan.',
        folderPath: 'C:\\docs\\UlasanProjek1-2.pdf',
      },
      {
        projekId: projek2.id,
        ulasan: 'Dokumen tidak lengkap, perlu data tambahan.',
        folderPath: 'C:\\docs\\UlasanProjek2-1.pdf',
      },
      {
        projekId: projek2.id,
        ulasan: 'Syarat kelulusan tambahan diperlukan.',
        folderPath: 'C:\\docs\\UlasanProjek2-2.pdf',
      },
    ],
  });

  console.log({ projek1, projek2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
