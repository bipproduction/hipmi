import { Investasi_ViewCreateBerita } from "./create/view_create_berita";
import { Investasi_ViewCreateDocument } from "./create/view_create_document";
import Investasi_ViewDetailDraft from "./detail/portofolio/view_detail_draft";
import Investasi_ViewDetailPublish from "./detail/portofolio/view_detail_publish";
import Investasi_ViewDetailReject from "./detail/portofolio/view_detail_reject";
import Investasi_ViewDetailReview from "./detail/portofolio/view_detail_review";
import { Investasi_ViewDetailBerita } from "./detail/view_berita";
import { Investasi_ViewDaftarBerita } from "./detail/view_daftar_berita";
import { Investasi_ViewDaftarDokumen } from "./detail/view_daftar_dokemen";
import { Investasi_ViewDetailMain } from "./detail/view_detail_main";
import { Investasi_ViewDetailProspektus } from "./detail/view_detail_prospektusl";
import { Investasi_ViewDetailSahamSaya } from "./detail/view_detail_saham_saya";
import { Investasi_ViewRekapBerita } from "./detail/view_rekap_berita";
import { Investasi_ViewRekapDokumen } from "./detail/view_rekap_dokumen";
import { Investasi_ViewEditDokumen } from "./edit/view_edit_dokumen";
import { Investasi_ViewEditInvestasi } from "./edit/view_edit_investasi";
import { Investasi_ViewEditProspektus } from "./edit/view_edit_prospektus";
import PdfToImage from "./file_view/view_file_viewer";
import { Investasi_ViewBeranda } from "./main/view_beranda";
import { Investasi_ViewPortofolio } from "./main/view_portofolio";
import { Investasi_ViewSahamSaya } from "./main/view_saham_saya";
import { Investasi_ViewTransaksiBerhasil } from "./status_transaksi/view_invoice_berhasil";
import { Investasi_ViewTransaksiGagal } from "./status_transaksi/view_transaksi_gagal";
import { Investasi_ViewInvoice } from "./transaksi/view_invoice";
import { Investasi_ViewMetodePembayaran } from "./transaksi/view_metode_pembayaran";
import { Investasi_ViewProsesPembelian } from "./transaksi/view_proses_pembelian";
import { Investasi_ViewProsesTransaksi } from "./transaksi/view_proses_transaksi";

export {
  Investasi_ViewBeranda,
  Investasi_ViewCreateBerita,
  Investasi_ViewCreateDocument,
  Investasi_ViewDaftarBerita,
  Investasi_ViewDaftarDokumen,
  Investasi_ViewDetailBerita,
  Investasi_ViewDetailDraft,
  Investasi_ViewDetailMain,
  Investasi_ViewDetailProspektus,
  Investasi_ViewDetailPublish,
  Investasi_ViewDetailReject,
  Investasi_ViewDetailReview,
  Investasi_ViewDetailSahamSaya,
  Investasi_ViewEditDokumen,
  Investasi_ViewEditInvestasi,
  Investasi_ViewEditProspektus,
  PdfToImage as Investasi_ViewFileViewer,
  Investasi_ViewInvoice,
  Investasi_ViewMetodePembayaran,
  Investasi_ViewPortofolio,
  Investasi_ViewProsesPembelian,
  Investasi_ViewProsesTransaksi,
  Investasi_ViewRekapBerita,
  Investasi_ViewRekapDokumen,
  Investasi_ViewSahamSaya,
  Investasi_ViewTransaksiBerhasil,
  Investasi_ViewTransaksiGagal,
};
