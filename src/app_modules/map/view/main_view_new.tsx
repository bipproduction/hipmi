import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { UiMap_MapBoxViewNew } from "../ui/ui_map_new";

export async function Map_ViewNew({ mapboxToken }: { mapboxToken: string }) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate header={<ComponentMap_Header />}>
        <UiMap_MapBoxViewNew mapboxToken={mapboxToken} />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Business Maps" />
        </UI_NewHeader>
        <UI_NewChildren>
          <UiMap_MapBoxViewNew mapboxToken={mapboxToken} />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
