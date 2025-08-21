import { Map_ViewNew } from "@/app_modules/map/view/main_view_new";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default function Page() {
  return (
    <>
      <Map_ViewNew mapboxToken={mapboxToken} />
    </>
  );
}
