import statusTransaksi from "../../../../src/bin/seeder/master/master_status_transaksi.json";
import masterKategoriApp from "../../../../src/bin/seeder/master/master_kategori_app.json";

export const globalStatusApp = [
  {
    id: "1",
    name: "Publish",
  },
  {
    id: "2",
    name: "Review",
  },
  {
    id: "3",
    name: "Draft",
  },
  {
    id: "4",
    name: "Reject",
  },
];

export const globalStatusTransaksi = statusTransaksi;

export const globalMasterApp = [
  { id: "0", name: "Semua" },
  {
    id: "1",
    name: "Event",
  },
  {
    id: "2",
    name: "Job",
  },
  {
    id: "3",
    name: "Voting",
  },
  {
    id: "4",
    name: "Donasi",
  },
  {
    id: "5",
    name: "Investasi",
  },
  {
    id: "6",
    name: "Forum",
  },
  {
    id: "7",
    name: "Collaboration",
  },
];
