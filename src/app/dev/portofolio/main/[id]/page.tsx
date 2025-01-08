import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { Portofolio_UiDetailNew } from "@/app_modules/katalog/portofolio";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page() {
  const userLoginId = await funGetUserIdByToken()

  return (
    <>
      <Portofolio_UiDetailNew
        mapboxToken={mapboxToken}
        userLoginId={userLoginId}
      />
    </>
  );
}
