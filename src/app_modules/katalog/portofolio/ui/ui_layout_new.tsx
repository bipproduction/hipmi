"use client";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import ComponentPortofolio_ButtonMoreNew from "../component/button_more_new";

export default function PortofolioLayoutNew({
  children,
  userLoginId,
}: {
  children: any;
  userLoginId: string;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
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
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail Portofolio"
            customButtonRight={
              <ComponentPortofolio_ButtonMoreNew userLoginId={userLoginId} />
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
