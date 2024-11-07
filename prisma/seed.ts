import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for Projek
  const projek1 = await prisma.projek.create({
    data: {
      lotNumber: '1002',
      daerah: 'Kuala Langat',
      mukim: 'Mukim Kelanang',
      koordinat_x: 101.59234676780704,
      koordinat_y: 3.264663480413145,
      tajukProjek: 'Projek Pantai',
      jenisPermohonan: 'Tebing Pantai',
      noFail: 'po021',
      status: 'Sokong dengan syarat',
      bahagian: 'Bahagian Pengurusan Zon Pantai, Pengairan dan Saliran Pertanian (BPZPPSP)',
      rings: `[
        [
          [11309223.836957322, 363764.38661855017],
          [11309536.751041874, 363470.5817910701],
          [11309125.902014831, 363525.5209051533],
          [11308879.870330032, 363668.84033319034],
          [11309223.836957322, 363764.38661855017]
        ]
      ]`,
      panjang: '100',
      luas: '200',
      tajukSurat: 'Surat Sokongan Projek Pantai',

      ulasans: {
        create: [
          {
            ulasan: 'Projek ini disokong dengan syarat tertentu.',
            folderPath: 'C:\\fakepath\\Commitment Bulanan Farid.xlsx'
          },
          {
            ulasan: 'Perlu pemantauan tambahan di kawasan tersebut.',
            folderPath: 'C:\\fakepath\\Pemantauan Kawasan.xlsx'
          }
        ]
      }
    }
  });

  console.log({ projek1 });
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
