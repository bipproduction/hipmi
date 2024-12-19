import { InvestasiCreateNew } from "@/app_modules/investasi";

export default async function Page() {

  // const pencarianInvestor = await getPencarianInvestor();
  // const periodeDeviden = await getPeriodeDeviden();
  // const pembagianDeviden = await getPembagianDeviden();
  // const statusInvestasi = await getStatusInvestasi();

  return (
    <>
      {/* <InvestasiCreate
        pencarianInvestor={pencarianInvestor as any}
        periodeDeviden={periodeDeviden as any}
        pembagianDeviden={pembagianDeviden as any}
      /> */}
      <InvestasiCreateNew />
    </>
  );
}
