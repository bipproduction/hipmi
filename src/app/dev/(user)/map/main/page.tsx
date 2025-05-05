import { Map_ViewNew } from "@/app_modules/map/view/main_view_new";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default async function Page() {
  // const dataMap = await map_funGetAllMap();

  return (
    <>
      {/* <Map_View mapboxToken={mapboxToken} dataMap={dataMap} /> */}
      <Map_ViewNew mapboxToken={mapboxToken} />
    </>
  );
}
