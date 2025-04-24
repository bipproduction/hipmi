import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { UiMap_CustomPin } from "../ui";

const mapboxToken = process.env.MAPBOX_TOKEN!;
export async function Map_CustomPin({ dataMap }: { dataMap: any }) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Custom Pin" />}
      >
        <UiMap_CustomPin mapboxToken={mapboxToken} dataMap={dataMap} />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Custom Pin" />
        </UI_NewHeader>
        <UI_NewChildren>
          <UiMap_CustomPin mapboxToken={mapboxToken} dataMap={dataMap} />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
