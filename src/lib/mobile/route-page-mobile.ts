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
};
