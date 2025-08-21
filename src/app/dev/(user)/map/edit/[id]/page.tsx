import { Map_EditPin } from "@/app_modules/map/view";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default function Page() {
  return (
    <>
      <Map_EditPin mapboxToken={mapboxToken} />
    </>
  );
}
