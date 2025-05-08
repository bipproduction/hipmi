import { Prisma } from "@prisma/client";

export interface MODEL_PORTOFOLIO_Lama {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  tlpn: string;
  deskripssi: string;
  masterBidangBisnisId: string;
  active: boolean;
  profileId: string
}

export interface BIDANG_BISNIS_OLD {
  id: string;
  name: string;
  active: boolean;
}

export interface MODAL_SUB_BIDANG_BISNIS {
  id: string;
  name: string;
  isActive: boolean;
}

export type ISUB_BIDANG_BISNIS = Prisma.MasterSubBidangBisnisGetPayload<{
  select: {
    id: true;
    name: true;
    isActive: true;
    masterBidangBisnisId: true;
  };
}>;

export interface MODEL_PORTOFOLIO_OLD {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  deskripsi: string;
  tlpn: string;
  active: boolean;
  MasterBidangBisnis: BIDANG_BISNIS_OLD;
  masterBidangBisnisId: string
  MasterSubBidangBisnis: MODAL_SUB_BIDANG_BISNIS;
  masterSubBidangBisnisId?: string
  profileId: string,
}
