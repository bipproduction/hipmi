export const RouterAdminEvent = {
  main_event: "/dev/admin/event/main",

  // detail
  detail_peserta: "/dev/admin/event/detail/peserta/",
  detail_publish: ({ id }: { id: string }) =>
    `/dev/admin/event/detail/publish/${id}`,
  new_detail: ({ id }: { id: string }) =>
    `/dev/admin/event/${id}`,
  detail_sponsor: "/dev/admin/event/detail/detail_sponsor/",

  // child
  detail_tipe_acara: "/dev/admin/event/child/tipe_acara",
  detail_riwayat: "/dev/admin/event/child/riwayat",

  // table
  table_review: "/dev/admin/event/table/review",
  table_publish: "/dev/admin/event/table/publish",
  table_reject: "/dev/admin/event/table/reject",
};
