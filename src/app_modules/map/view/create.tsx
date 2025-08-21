import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewChildren, UI_NewHeader } from "@/app_modules/_global/ui/V2_layout_tamplate";
import { UiMap_CreatePin } from "../ui/ui_create_pin";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function Map_CreateNewPin() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Tambah Pin" hideButtonLeft />
        }
      >
        {!mapboxToken ? (
          <ComponentGlobal_IsEmptyData text="Mapbox token not found" />
        ) : (
          <UiMap_CreatePin mapboxToken={mapboxToken} />
        )}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Tambah Pin" hideButtonLeft />
        </UI_NewHeader>
        <UI_NewChildren>
          {!mapboxToken ? (
            <ComponentGlobal_IsEmptyData text="Mapbox token not found" />
          ) : (
            <UiMap_CreatePin mapboxToken={mapboxToken} />
          )}
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
