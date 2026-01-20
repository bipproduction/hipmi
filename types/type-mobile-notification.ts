// Jika semua custom type diawali "custom_"

export type NotificationMobilePayload = {
  title: NotificationMobileTitleType;
  body: NotificationMobileBodyType;
  userLoginId?: string;
  appId?: string;
  status?: string;
  type: "announcement" | "trigger";
  deepLink: string;
  kategoriApp: TypeNotificationCategoryApp;
};

export type NotificationMobileTitleType =
  | (string & { __type: "NotificationMobileTitleType" })
  // Admin
  | "Pengajuan Review Baru"
  // USER
  | "Pengajuan Review Ditolak"
  | "Review Selesai"
  // to ALL user

export type NotificationMobileBodyType =
  // USER
  | (string & { __type: "NotificationMobileBodyType" })
  | "Ada pengajuan review" // tambah title

  // ADMIN
  | "Mohon perbaiki data sesuai catatan penolakan !"
  | "Selamat data anda telah terpublikasi"

export type TypeNotificationCategoryApp =
  | "EVENT"
  | "JOB"
  | "VOTING"
  | "DONASI"
  | "INVESTASI"
  | "COLLABORATION"
  | "FORUM"
  | "OTHER";
