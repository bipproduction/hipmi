"use client";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
   UI_NewChildren,
   UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import Portofolio_UiListDetailNew from "../ui/ui_list_detail_portofolio_new";

export default function ListDetailPortofolioNew() {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
         header={<UIGlobal_LayoutHeaderTamplate title="Daftar Portofolio" />}
       >
         <Portofolio_UiListDetailNew />
       </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Daftar Portofolioo" />
        </UI_NewHeader>
        <UI_NewChildren>
          <Portofolio_UiListDetailNew />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
