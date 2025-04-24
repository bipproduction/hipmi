"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewFooter,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterCrowd } from "@/lib/router_hipmi/router_crowd";
import React from "react";
import { Investasi_ComponentFooterMain } from "../../_component";

export function Investasi_UiLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            routerLeft={RouterCrowd.main}
            title="Investasi"
          />
        }
        footer={<Investasi_ComponentFooterMain />}
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header routerLeft={RouterCrowd.main} title="Investasi" />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
        <UI_NewFooter>
          <Investasi_ComponentFooterMain />
        </UI_NewFooter>
      </UI_NewLayoutTamplate>
    </>
  );
}
