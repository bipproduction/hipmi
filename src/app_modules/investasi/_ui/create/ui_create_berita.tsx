"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewCreateBerita } from "../../_view";

export function Investasi_UiCreateBerita() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Tambah Berita" />}
      >
        <Investasi_ViewCreateBerita />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Tambah Berita" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewCreateBerita />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
