export const API_RouteJob = {
  get_all: ({ page, search }: { page: number; search?: string }) =>
    `/api/job/get-all?page=${page}&search=${search || ""}`,
};
