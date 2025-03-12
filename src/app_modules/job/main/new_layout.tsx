"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewFooter,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterHome } from "@/lib/router_hipmi/router_home";
import React from "react";
import { NewFooter } from "../component/new_footer";

export default function NewLayoutJob_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Job" routerLeft={RouterHome.main_home} />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
        <UI_NewFooter>
          <NewFooter />
        </UI_NewFooter>
      </UI_NewLayoutTamplate>
    </>
  );
}
