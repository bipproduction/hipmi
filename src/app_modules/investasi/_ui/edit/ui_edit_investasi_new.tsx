"use client";
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate, } from "@/app_modules/_global/ui";
import { Investasi_ViewEditInvestasiNew } from "../../_view/edit/vew_edit_investasi_new";

export function Investasi_UiEditInvestasiNew() {
   return (
      <>
         <UIGlobal_LayoutTamplate
            header={<UIGlobal_LayoutHeaderTamplate title="Edit Investasi" />}
         >
            <Investasi_ViewEditInvestasiNew />
         </UIGlobal_LayoutTamplate>
      </>
   );
}
