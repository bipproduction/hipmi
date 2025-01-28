"use client"

import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from "@/app_modules/_global/ui"
import { Investasi_ViewCreateDocument } from "../../_view";

export function Investasi_UiCreateDocument() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Tambah Dokumen" />}
      >
        <Investasi_ViewCreateDocument />
      </UIGlobal_LayoutTamplate>
    </>
  );
}