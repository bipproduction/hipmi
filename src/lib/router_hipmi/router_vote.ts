export const RouterVote = {
  // main
  splash: "/dev/vote/splash",
  beranda: "/dev/vote/main/beranda",
  status: ({ id }: { id?: string }) => `/dev/vote/main/status/${id}`,
  kontribusi: "/dev/vote/main/kontribusi",

  /**
   *
   * @param riwayatId | 1 & 2 | 1: Semua, 2: Saya
   * @type string
   */
  riwayat: ({ id }: { id?: string }) => `/dev/vote/main/riwayat/${id}`,

  // create
  create: "/dev/vote/create",

  //
  edit: "/dev/vote/edit/",

  //detail
  main_detail: "/dev/vote/detail/main/",
  detail_publish: "/dev/vote/detail/publish/",
  detail_review: "/dev/vote/detail/review/",
  detail_draft: "/dev/vote/detail/draft/",
  detail_reject: "/dev/vote/detail/reject/",
  detail_kontribusi: "/dev/vote/detail/kontribusi/",
  detail_semua_riwayat: "/dev/vote/detail/semua_riwayat/",
  detail_riwayat_saya: "/dev/vote/detail/riwayat_saya/",
  daftar_kontributor: "/dev/vote/detail/daftar-kontributor/",
};
