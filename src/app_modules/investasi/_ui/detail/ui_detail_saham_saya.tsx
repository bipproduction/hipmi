"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Investasi_ViewDetailSahamSaya } from "../../_view";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren } from "@/app_modules/_global/ui/V2_layout_tamplate";

export function Investasi_UiDetailSahamSaya() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Saham" />}
      >
        <Investasi_ViewDetailSahamSaya />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Detail Saham" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewDetailSahamSaya />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
