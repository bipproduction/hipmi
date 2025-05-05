import { map_funGetOneBusinessMapByPortofolioId } from "@/app_modules/map/fun/get/fun_get_one_by_portofolio_id";
import { Map_EditPin } from "@/app_modules/map/view";

export default async function Page({ params }: { params: { id: string } }) {
  const portofolioId = params.id;
  const dataMap = await map_funGetOneBusinessMapByPortofolioId({portofolioId: portofolioId})

  return (
    <>
      <Map_EditPin portofolioId={portofolioId} dataMap={dataMap} />
    </>
  );
}
