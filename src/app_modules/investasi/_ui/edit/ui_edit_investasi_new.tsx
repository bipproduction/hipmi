"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Investasi_ViewEditInvestasiNew } from "../../_view/edit/view_edit_investasi_new";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewHeader,
  UI_NewChildren,
} from "@/app_modules/_global/ui/V2_layout_tamplate";

export function Investasi_UiEditInvestasiNew() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
         header={<UIGlobal_LayoutHeaderTamplate title="Edit Investasi" />}
       >
         <Investasi_ViewEditInvestasiNew />
       </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Edit Investasi" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewEditInvestasiNew />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
