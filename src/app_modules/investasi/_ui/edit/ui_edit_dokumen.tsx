"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewEditDokumen } from "../../_view";

export function Investasi_UiEditDokumen() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Dokumen" />}
      >
        <Investasi_ViewEditDokumen />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
