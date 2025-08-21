"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import React from "react";

export const dynamic = "force-dynamic";
export default function LayoutForum_Detail({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Postingan" posotion={"left"} />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
