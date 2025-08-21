"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewEditDokumen } from "../../_view";

export function Investasi_UiEditDokumen() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Dokumen" />}
      >
        <Investasi_ViewEditDokumen />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Edit Dokumen" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewEditDokumen />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
