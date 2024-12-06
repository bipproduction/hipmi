export const API_RouteEvent = {
  get_all: ({ page }: { page: number }) => `/api/event/get-all?page=${page}`,
  get_one_by_id: ({ eventId }: { eventId: string }) =>
    `/api/event/get-one-by-id?eventId=${eventId}`,
  check_kehadiran: ({ eventId, userId }: { eventId: string; userId: string }) =>
    `/api/event/check-kehadiran?eventId=${eventId}&userId=${userId}`,
};
