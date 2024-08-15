import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_IMAGES } from "@/app_modules/model_global/interface";
import { MODEL_PROFILE } from "../../profile/model/interface";
import { MODEL_MAP } from "@/app_modules/map/lib/interface";

export interface MODEL_PORTOFOLIO {
  id: string;
  namaBisnis: string;
  alamatKantor: string;
  deskripsi: string;
  tlpn: string;
  active: boolean;
  MasterBidangBisnis: MODEL_PORTOFOLIO_BIDANG_BISNIS;
  masterBidangBisnisId: string;
  profileId: string;
  Logo: MODEL_IMAGES;
  logoId: string;
  Portofolio_MediaSosial: MODEL_PORTOFOLIO_MEDSOS;
  Profile: MODEL_PROFILE;
  BusinessMaps: MODEL_MAP;
  id_Portofolio: string
}

export interface MODEL_PORTOFOLIO_BIDANG_BISNIS {
  id: string;
  name: string;
  active: boolean;
}

export interface MODEL_PORTOFOLIO_MEDSOS {
  id: string
  facebook: string
  twitter: string
  instagram: string
  tiktok: string;
  youtube:string
  active: boolean
  createdAt: Date
  updatedAt:Date
  portofolioId: string
};
