import { investasi_funGetOneInvestasiById } from "@/app_modules/investasi/_fun";
import { Investasi_UiEditInvestasi, Investasi_UiEditInvestasiNew } from "@/app_modules/investasi/_ui";
import getPembagianDeviden from "@/app_modules/investasi/fun/master/get_pembagian_deviden";
import getPencarianInvestor from "@/app_modules/investasi/fun/master/get_pencarian_investor";
import getPeriodeDeviden from "@/app_modules/investasi/fun/master/get_periode_deviden";
import _ from "lodash";

export default async function Page({ params }: { params: { id: string } }) {
  // const investasiId = params.id;

  // const allData = await investasi_funGetOneInvestasiById({ investasiId });
  // const dataInvestasi = _.omit(allData, [
  //   "BeritaInvestasi",
  //   "DokumenInvestasi",
  //   "MasterPembagianDeviden",
  //   "MasterPencarianInvestor",
  //   "MasterProgresInvestasi",
  //   "MasterStatusInvestasi",
  //   "ProspektusInvestasi",
  //   "MasterPeriodeDeviden",
  //   "author",
  // ]);

  // const listPencarian = await getPencarianInvestor();
  // const listPeriode = await getPeriodeDeviden();
  // const listPembagian = await getPembagianDeviden();

  return (
    <>
      {/* <Investasi_UiEditInvestasi
        dataInvestasi={dataInvestasi}
        pembagianDeviden={listPembagian}
        pencarianInvestor={listPencarian}
        periodeDeviden={listPeriode}
      /> */}
      <Investasi_UiEditInvestasiNew />
    </>
  );
}
