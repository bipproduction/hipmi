"use client";

import { RouterCrowd } from "@/lib/router_hipmi/router_crowd";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";
import { Investasi_ComponentFooterMain } from "../../_component";

export function Investasi_UiLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            routerLeft={RouterCrowd.main}
            title="Investasi"
          />
        }
        footer={<Investasi_ComponentFooterMain />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
