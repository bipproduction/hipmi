import { Map_CustomPin } from "@/app_modules/map/view";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default function Page() {
  return (
    <>
      <Map_CustomPin mapboxToken={mapboxToken} />
    </>
  );
}
