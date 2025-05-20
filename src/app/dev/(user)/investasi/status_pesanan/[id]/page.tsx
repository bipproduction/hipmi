import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { StatusPesananInvetsatsi } from "@/app_modules/investasi";
import getOneTransaksiByIdInvestasi from "@/app_modules/investasi/fun/get_one_transaksi_by_id";
import getTransaksiByIdInvestasi from "@/app_modules/investasi/fun/get_transaksi_investasi";

export default async function Page({ params }: { params: { id: string } }) {
  const dataTransaksi = await getOneTransaksiByIdInvestasi(params.id);

  return (
    <>
      <StatusPesananInvetsatsi dataTransaksi={dataTransaksi as any} />
    </>
  );
}
