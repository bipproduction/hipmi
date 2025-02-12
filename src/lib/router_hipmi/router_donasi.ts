export const RouterDonasi = {
  //api
  api_gambar: "/api/donasi/gambar/",
  api_gambar_cerita: "/api/donasi/gambar_cerita/",
  api_image: "/api/donasi/image/",
  api_image_cerita: "/api/donasi/image_cerita/",
  api_gambar_kabar: "/api/donasi/gambar_kabar/",
  api_gambar_pencairan: "/api/donasi/gambar_pencairan/",

  //main
  main_beranda: "/dev/donasi/main/beranda",
  status_galang_dana: ({ id }: { id: string }) => `/dev/donasi/main/galang_dana/${id}`,
  main_donasi_saya: "/dev/donasi/main/donasi_saya",

  // create
  create_donasi: "/dev/donasi/create/create_donasi",
  create_cerita_penggalang: "/dev/donasi/create/cerita_penggalang/",
  create_kabar: "/dev/donasi/create/create_kabar/",

  // edit
  update_kabar: "/dev/donasi/edit/update_kabar/",
  edit_donasi: "/dev/donasi/edit/edit_donasi/",
  edit_cerita_penggalang: "/dev/donasi/edit/edit_cerita/",
  edit_rekening: "/dev/donasi/edit/edit_rekening/",
  edit_kabar: ({ id }: { id: string }) => `/dev/donasi/edit/kabar/${id}`,

  //pop up
  page_pop_up_create: "/dev/donasi/page_pop_up/create",

  //detail
  detail_main: "/dev/donasi/detail/main/",
  detail_publish: "/dev/donasi/detail/publish/",
  detail_review: "/dev/donasi/detail/review/",
  detail_draft: "/dev/donasi/detail/draft/",
  detail_reject: "/dev/donasi/detail/reject/",
  detail_donasi_saya: "/dev/donasi/detail/donasi_saya/",

  detail_kabar: "/dev/donasi/detail/kabar/",
  detail_notif: "/dev/donasi/detail/detail_notif/",

  //alur donasi
  kabar: ({ id }: { id: string }) => `/dev/donasi/kabar/${id}`,
  daftar_kabar: ({ id }: { id: string }) => `/dev/donasi/kabar/daftar/${id}`,
  rekap_kabar: ({ id }: { id: string }) => `/dev/donasi/kabar/rekap/${id}`,
  donatur: "/dev/donasi/donatur/",
  pencairan_dana: "/dev/donasi/pencairan_dana/",
  penggalang_dana: "/dev/donasi/penggalang_dana/",
  cerita_penggalang: "/dev/donasi/cerita_penggalang/",
  list_kabar: "/dev/donasi/list_kabar/",
  notif_page: "/dev/donasi/notif_page/",
  bukti_transfer: "/dev/donasi/bukti-transfer/",

  // proses donasi
  masukan_donasi: "/dev/donasi/proses_donasi/masukan_donasi/",
  metode_pembayaran: "/dev/donasi/proses_donasi/metode_pembayaran/",
  invoice: "/dev/donasi/proses_donasi/invoice/",
  proses_transaksi: "/dev/donasi/proses_donasi/proses_transaksi/",
};
