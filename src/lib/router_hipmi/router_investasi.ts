export const NEW_RouterInvestasi = {
  // API
  api_gambar: "/api/investasi/gambar/",

  // MAIN
  /**
   *
   * @param param status id | 1: Publish, 2: Review, 3: Draft, 4: Reject
   * @type string
   */
  portofolio: ({ id }: { id: "1" | "2" | "3" | "4" }) => `/dev/investasi/main/portofolio/${id}`,
  // portofolio: ({ id }: { id?: string }) => `/dev/investasi/main/portofolio/${id}`,

  // TRANSAKSI
  pembelian: "/dev/investasi/transaksi/pembelian/",
  metode_pembayaran: "/dev/investasi/transaksi/metode-pembayaran/",
  invoice: "/dev/investasi/transaksi/invoice/",
  proses_transaksi: "/dev/investasi/transaksi/proses-transaksi/",

  // STATUS TRANSAKSI
  transaksi_gagal: "/dev/investasi/status-transaksi/gagal/",
  transaksi_berhasil: "/dev/investasi/status-transaksi/berhasil/",

  // FILE VIEW
  file_prospektus: ({ id }: { id: string }) =>
    `/dev/investasi/file-view/prospektus/${id}`,

  OLD_file_view_prospektus: "/dev/investasi/file-view/prospektus/",
  OLD_file_view_dokumen: "/dev/investasi/file-view/dokumen/",

  // DETAIL
  detail_main: ({ id }: { id: string }) => `/dev/investasi/detail/${id}`,
  detail_portofolio: ({ id }: { id: string }) =>
    `/dev/investasi/detail/portofolio/${id}`,
  detail_prospektus: ({ id }: { id: string }) =>
    `/dev/investasi/detail/prospektus/${id}`,

  detail_saham: "/dev/investasi/detail/saham/",
  detail_publish: "/dev/investasi/detail_portofolio/publish/",
  detail_review: "/dev/investasi/detail_portofolio/review/",
  detail_draft: "/dev/investasi/detail_portofolio/draft/",
  detail_reject: "/dev/investasi/detail_portofolio/reject/",

  // DOKUMEN
  /**
   * @param id | investasiId
   * @type string
   */
  daftar_dokumen: ({ id }: { id: string }) =>
    `/dev/investasi/dokumen/daftar/${id}`,
  /**
   * @param id | investasiId
   * @type string
   */
  rekap_dokumen: ({ id }: { id: string }) =>
    `/dev/investasi/dokumen/rekap/${id}`,

  // BERITA
  /**
   * @param id | beritaId
   * @type string
   */
  berita: ({ id }: { id: string }) => `/dev/investasi/berita/${id}`,

  /**
   * @param id | investasiId
   * @type string
   */
  daftar_berita: ({ id }: { id: string }) =>
    `/dev/investasi/berita/daftar/${id}`,
  /**
   * @param id | investasiId
   * @type string
   */
  rekap_berita: ({ id }: { id: string }) => `/dev/investasi/berita/rekap/${id}`,

  // CREATE
  /**
   * @param id | investasiId
   * @type string
   */
  create_dokumen: ({ id }: { id: string }) =>
    `/dev/investasi/create/dokumen/${id}`,

  /**
   * @param id | investasiId
   * @type string
   */
  create_berita: ({ id }: { id: string }) =>
    `/dev/investasi/create/berita/${id}`,

  // EDIT
  /**
   * @param id | investasiId
   * @type string
   */
  edit_investasi: ({ id }: { id: string }) => `/dev/investasi/edit/${id}`,

  /**
   * @param id | dokumenId
   * @type string
   */
  edit_dokumen: ({ id }: { id: string }) => `/dev/investasi/edit/dokumen/${id}`,

  /**
   * @param id | investasiId
   * @type string
   */
  edit_prospektus: ({ id }: { id: string }) =>
    `/dev/investasi/edit/prospektus/${id}`,
};

export const RouterInvestasi_OLD = {
  api_gambar: "/api/investasi/gambar/",
  api_file_prospektus: "/api/investasi/prospektus/",
  api_file_dokumen: "/api/investasi/dokumen/",
  api_get_notif_midtrans: "/api/investasi/midtrans",

  //INVESTASI
  main: "/dev/investasi/main",
  create: "/dev/investasi/create/investasi",
  main_porto: "/dev/investasi/main/portofolio",
  main_investasi: "/dev/investasi/main/saham_saya",
  main_transaksi: "/dev/investasi/main/transaksi",
  transfer: "/dev/investasi/transfer/",
  dialog_transaksi: "/dev/investasi/dialog_page/transaksi_saham",
  dialog_create: "/dev/investasi/dialog_page/create",

  // portofolio
  portofolio: "/dev/investasi/main/portofolio",

  // proses beli saham
  proses_investasi: "/dev/investasi/proses_investasi/",
  proses_transaksi: "/dev/investasi/proses_transaksi/",
  status_transaksi: "/dev/investasi/status_transaksi/berhasil",
  status_pesanan: "/dev/investasi/status_pesanan/",
  status_transaksi_gagal: "/dev/investasi/status_transaksi/gagal/",
  metode_transfer: "/dev/investasi/metode_transfer/",

  // edit //
  edit: "/dev/investasi/edit/",
  edit_intro: "/dev/investasi/edit_intro/",
  edit_prospektus: "/dev/investasi/edit_prospektus/",
  edit_dokumen: "/dev/investasi/edit_dokumen/",
  edit_berita: "/dev/investasi/edit_berita/",

  // detail //
  detail: "/dev/investasi/detail/",
  detail_portofolio: "",
  detail_saham_terbeli: "/dev/investasi/detail_saham_terbeli/",
  detail_prospektus: "/dev/investasi/detail_prospektus/",
  detail_dokumen: "/dev/investasi/detail_dokumen/",
  detail_berita: "/dev/investasi/detail_berita/",
  detail_draft: "/dev/investasi/detail_portofolio/draft/",
  detail_publish: "/dev/investasi/detail_portofolio/publish/",
  detail_review: "/dev/investasi/detail_portofolio/review/",
  detail_reject: "/dev/investasi/detail_portofolio/reject/",

  // berita
  daftar_berita: "/dev/investasi/berita/",
  create_berita: "/dev/investasi/create_berita/",
  list_edit_berita: "/dev/investasi/list_edit_berita/",

  //upload
  upload_prospektus: "/dev/investasi/upload_prospektus/",
  upload_dokumen: "/dev/investasi/upload_dokumen/",
};
