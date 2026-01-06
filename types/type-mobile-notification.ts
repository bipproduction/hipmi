export type NotificationMobilePayload = {
  title: string;
  body: string;
  userLoginId?: string;
  appId?: string;
  status?: string;
  type: "announcement" | "trigger";
  deepLink: string;
  kategoriApp: TypeNotificationCategoryApp
};

export type TypeNotificationCategoryApp =
  | "EVENT"
  | "JOB"
  | "VOTING"
  | "DONASI"
  | "INVESTASI"
  | "COLLABORATION"
  | "FORUM"
  | "OTHER";
