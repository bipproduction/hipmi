import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ComponentMap_Header } from "../_component";
import { UiMap_MapBoxViewNew } from "../ui/ui_map_new";

export async function Map_ViewNew({ mapboxToken }: { mapboxToken: string }) {
  return (
    <>
      <UIGlobal_LayoutTamplate header={<ComponentMap_Header />}>
        <UiMap_MapBoxViewNew mapboxToken={mapboxToken} />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
