import { MODEL_USER } from "@/app_modules/home/model/interface";
import { MODEL_PROFILE_OLD } from "@/app_modules/home/model/user_profile";

export interface MODEL_INVESTASI {
  id: string;
  title: string;
  targetDana: string;
  hargaLembar: string;
  totalLembar: string;
  sisaLembar: string;
  lembarTerbeli: string;
  roi: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  imagesId: string;
  catatan: string;
  progress: string;
  MasterStatusInvestasi: MODEL_Status_investasi;
  BeritaInvestasi: Model_Berita_Investasi[];
  DokumenInvestasi: MODEL_INVESTASI_DOKUMEN[];
  ProspektusInvestasi: MODEl_PROSPEKTUS_INVESTASI;
  MasterPembagianDeviden: Model_All_Master;
  MasterPencarianInvestor: Model_All_Master;
  MasterPeriodeDeviden: Model_All_Master;
  MasterProgresInvestasi: Model_All_Master;
  masterPeriodeDevidenId: string;
  masterPembagianDevidenId: string;
  masterPencarianInvestorId: string;
  masterStatusInvestasiId: string;
  author: MODEL_PROFILE_OLD;
  countDown: Date;
  Investasi_Invoice: MODEL_INVOICE_INVESTASI[];
  imageId: string;
  prospektusFileId: string;
}

export interface MODEL_Transaksi_Investasi {
  id: string;
  namaBank: string;
  nomorRekening: string;
  transaction_id: string;
  status_message: string;
  payment_type: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  quantity: string;
  price: string;
  gross_amount: string;
  merchant_name: string;
  redirect_url: string;
  token: string;
  Author: MODEL_PROFILE_OLD;
  masterStatusTransaksiInvestasiId: string;
  investasiId: string;
  Investasi: MODEL_INVESTASI;
}

export interface MODEL_Status_investasi {
  id: string;
  name: string;
  color: string;
}

interface Model_All_Master {
  id: string;
  name: string;
  active: boolean;
}

export interface Model_Berita_Investasi {
  id: string;
  title: string;
  deskripsi: string;
  imagesId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEl_PROSPEKTUS_INVESTASI {
  id: string;
  url: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  investasiId: string;
}

export interface MODEL_INVESTASI_DOKUMEN {
  id: string;
  title: string;
  url: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  investasiId: string;
  fileId: string;
}

export interface MODEL_MASTER_BANK {
  id: string;
  namaBank: string;
  namaAkun: string;
  norek: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Model_Status_Transaksi_Investasi {
  id: string;
  name: string;
  color: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MODEL_INVOICE_INVESTASI {
  Profile: any;
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  nominal: string;
  lembarTerbeli: string;
  Investasi: MODEL_INVESTASI;
  investasiId: string;
  masterBankId: string;
  statusInvoiceId: string;
  authorId: string;
  Author: MODEL_USER;
  imagesId: string;
  MasterBank: MODEL_MASTER_BANK;
  StatusInvoice: MODEL_STATUS_INVOICE_INVESTASI;
  Investor: any[];
  imageId: string
}

export interface MODEL_STATUS_INVOICE_INVESTASI {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
