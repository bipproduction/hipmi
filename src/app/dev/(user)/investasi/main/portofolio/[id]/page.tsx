import { Investasi_UiPortofolioNew } from "@/app_modules/investasi/_ui";

export default async function Page({ params }: { params: { id: string } }) {
  // const statusId = params.id;
  // const listStatus = await getStatusInvestasi();
  // const dataPortofolio = await investasi_funGetPortofolioByStatusId({
  //   page: 1,
  //   statusId: statusId,
  // });

  return (
    <>
      {/* <Investasi_UiPortofolio
        statusId={statusId}
        listStatus={listStatus as any}
        dataPortofolio={dataPortofolio as any}
      /> */}
      <Investasi_UiPortofolioNew />
    </>
  );
}
