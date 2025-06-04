"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewProsesPembelian } from "../../_view";

export function Investasi_UiProsesPembelian() {
  return (
    <>

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Pembelian Saham" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewProsesPembelian />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
