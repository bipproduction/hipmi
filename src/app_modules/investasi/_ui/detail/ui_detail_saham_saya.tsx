"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Investasi_ViewDetailSahamSaya } from "../../_view";

export function Investasi_UiDetailSahamSaya() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Saham" />}
      >
        <Investasi_ViewDetailSahamSaya />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
