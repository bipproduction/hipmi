"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewCreateBerita } from "../../_view";

export function Investasi_UiCreateBerita() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Tambah Berita" />}
      >
        <Investasi_ViewCreateBerita  />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
