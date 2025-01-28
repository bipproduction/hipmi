"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewDaftarBerita } from "../../_view";

export function Investasi_UiDaftarBerita() {
  return (
    <UIGlobal_LayoutTamplate
      header={<UIGlobal_LayoutHeaderTamplate title="Daftar Berita" />}
    >
      <Investasi_ViewDaftarBerita />
    </UIGlobal_LayoutTamplate>
  );
}
