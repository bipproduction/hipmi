"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewMetodePembayaran } from "../../_view";

export function Investasi_UiMetodePembayaran() {
  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Metode Pembayaran" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewMetodePembayaran />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
