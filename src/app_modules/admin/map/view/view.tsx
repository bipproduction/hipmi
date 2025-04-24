import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { UiAdminMap_MapBoxView } from "../ui";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function AdminMap_View() {

  return (
    <>
      <ComponentAdminGlobal_HeaderTamplate name="Maps" />
      <UiAdminMap_MapBoxView
        mapboxToken={mapboxToken}
      />
    </>
  );
}
