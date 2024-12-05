
export type CiptaUlasanFormType = {
  lotNumber: string;
  daerah: string;
  mukim: string;
  kordinatX: string;
  kordinatY: string;
  tajukProjek: string;
  jenisPermohonan: string;
  noFail: string;
  status: string;
  bahagian: string;
  ulasan: string;
  folderPath: File[];
  panjang?: number;
  luas?: number;
  rings: number[][][];
  tajukSurat: string;
  tarikhUlasan: Date;
  namaPemohon: string;
  namaPerunding: string;
  sempadanMulaLat?: string;
  sempadanMulaLong?:string;
  sempadanAkhirLat?: string;
  sempadanAkhirLong?: string;
};

export const CiptaUlasanFormTypeInit:CiptaUlasanFormType = {
  lotNumber: "",
  daerah: "",
  mukim: "",
  kordinatX: "",
  kordinatY: "",
  tajukProjek: "",
  jenisPermohonan: "",
  noFail: "",
  status: "",
  bahagian: "",
  ulasan: "",
  folderPath: [],
  panjang: 0,
  luas: 0,
  rings: [], // Initialize with an empty array
  tajukSurat: "",
  tarikhUlasan: new Date(),
  namaPemohon: "",
  namaPerunding: "",
  sempadanMulaLat: "",
  sempadanMulaLong: "",
  sempadanAkhirLat: "",
  sempadanAkhirLong: ""
}