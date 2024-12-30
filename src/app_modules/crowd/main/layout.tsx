"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React from "react";

export default function LayoutMainCrowd({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Crowdfunding"
            routerLeft={RouterHome.main_home}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
