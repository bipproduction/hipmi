"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UI_NewLayoutTamplate, {
  UI_NewHeader,
  UI_NewChildren,
} from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutColab_DetailPartisipasiProyek({
  children,
}: {
  children: any;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Partisipan" />}
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Detail Partisipan" />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
