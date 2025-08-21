"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { Investasi_ViewEditProspektus } from "../../_view";

export function Investasi_UiEditProspektus() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Prospektus" />}
      >
        <Investasi_ViewEditProspektus />
      </UIGlobal_LayoutTamplate> */}
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Edit Prospektus" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewEditProspektus />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
