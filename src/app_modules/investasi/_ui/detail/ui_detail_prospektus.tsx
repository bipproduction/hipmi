"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewDetailProspektus } from "../../_view";

export function Investasi_UiDetailProspektus({
  dataInvestasi,
}: {
  dataInvestasi: any;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Prospektus" />}
      >
        <Investasi_ViewDetailProspektus dataInvestasi={dataInvestasi} />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Detail Prospektus" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewDetailProspektus dataInvestasi={dataInvestasi} />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
