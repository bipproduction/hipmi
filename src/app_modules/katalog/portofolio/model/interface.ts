import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_IMAGES } from "@/app_modules/model_global/interface";
import { MODEL_PROFILE } from "../../profile/model/interface";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";
import { ISUB_BIDANG_BISNIS } from "@/app_modules/model_global/portofolio";
import { Prisma } from "@prisma/client";

export interface MODEL_PORTOFOLIO {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  deskripsi: string;
  tlpn: string;
  active: boolean;
  MasterBidangBisnis: MODEL_PORTOFOLIO_BIDANG_BISNIS;
  masterBidangBisnisId: string;
  Portofolio_BidangDanSubBidangBisnis: Portofolio_BidangDanSubBidangBisnis;
  profileId: string;
  Logo: MODEL_LOGO;
  logoId: string;
  Portofolio_MediaSosial: MODEL_PORTOFOLIO_MEDSOS;
  Profile: MODEL_PROFILE;
  BusinessMaps: MODEL_MAP;
  id_Portofolio: string;
}

export interface MODEL_LOGO {
  id: string;
  url: string;
  label: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEL_PORTOFOLIO_BIDANG_BISNIS {
  id: string;
  name: string;
  active: boolean;
  slug: string;
}

export interface MODEL_PORTOFOLIO_MEDSOS {
  id: string;
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  portofolioId: string;
}

export type Portofolio_BidangDanSubBidangBisnis =
  Prisma.Portofolio_BidangDanSubBidangBisnisGetPayload<{
    select: {
      id: true,
      masterBidangBisnisId?: true,
      masterSubBidangBisnisId?: true,
      isActive: true
      MasterBidangBisnis: {
        select: {
          id?: true;
          name?: true;
        };
      };
      MasterSubBidangBisnis: {
        select: {
          id?: true;
          name?: true;
        };
      };

    };
    // include: {

    // };
  }>;
