"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewProsesPembelian } from "../../_view";

export function Investasi_UiProsesPembelian({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Pembelian Saham" />}
      >
        <Investasi_ViewProsesPembelian dataInvestasi={dataInvestasi} />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Pembelian Saham" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewProsesPembelian dataInvestasi={dataInvestasi} />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
