'use client'
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from "@/app_modules/_global/ui";
import ComponentPortofolio_ButtonMoreNew from "../component/button_more_new";

export default function PortofolioLayoutNew({ children }: { children: any }) {
   return (
      <>
         <UIGlobal_LayoutTamplate
            header={
               <UIGlobal_LayoutHeaderTamplate
                  title="Detail Portofolio"
                  customButtonRight={<ComponentPortofolio_ButtonMoreNew />}
               />
            }
         >
            {children}
         </UIGlobal_LayoutTamplate>
      </>
   )
}