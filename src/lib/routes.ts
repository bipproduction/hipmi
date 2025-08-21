export const pages = {
  "/": "/",
  "/zCoba": "/zCoba",
  "/makuro": "/makuro",
  "/dev/vote/splash": "/dev/vote/splash",
  "/dev/vote/main/status": "/dev/vote/main/status",
  "/dev/vote/main/riwayat": "/dev/vote/main/riwayat",
  "/dev/vote/main/kontribusi": "/dev/vote/main/kontribusi",
  "/dev/vote/main/beranda": "/dev/vote/main/beranda",
  "/dev/vote/edit/[id]": ({ id }: { id: string }) => `/dev/vote/edit/${id}`,
  "/dev/vote/detail/semua_riwayat/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/semua_riwayat/${id}`,
  "/dev/vote/detail/riwayat_saya/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/riwayat_saya/${id}`,
  "/dev/vote/detail/review/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/review/${id}`,
  "/dev/vote/detail/reject/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/reject/${id}`,
  "/dev/vote/detail/publish/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/publish/${id}`,
  "/dev/vote/detail/main/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/main/${id}`,
  "/dev/vote/detail/kontribusi/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/kontribusi/${id}`,
  "/dev/vote/detail/draft/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/draft/${id}`,
  "/dev/vote/detail/daftar-kontributor/[id]": ({ id }: { id: string }) =>
    `/dev/vote/detail/daftar-kontributor/${id}`,
  "/dev/vote/create": "/dev/vote/create",
  "/dev/user-search": "/dev/user-search",
  "/dev/user-not-active": "/dev/user-not-active",
  "/dev/splash/admin": "/dev/splash/admin",
  "/dev/profile/upload/foto/[id]": ({ id }: { id: string }) =>
    `/dev/profile/upload/foto/${id}`,
  "/dev/profile/upload/background/[id]": ({ id }: { id: string }) =>
    `/dev/profile/upload/background/${id}`,
  "/dev/profile/edit/[id]": ({ id }: { id: string }) =>
    `/dev/profile/edit/${id}`,
  "/dev/profile/create": "/dev/profile/create",
  "/dev/portofolio/main/[id]": ({ id }: { id: string }) =>
    `/dev/portofolio/main/${id}`,
  "/dev/portofolio/edit/medsos/[id]": ({ id }: { id: string }) =>
    `/dev/portofolio/edit/medsos/${id}`,
  "/dev/portofolio/edit/logo/[id]": ({ id }: { id: string }) =>
    `/dev/portofolio/edit/logo/${id}`,
  "/dev/portofolio/edit/data/[id]": ({ id }: { id: string }) =>
    `/dev/portofolio/edit/data/${id}`,
  "/dev/portofolio/daftar-portofolio/[id]": ({ id }: { id: string }) =>
    `/dev/portofolio/daftar-portofolio/${id}`,
  "/dev/portofolio/create/[id]": ({ id }: { id: string }) =>
    `/dev/portofolio/create/${id}`,
  "/dev/notifikasi": "/dev/notifikasi",
  "/dev/map/splash": "/dev/map/splash",
  "/dev/map/main": "/dev/map/main",
  "/dev/map/edit/[id]": ({ id }: { id: string }) => `/dev/map/edit/${id}`,
  "/dev/map/custom-pin/[id]": ({ id }: { id: string }) =>
    `/dev/map/custom-pin/${id}`,
  "/dev/map/create/[id]": ({ id }: { id: string }) => `/dev/map/create/${id}`,
  "/dev/katalog/[id]": ({ id }: { id: string }) => `/dev/katalog/${id}`,
  "/dev/job/splash": "/dev/job/splash",
  "/dev/job/non_user_view/[id]": ({ id }: { id: string }) =>
    `/dev/job/non_user_view/${id}`,
  "/dev/job/main/status": "/dev/job/main/status",
  "/dev/job/main/beranda": "/dev/job/main/beranda",
  "/dev/job/main/arsip": "/dev/job/main/arsip",
  "/dev/job/edit/[id]": ({ id }: { id: string }) => `/dev/job/edit/${id}`,
  "/dev/job/detail/review/[id]": ({ id }: { id: string }) =>
    `/dev/job/detail/review/${id}`,
  "/dev/job/detail/reject/[id]": ({ id }: { id: string }) =>
    `/dev/job/detail/reject/${id}`,
  "/dev/job/detail/publish/[id]": ({ id }: { id: string }) =>
    `/dev/job/detail/publish/${id}`,
  "/dev/job/detail/main/[id]": ({ id }: { id: string }) =>
    `/dev/job/detail/main/${id}`,
  "/dev/job/detail/draft/[id]": ({ id }: { id: string }) =>
    `/dev/job/detail/draft/${id}`,
  "/dev/job/detail/arsip/[id]": ({ id }: { id: string }) =>
    `/dev/job/detail/arsip/${id}`,
  "/dev/job/create": "/dev/job/create",
  "/dev/investasi/upload_prospektus/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/upload_prospektus/${id}`,
  "/dev/investasi/upload_dokumen/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/upload_dokumen/${id}`,
  "/dev/investasi/upload_bukti": "/dev/investasi/upload_bukti",
  "/dev/investasi/upload": "/dev/investasi/upload",
  "/dev/investasi/transfer/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/transfer/${id}`,
  "/dev/investasi/transaksi/proses-transaksi/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/transaksi/proses-transaksi/${id}`,
  "/dev/investasi/transaksi/pembelian/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/transaksi/pembelian/${id}`,
  "/dev/investasi/transaksi/metode-pembayaran/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/transaksi/metode-pembayaran/${id}`,
  "/dev/investasi/transaksi/invoice/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/transaksi/invoice/${id}`,
  "/dev/investasi/status_pesanan/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/status_pesanan/${id}`,
  "/dev/investasi/status-transaksi/gagal/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/status-transaksi/gagal/${id}`,
  "/dev/investasi/status-transaksi/berhasil/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/status-transaksi/berhasil/${id}`,
  "/dev/investasi/proses_transaksi/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/proses_transaksi/${id}`,
  "/dev/investasi/proses_investasi/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/proses_investasi/${id}`,
  "/dev/investasi/metode_transfer/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/metode_transfer/${id}`,
  "/dev/investasi/main": "/dev/investasi/main",
  "/dev/investasi/main/transaksi": "/dev/investasi/main/transaksi",
  "/dev/investasi/main/saham_saya": "/dev/investasi/main/saham_saya",
  "/dev/investasi/main/portofolio": "/dev/investasi/main/portofolio",
  "/dev/investasi/list_edit_berita/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/list_edit_berita/${id}`,
  "/dev/investasi/file-view/prospektus/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/file-view/prospektus/${id}`,
  "/dev/investasi/file-view/dokumen/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/file-view/dokumen/${id}`,
  "/dev/investasi/edit_prospektus/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/edit_prospektus/${id}`,
  "/dev/investasi/edit_intro/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/edit_intro/${id}`,
  "/dev/investasi/edit_dokumen/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/edit_dokumen/${id}`,
  "/dev/investasi/edit_berita/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/edit_berita/${id}`,
  "/dev/investasi/edit/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/edit/${id}`,
  "/dev/investasi/dialog_page/transaksi_saham":
    "/dev/investasi/dialog_page/transaksi_saham",
  "/dev/investasi/dialog_page/create": "/dev/investasi/dialog_page/create",
  "/dev/investasi/detail_saham_terbeli/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_saham_terbeli/${id}`,
  "/dev/investasi/detail_prospektus/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_prospektus/${id}`,
  "/dev/investasi/detail_portofolio/review/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_portofolio/review/${id}`,
  "/dev/investasi/detail_portofolio/reject/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_portofolio/reject/${id}`,
  "/dev/investasi/detail_portofolio/publish/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_portofolio/publish/${id}`,
  "/dev/investasi/detail_portofolio/draft/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_portofolio/draft/${id}`,
  "/dev/investasi/detail_dokumen/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_dokumen/${id}`,
  "/dev/investasi/detail_berita/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail_berita/${id}`,
  "/dev/investasi/detail/saham/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail/saham/${id}`,
  "/dev/investasi/detail/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/detail/${id}`,
  "/dev/investasi/create_berita/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/create_berita/${id}`,
  "/dev/investasi/create": "/dev/investasi/create",
  "/dev/investasi/berita/[id]": ({ id }: { id: string }) =>
    `/dev/investasi/berita/${id}`,
  "/dev/home": "/dev/home",
  "/dev/forum/splash": "/dev/forum/splash",
  "/dev/forum/report/posting-lainnya/[id]": ({ id }: { id: string }) =>
    `/dev/forum/report/posting-lainnya/${id}`,
  "/dev/forum/report/posting/[id]": ({ id }: { id: string }) =>
    `/dev/forum/report/posting/${id}`,
  "/dev/forum/report/komentar-lainnya/[id]": ({ id }: { id: string }) =>
    `/dev/forum/report/komentar-lainnya/${id}`,
  "/dev/forum/report/komentar/[id]": ({ id }: { id: string }) =>
    `/dev/forum/report/komentar/${id}`,
  "/dev/forum/main": "/dev/forum/main",
  "/dev/forum/komentar/[id]": ({ id }: { id: string }) =>
    `/dev/forum/komentar/${id}`,
  "/dev/forum/forumku/[id]": ({ id }: { id: string }) =>
    `/dev/forum/forumku/${id}`,
  "/dev/forum/edit/posting/[id]": ({ id }: { id: string }) =>
    `/dev/forum/edit/posting/${id}`,
  "/dev/forum/edit/komentar/[id]": ({ id }: { id: string }) =>
    `/dev/forum/edit/komentar/${id}`,
  "/dev/forum/detail/report-posting/[id]": ({ id }: { id: string }) =>
    `/dev/forum/detail/report-posting/${id}`,
  "/dev/forum/detail/report-komentar/[id]": ({ id }: { id: string }) =>
    `/dev/forum/detail/report-komentar/${id}`,
  "/dev/forum/detail/main-detail/[id]": ({ id }: { id: string }) =>
    `/dev/forum/detail/main-detail/${id}`,
  "/dev/forum/create": "/dev/forum/create",
  "/dev/event/splash": "/dev/event/splash",
  "/dev/event/main/status_page": "/dev/event/main/status_page",
  "/dev/event/main/riwayat": "/dev/event/main/riwayat",
  "/dev/event/main/kontribusi": "/dev/event/main/kontribusi",
  "/dev/event/main/beranda": "/dev/event/main/beranda",
  "/dev/event/edit/[id]": ({ id }: { id: string }) => `/dev/event/edit/${id}`,
  "/dev/event/detail/riwayat/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/riwayat/${id}`,
  "/dev/event/detail/review/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/review/${id}`,
  "/dev/event/detail/reject/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/reject/${id}`,
  "/dev/event/detail/publish/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/publish/${id}`,
  "/dev/event/detail/main/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/main/${id}`,
  "/dev/event/detail/kontribusi/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/kontribusi/${id}`,
  "/dev/event/detail/draft/[id]": ({ id }: { id: string }) =>
    `/dev/event/detail/draft/${id}`,
  "/dev/event/create": "/dev/event/create",
  "/dev/donasi/proses_donasi/proses_transaksi/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/proses_donasi/proses_transaksi/${id}`,
  "/dev/donasi/proses_donasi/metode_pembayaran/[id]": ({
    id,
  }: {
    id: string;
  }) => `/dev/donasi/proses_donasi/metode_pembayaran/${id}`,
  "/dev/donasi/proses_donasi/masukan_donasi/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/proses_donasi/masukan_donasi/${id}`,
  "/dev/donasi/proses_donasi/invoice/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/proses_donasi/invoice/${id}`,
  "/dev/donasi/penggalang_dana/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/penggalang_dana/${id}`,
  "/dev/donasi/pencairan_dana/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/pencairan_dana/${id}`,
  "/dev/donasi/page_pop_up/create": "/dev/donasi/page_pop_up/create",
  "/dev/donasi/notif_page/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/notif_page/${id}`,
  "/dev/donasi/main/galang_dana": "/dev/donasi/main/galang_dana",
  "/dev/donasi/main/donasi_saya": "/dev/donasi/main/donasi_saya",
  "/dev/donasi/main/beranda": "/dev/donasi/main/beranda",
  "/dev/donasi/list_kabar/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/list_kabar/${id}`,
  "/dev/donasi/kabar/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/kabar/${id}`,
  "/dev/donasi/edit/update_kabar/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/edit/update_kabar/${id}`,
  "/dev/donasi/edit/edit_rekening/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/edit/edit_rekening/${id}`,
  "/dev/donasi/edit/edit_donasi/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/edit/edit_donasi/${id}`,
  "/dev/donasi/edit/edit_cerita/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/edit/edit_cerita/${id}`,
  "/dev/donasi/donatur/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/donatur/${id}`,
  "/dev/donasi/detail/detail_review/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_review/${id}`,
  "/dev/donasi/detail/detail_reject/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_reject/${id}`,
  "/dev/donasi/detail/detail_publish/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_publish/${id}`,
  "/dev/donasi/detail/detail_notif/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_notif/${id}`,
  "/dev/donasi/detail/detail_main/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_main/${id}`,
  "/dev/donasi/detail/detail_kabar/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_kabar/${id}`,
  "/dev/donasi/detail/detail_draft/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_draft/${id}`,
  "/dev/donasi/detail/detail_donasi_saya/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/detail/detail_donasi_saya/${id}`,
  "/dev/donasi/create/create_kabar/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/create/create_kabar/${id}`,
  "/dev/donasi/create/create_donasi": "/dev/donasi/create/create_donasi",
  "/dev/donasi/create/cerita_penggalang/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/create/cerita_penggalang/${id}`,
  "/dev/donasi/cerita_penggalang/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/cerita_penggalang/${id}`,
  "/dev/donasi/bukti-transfer/[id]": ({ id }: { id: string }) =>
    `/dev/donasi/bukti-transfer/${id}`,
  "/dev/crowd/splash": "/dev/crowd/splash",
  "/dev/crowd/main": "/dev/crowd/main",
  "/dev/colab/splash": "/dev/colab/splash",
  "/dev/colab/main/status": "/dev/colab/main/status",
  "/dev/colab/main/proyek": "/dev/colab/main/proyek",
  "/dev/colab/main/notifikasi": "/dev/colab/main/notifikasi",
  "/dev/colab/main/grup": "/dev/colab/main/grup",
  "/dev/colab/main/beranda": "/dev/colab/main/beranda",
  "/dev/colab/edit/[id]": ({ id }: { id: string }) => `/dev/colab/edit/${id}`,
  "/dev/colab/detail/status/review/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/status/review/${id}`,
  "/dev/colab/detail/status/reject/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/status/reject/${id}`,
  "/dev/colab/detail/status/publish/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/status/publish/${id}`,
  "/dev/colab/detail/proyek/saya/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/proyek/saya/${id}`,
  "/dev/colab/detail/proyek/partisipasi/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/proyek/partisipasi/${id}`,
  "/dev/colab/detail/notifikasi/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/notifikasi/${id}`,
  "/dev/colab/detail/main_detail/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/main_detail/${id}`,
  "/dev/colab/detail/info-grup/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/info-grup/${id}`,
  "/dev/colab/detail/group/[id]": ({ id }: { id: string }) =>
    `/dev/colab/detail/group/${id}`,
  "/dev/colab/create": "/dev/colab/create",
  "/dev/check-cookies": "/dev/check-cookies",
  "/dev/auth/validasi/[id]": ({ id }: { id: string }) =>
    `/dev/auth/validasi/${id}`,
  "/dev/auth/splash": "/dev/auth/splash",
  "/dev/auth/register/[id]": ({ id }: { id: string }) =>
    `/dev/auth/register/${id}`,
  "/dev/auth/login": "/dev/auth/login",
  "/dev/admin/vote/main": "/dev/admin/vote/main",
  "/dev/admin/vote/child/table_review": "/dev/admin/vote/child/table_review",
  "/dev/admin/vote/child/table_reject": "/dev/admin/vote/child/table_reject",
  "/dev/admin/vote/child/table_publish": "/dev/admin/vote/child/table_publish",
  "/dev/admin/vote/child/riwayat": "/dev/admin/vote/child/riwayat",
  "/dev/admin/user-access": "/dev/admin/user-access",
  "/dev/admin/map": "/dev/admin/map",
  "/dev/admin/main/dashboard": "/dev/admin/main/dashboard",
  "/dev/admin/job/main": "/dev/admin/job/main",
  "/dev/admin/job/detail/poster/[id]": ({ id }: { id: string }) =>
    `/dev/admin/job/detail/poster/${id}`,
  "/dev/admin/job/child/review": "/dev/admin/job/child/review",
  "/dev/admin/job/child/reject": "/dev/admin/job/child/reject",
  "/dev/admin/job/child/publish": "/dev/admin/job/child/publish",
  "/dev/admin/job/child/arsip": "/dev/admin/job/child/arsip",
  "/dev/admin/investasi/table_status/review":
    "/dev/admin/investasi/table_status/review",
  "/dev/admin/investasi/table_status/reject":
    "/dev/admin/investasi/table_status/reject",
  "/dev/admin/investasi/table_status/publish":
    "/dev/admin/investasi/table_status/publish",
  "/dev/admin/investasi/sub-menu/review":
    "/dev/admin/investasi/sub-menu/review",
  "/dev/admin/investasi/sub-menu/reject":
    "/dev/admin/investasi/sub-menu/reject",
  "/dev/admin/investasi/sub-menu/publish":
    "/dev/admin/investasi/sub-menu/publish",
  "/dev/admin/investasi/status_transfer":
    "/dev/admin/investasi/status_transfer",
  "/dev/admin/investasi/main": "/dev/admin/investasi/main",
  "/dev/admin/investasi/konfirmasi/[id]": ({ id }: { id: string }) =>
    `/dev/admin/investasi/konfirmasi/${id}`,
  "/dev/admin/investasi/halaman_aksi/[id]": ({ id }: { id: string }) =>
    `/dev/admin/investasi/halaman_aksi/${id}`,
  "/dev/admin/investasi/detail/review/[id]": ({ id }: { id: string }) =>
    `/dev/admin/investasi/detail/review/${id}`,
  "/dev/admin/investasi/detail/reject/[id]": ({ id }: { id: string }) =>
    `/dev/admin/investasi/detail/reject/${id}`,
  "/dev/admin/investasi/detail/publish/[id]": ({ id }: { id: string }) =>
    `/dev/admin/investasi/detail/publish/${id}`,
  "/dev/admin/investasi/bukti-transfer/[id]": ({ id }: { id: string }) =>
    `/dev/admin/investasi/bukti-transfer/${id}`,
  "/dev/admin/forum/sub-menu/report-posting":
    "/dev/admin/forum/sub-menu/report-posting",
  "/dev/admin/forum/sub-menu/report-komentar":
    "/dev/admin/forum/sub-menu/report-komentar",
  "/dev/admin/forum/sub-menu/posting": "/dev/admin/forum/sub-menu/posting",
  "/dev/admin/forum/sub-detail/report-posting/[id]": ({ id }: { id: string }) =>
    `/dev/admin/forum/sub-detail/report-posting/${id}`,
  "/dev/admin/forum/sub-detail/report-komentar/[id]": ({
    id,
  }: {
    id: string;
  }) => `/dev/admin/forum/sub-detail/report-komentar/${id}`,
  "/dev/admin/forum/main": "/dev/admin/forum/main",
  "/dev/admin/forum/detail/[id]": ({ id }: { id: string }) =>
    `/dev/admin/forum/detail/${id}`,
  "/dev/admin/event/table/review": "/dev/admin/event/table/review",
  "/dev/admin/event/table/reject": "/dev/admin/event/table/reject",
  "/dev/admin/event/table/publish": "/dev/admin/event/table/publish",
  "/dev/admin/event/main": "/dev/admin/event/main",
  "/dev/admin/event/detail/peserta/[id]": ({ id }: { id: string }) =>
    `/dev/admin/event/detail/peserta/${id}`,
  "/dev/admin/event/detail/main-detail": "/dev/admin/event/detail/main-detail",
  "/dev/admin/event/child/tipe_acara": "/dev/admin/event/child/tipe_acara",
  "/dev/admin/event/child/riwayat": "/dev/admin/event/child/riwayat",
  "/dev/admin/donasi/sub-menu/review": "/dev/admin/donasi/sub-menu/review",
  "/dev/admin/donasi/sub-menu/reject": "/dev/admin/donasi/sub-menu/reject",
  "/dev/admin/donasi/sub-menu/publish": "/dev/admin/donasi/sub-menu/publish",
  "/dev/admin/donasi/sub-menu/kategori": "/dev/admin/donasi/sub-menu/kategori",
  "/dev/admin/donasi/sub-menu/informasi":
    "/dev/admin/donasi/sub-menu/informasi",
  "/dev/admin/donasi/sub-detail/transfer-invoice-reimbursement/[id]": ({
    id,
  }: {
    id: string;
  }) => `/dev/admin/donasi/sub-detail/transfer-invoice-reimbursement/${id}`,
  "/dev/admin/donasi/sub-detail/transfer-invoice/[id]": ({
    id,
  }: {
    id: string;
  }) => `/dev/admin/donasi/sub-detail/transfer-invoice/${id}`,
  "/dev/admin/donasi/proses_transaksi/[id]": ({ id }: { id: string }) =>
    `/dev/admin/donasi/proses_transaksi/${id}`,
  "/dev/admin/donasi/pencairan_dana/[id]": ({ id }: { id: string }) =>
    `/dev/admin/donasi/pencairan_dana/${id}`,
  "/dev/admin/donasi/main": "/dev/admin/donasi/main",
  "/dev/admin/donasi/detail/review/[id]": ({ id }: { id: string }) =>
    `/dev/admin/donasi/detail/review/${id}`,
  "/dev/admin/donasi/detail/reject/[id]": ({ id }: { id: string }) =>
    `/dev/admin/donasi/detail/reject/${id}`,
  "/dev/admin/donasi/detail/publish/[id]": ({ id }: { id: string }) =>
    `/dev/admin/donasi/detail/publish/${id}`,
  "/dev/admin/developer": "/dev/admin/developer",
  "/dev/admin/colab/sub-menu/reject": "/dev/admin/colab/sub-menu/reject",
  "/dev/admin/colab/sub-menu/publish": "/dev/admin/colab/sub-menu/publish",
  "/dev/admin/colab/sub-menu/group": "/dev/admin/colab/sub-menu/group",
  "/dev/admin/colab/dashboard": "/dev/admin/colab/dashboard",
  "/dev/admin/award": "/dev/admin/award",
  "/dev/admin/award/main": "/dev/admin/award/main",
  "/dev/admin/app-information/main": "/dev/admin/app-information/main",
  "/contoh": "/contoh",
};

export const apies = {
  "/api/test-scroll": "/api/test-scroll",
  "/api/seeder": "/api/seeder",
  "/api/profile/url_foto/[url]": ({ url }: { url: string }) =>
    `/api/profile/url_foto/${url}`,
  "/api/profile/url_background/[url]": ({ url }: { url: string }) =>
    `/api/profile/url_background/${url}`,
  "/api/profile/foto/[id]": ({ id }: { id: string }) =>
    `/api/profile/foto/${id}`,
  "/api/profile/background/[id]": ({ id }: { id: string }) =>
    `/api/profile/background/${id}`,
  "/api/portofolio/logo/[id]": ({ id }: { id: string }) =>
    `/api/portofolio/logo/${id}`,
  "/api/map/pin/[id]": ({ id }: { id: string }) => `/api/map/pin/${id}`,
  "/api/map/foto/[id]": ({ id }: { id: string }) => `/api/map/foto/${id}`,
  "/api/investasi/prospektus/[id]": ({ id }: { id: string }) =>
    `/api/investasi/prospektus/${id}`,
  "/api/investasi/midtrans/[id]": ({ id }: { id: string }) =>
    `/api/investasi/midtrans/${id}`,
  "/api/investasi/gambar/[id]": ({ id }: { id: string }) =>
    `/api/investasi/gambar/${id}`,
  "/api/investasi/dokumen/[id]": ({ id }: { id: string }) =>
    `/api/investasi/dokumen/${id}`,
  "/api/investasi/bukti-transfer/[id]": ({ id }: { id: string }) =>
    `/api/investasi/bukti-transfer/${id}`,
  "/api/donasi/image_cerita/[url]": ({ url }: { url: string }) =>
    `/api/donasi/image_cerita/${url}`,
  "/api/donasi/image/[url]": ({ url }: { url: string }) =>
    `/api/donasi/image/${url}`,
  "/api/donasi/gambar_pencairan/[id]": ({ id }: { id: string }) =>
    `/api/donasi/gambar_pencairan/${id}`,
  "/api/donasi/gambar_kabar/[id]": ({ id }: { id: string }) =>
    `/api/donasi/gambar_kabar/${id}`,
  "/api/donasi/gambar_cerita/[id]": ({ id }: { id: string }) =>
    `/api/donasi/gambar_cerita/${id}`,
  "/api/donasi/gambar_bukti_transfer/[id]": ({ id }: { id: string }) =>
    `/api/donasi/gambar_bukti_transfer/${id}`,
  "/api/donasi/gambar/[id]": ({ id }: { id: string }) =>
    `/api/donasi/gambar/${id}`,
  "/api/check-cookies": "/api/check-cookies",
  "/api/auth/validasi": "/api/auth/validasi",
  "/api/auth/register": "/api/auth/register",
  "/api/auth/logout": "/api/auth/logout",
  "/api/auth/login": "/api/auth/login",
  "/api/admin/notifikasi": "/api/admin/notifikasi",
};
