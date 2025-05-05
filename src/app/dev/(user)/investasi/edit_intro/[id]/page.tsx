import { EditIntroInvestasi } from "@/app_modules/investasi";
import getOneInvestasiById from "@/app_modules/investasi/fun/get_one_investasi_by_id";
import getPembagianDeviden from "@/app_modules/investasi/fun/master/get_pembagian_deviden";
import getPencarianInvestor from "@/app_modules/investasi/fun/master/get_pencarian_investor";
import getPeriodeDeviden from "@/app_modules/investasi/fun/master/get_periode_deviden";

export default async function Page({ params }: { params: { id: string } }) {
  const dataInvestasi = await getOneInvestasiById(params.id);
  const listPencarian = await getPencarianInvestor();
  const listPeriode = await getPeriodeDeviden();
  const listPembagian = await getPembagianDeviden();

  return (
    <>
      <EditIntroInvestasi
        dataInvestasi={dataInvestasi as any}
        listPencarian={listPencarian as any}
        listPeriode={listPeriode as any}
        listPembagian={listPembagian as any}
      />
    </>
  );
}
