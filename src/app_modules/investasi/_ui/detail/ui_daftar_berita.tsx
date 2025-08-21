"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewDaftarBerita } from "../../_view";

export function Investasi_UiDaftarBerita() {
  return (
    // <UIGlobal_LayoutTamplate
    //   header={<UIGlobal_LayoutHeaderTamplate title="Daftar Berita" />}
    // >
    //   <Investasi_ViewDaftarBerita />
    // </UIGlobal_LayoutTamplate>

    <UI_NewLayoutTamplate>
      <UI_NewHeader>
        <Component_Header title="Daftar Berita" />
      </UI_NewHeader>
      <UI_NewChildren>
        <Investasi_ViewDaftarBerita />
      </UI_NewChildren>
    </UI_NewLayoutTamplate>
  );
}
