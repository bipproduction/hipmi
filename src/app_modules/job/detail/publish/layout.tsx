"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import React from "react";

export default function LayoutJob_DetailPublish({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Publish" />}
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Detail Publish" />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
