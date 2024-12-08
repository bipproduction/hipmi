import { Portofolio_UiDetailNew } from "@/app_modules/katalog/portofolio";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page({ params }: { params: { id: string } }) {
  // const portofolioId = params.id;
  // const dataPortofolio = await portofolio_getOneById(portofolioId);
  // const userLoginId = await funGetUserIdByToken();

  return (
    <>
      {/* <ViewPortofolio
        dataPorto={dataPortofolio as any}
        userLoginId={userLoginId as any}
        mapboxToken={mapboxToken}
      /> */}
      <Portofolio_UiDetailNew mapboxToken={mapboxToken} />
    </>
  );
}
