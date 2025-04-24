"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Donasi_ViewEditKabar } from "../../_view";

export function Donasi_UiEditKabar({ dataKabar }: { dataKabar: any }) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Kabar" />}
      >
        <Donasi_ViewEditKabar dataKabar={dataKabar as any} />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Edit Kabar" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Donasi_ViewEditKabar dataKabar={dataKabar as any} />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
