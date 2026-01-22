export { routeAdminMobile, routeUserMobile };

type StatusApp = "review" | "draft" | "reject" | "publish";

const routeAdminMobile = {
  userAccess: ({ id }: { id: string }) => `/admin/user-access/${id}`,
  // JOB
  jobByStatus: ({ status }: { status: StatusApp }) =>
    `/admin/job/${status}/status`,

  // EVENT
  eventByStatus: ({ status }: { status: StatusApp }) =>
    `/admin/event/${status}/status`,

  // VOTING
  votingByStatus: ({ status }: { status: StatusApp }) =>
    `/admin/voting/${status}/status`,

  // FORUM
  forumPreviewReportPosting: `/admin/forum/report-posting`,
  forumPreviewReportComment: `/admin/forum/report-comment`,

  // INVESTMENT
  investmentByStatus: ({ status }: { status: StatusApp }) => `/admin/investment/${status}/status`,
  investmentDetailPublish: ({
    id,
    status,
  }: {
    id: string;
    status: StatusApp;
  }) => `/admin/investment/${id}/${status}`,
};

const routeUserMobile = {
  home: `/(user)/home`,
  // JOB
  jobByStatus: ({ status }: { status?: StatusApp }) =>
    `/job/(tabs)/status?status=${status}`,
  jobDetailPublised: ({ id }: { id: string }) => `/job/${id}`,

  // EVENT
  eventByStatus: ({ status }: { status?: StatusApp }) =>
    `/event/(tabs)/status?status=${status}`,
  eventDetailPublised: ({ id }: { id: string }) => `/event/${id}/publish`,

  // VOTING
  votingByStatus: ({ status }: { status?: StatusApp }) =>
    `/voting/(tabs)/status?status=${status}`,
  votingDetailPublised: ({ id }: { id: string }) => `/voting/${id}`,

  // FORUM
  forumBeranda: `/forum`,
  forumDetail: ({ id }: { id: string }) => `/forum/${id}`,
  forumPreviewReportPosting: ({ id }: { id: string }) =>
    `/forum/${id}/preview-report-posting`,
  forumPreviewReportComment: ({ id }: { id: string }) =>
    `/forum/${id}/preview-report-comment`,

  // INVESTMENT
  investmentPortofolioByStatus: ({ status }: { status?: StatusApp }) =>
    `/investment/(tabs)/portofolio?status=${status}`,
  investmentDetailPublish: ({ id }: { id: string }) => `/investment/${id}`,
  investmentTransaction: `/investment/(tabs)/transaction`
};
