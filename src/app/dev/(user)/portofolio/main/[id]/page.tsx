import { Portofolio_UiDetailNew } from "@/app_modules/katalog/portofolio";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export default function Page() {
  return (
    <>
      <Portofolio_UiDetailNew mapboxToken={mapboxToken} />
    </>
  );
}
