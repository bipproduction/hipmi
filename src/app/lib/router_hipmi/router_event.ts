export const RouterEvent = {
  //main
  splash: "/dev/event/splash",
  beranda: "/dev/event/main/beranda",
  // status_page: "/dev/event/main/status_page",
  kontribusi: "/dev/event/main/kontribusi",
  riwayat: ({ id }: { id: string }) => `/dev/event/main/riwayat/${id}`,

  /**
   * 
   * @param statusId | 1 - 4 | 1: Publish, 2: Review, 3: Draft, 4: Reject
   * @type string
   */
  // status
  status: ({ id }: { id?: string }) => `/dev/event/main/status/${id}`,
  // status_publish: "/dev/event/main/status_page/publish",
  // status_review: "/dev/event/main/status_page/review",
  // status_draft: "/dev/event/main/status_page/draft",
  // status_reject: "/dev/event/main/status_page/reject",

  //create
  create: "/dev/event/create",

  // edit
  edit: "/dev/event/edit/",

  // detail
  detail_main: "/dev/event/detail/main/",
  detail_kontribusi: "/dev/event/detail/kontribusi/",
  detail_publish: "/dev/event/detail/publish/",
  detail_review: "/dev/event/detail/review/",
  detail_draft: "/dev/event/detail/draft/",
  detail_reject: "/dev/event/detail/reject/",
  detail_riwayat: "/dev/event/detail/riwayat/",

  //peserta
  daftar_peserta: ({ id }: { id: string }) =>
    `/dev/event/detail/peserta/${id}`,

  //sponsor
  daftar_sponsor: ({ id }: { id: string }) =>
    `/dev/event/detail/sponsor/${id}`,
  edit_sponsor: "/dev/event/detail/sponsor/edit_sponsor/",
  tambah_sponsor: "/dev/event/detail/sponsor/tambah_sponsor/",
  detail_sponsor: ({ id }: { id: string }) =>
    `/dev/event/detail/detail_sponsor/${id}`,



};

