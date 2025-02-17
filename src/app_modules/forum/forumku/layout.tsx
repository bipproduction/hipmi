"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { IconX } from "@tabler/icons-react";
import React from "react";

export default function LayoutForum_Forumku({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate title={"Forum"} iconLeft={<IconX />} />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
