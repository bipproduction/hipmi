"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewDaftarDokumen } from "../../_view";

export function Investasi_UiDaftarDokmen() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Dokumen" />}
      >
        <Investasi_ViewDaftarDokumen />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Daftar Dokumen" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewDaftarDokumen />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
