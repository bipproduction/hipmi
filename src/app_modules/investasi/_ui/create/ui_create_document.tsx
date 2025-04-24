"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewCreateDocument } from "../../_view";

export function Investasi_UiCreateDocument() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Tambah Dokumen" />}
      >
        <Investasi_ViewCreateDocument />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Tambah Dokumen" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewCreateDocument />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
