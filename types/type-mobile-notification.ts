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
  | "Pengajuan Review"
  | "Review Selesai";

export type NotificationMobileBodyType =
  // USER
  | (string & { __type: "NotificationMobileBodyType" })
  | "Terdapat pengajuan baru yang perlu direview"

  // ADMIN
  | "Pengajuan data anda telah di tolak !"
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
