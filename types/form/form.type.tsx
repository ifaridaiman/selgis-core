type attribute = {
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
  folderPath: string[];
  panjang?: number;
  luas?: number;
};

type geometry = {
  rings: number[][][];
};

export type FormType = {
  attributes: attribute;
  geometries: geometry;
};
