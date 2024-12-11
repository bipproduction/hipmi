'use client'
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from "@/app_modules/_global/ui";
import Portofolio_UiListDetailNew from "../ui/ui_list_detail_portofolio_new";

export default function ListDetailPortofolioNew() {
   return (
      <>
         <UIGlobal_LayoutTamplate header={<UIGlobal_LayoutHeaderTamplate title="Daftar Portofolio" />} >
            <Portofolio_UiListDetailNew />
         </UIGlobal_LayoutTamplate>
      </>
   )
}