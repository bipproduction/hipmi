"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewChildren, UI_NewHeader } from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewListInvestor } from "../../_view/detail/view_list_investor";

export function Investasi_UiListInvestor() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Investor" />}
      >
        <Investasi_ViewListInvestor />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Daftar Investor" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewListInvestor />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
