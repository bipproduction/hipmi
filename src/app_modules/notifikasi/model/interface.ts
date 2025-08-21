import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_NEW_DEFAULT_MASTER } from "@/app_modules/model_global/interface";
export interface MODEL_NOTIFIKASI {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  appId: string;
  kategoriApp: string;
  isRead: boolean;
  title: string;
  pesan: string;
  User: MODEL_USER;
  userId: string;
  Admin: MODEL_USER;
  adminId: string;
  status?:
    | "Publish"
    | "Reject"
    | "Review"
    | "Draft"
    | "Voting Masuk"
    | "Voting Selesai"
    | "Voting Selesai"
    | "Peserta Event"
    | "Report Komentar"
    | "Report Posting"
    | "Partisipan Project"
    | "Collaboration Group"
    | "Menunggu"
    | "Proses"
    | "Berhasil"
    | "Gagal"
    | "Donatur Baru"
    | "Kabar Donasi"
    | "Pencairan Dana";

  Role: MODEL_NEW_DEFAULT_MASTER;
  userRoleId: String;
}

export type ICategoryapp =
  | "Semua"
  | "Event"
  | "Job"
  | "Voting"
  | "Donasi"
  | "Investasi"
  | "Forum"
  | "Collaboration";
