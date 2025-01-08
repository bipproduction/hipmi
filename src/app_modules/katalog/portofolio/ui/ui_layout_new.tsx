'use client'
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from "@/app_modules/_global/ui";
import ComponentPortofolio_ButtonMoreNew from "../component/button_more_new";

export default function PortofolioLayoutNew({
  children,
  userLoginId,
}: {
  children: any;
  userLoginId: string
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Portofolio"
            customButtonRight={
              <ComponentPortofolio_ButtonMoreNew userLoginId={userLoginId} />
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}