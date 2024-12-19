import { Investasi_ViewBerandaNew } from "@/app_modules/investasi/_ui";

export default async function Page() {
  // const allData = await investasi_funGetAllPublish({ page: 1 });

  return (
    <>
      {/* <Investasi_UiBeranda dataInvestasi={allData as any} /> */}
      <Investasi_ViewBerandaNew />
    </>
  );
}
