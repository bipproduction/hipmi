import { atom } from "jotai";

/**
 * @param status | status jika perlu acc admin > "Publish", "Review", "Draft", "Reject"
 * @param status | khusus kategori | EVENT > "Peserta Event" | VOTING > "Voting Masuk" | DONASI > "Berhasil", "Proses", "Menunggu", "Gagal"
 */
export type ITypeStatusNotifikasi =
  | "Publish"
  | "Review"
  | "Draft"
  | "Reject"
  // EVENT
  | "Peserta Event"
  // VOTING
  | "Voting Masuk"
  // DONASI
  | "Berhasil"
  | "Proses"
  | "Menunggu"
  | "Gagal";

/**
 * @param kategoriApp | "JOB", "VOTING", "EVENT", "DONASI", "INVESTASI", "COLLABORATION", "FORUM"
 * @type string
 */
export type IRealtimeData = {
  status?: ITypeStatusNotifikasi;
  appId: string;
  userId: string;
  pesan: string;
  title: string;
  kategoriApp:
    | "JOB"
    | "VOTING"
    | "EVENT"
    | "DONASI"
    | "INVESTASI"
    | "COLLABORATION"
    | "FORUM";
};

export const gs_realtimeData = atom<IRealtimeData | null>(null);
export const gs_admin_ntf = atom<number>(0);
export const gs_user_ntf = atom<number>(0);
export const gs_count_ntf = atom<number | null>(null);

// job
export const gs_adminJob_triggerReview = atom<boolean>(false);
export const gs_jobTiggerBeranda = atom<boolean>(false);

// event
export const gs_adminEvent_triggerReview = atom<boolean>(false);
export const gs_eventTriggerBeranda = atom<boolean>(false);

// voting
export const gs_adminVoting_triggerReview = atom<boolean>(false);
export const gs_votingTiggerBeranda = atom<boolean>(false);

// donasi
export const gs_adminDonasi_triggerReview = atom<boolean>(false);
export const gs_donasiTriggerBeranda = atom<boolean>(false);
