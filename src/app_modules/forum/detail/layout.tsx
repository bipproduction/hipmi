"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import ComponentGlobal_V2_LoadingPage from "@/app_modules/_global/loading_page_v2";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const dynamic = "force-dynamic";
export default function LayoutForum_Detail({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (loading) return <ComponentGlobal_V2_LoadingPage />;

  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title="Postingan" posotion={"left"} />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header title="Postingan" posotion={"left"} />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>
    </>
  );
}
