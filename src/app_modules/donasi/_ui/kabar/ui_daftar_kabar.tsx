"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Donasi_ViewDaftarKabar } from "../../_view";

export function Donasi_UiDaftarKabar() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Kabar" />}
      >
        <Donasi_ViewDaftarKabar />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
