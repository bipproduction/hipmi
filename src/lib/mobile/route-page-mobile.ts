export { routeAdminMobile, routeUserMobile };

type StatusApp = "review" | "draft" | "reject" | "publish";

const routeAdminMobile = {
  userAccess: ({ id }: { id: string }) => `/admin/user-access/${id}`,
  // JOB
  jobDetail: ({ id, status }: { id: string; status: StatusApp }) =>
    `/admin/job/${id}/${status}`,
  jobByStatus: ({ status }: { status: StatusApp }) =>
    `/admin/job/${status}/status`,
};

const routeUserMobile = {
  home: `/(user)/home`,
  // JOB
  jobDetailPublised: ({ id }: { id: string }) => `/job/${id}`,
  jobByStatus: ({ status }: { status?: StatusApp }) =>
    `/job/(tabs)/status?status=${status}`,
};
