import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { UiMap_CreatePin } from "../ui/ui_create_pin";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { UiMap_EditPin } from "../ui";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren } from "@/app_modules/_global/ui/V2_layout_tamplate";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function Map_EditPin({
  portofolioId,
  dataMap,
}: {
  portofolioId: string;
  dataMap: any
}) {
  if (!mapboxToken)
    return <ComponentGlobal_IsEmptyData text="Mapbox token not found" />;

  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Pin" />}
      >
        <UiMap_EditPin mapboxToken={mapboxToken} dataMap={dataMap} />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Edit Pin" />
        </UI_NewHeader>
        <UI_NewChildren>
          <UiMap_EditPin mapboxToken={mapboxToken} dataMap={dataMap} />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
