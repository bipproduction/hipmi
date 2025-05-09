"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutDetailKabarDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Detail Kabar" />}
        // footer={<FooterDonasi />}
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
