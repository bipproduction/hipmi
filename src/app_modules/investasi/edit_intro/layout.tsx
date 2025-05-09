"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Stack } from "@mantine/core";
import React from "react";

export default function LayoutEditIntroInvestasi({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Edit Intro" />}
      >
        <Stack>{children}</Stack>
      </UIGlobal_LayoutTamplate>
    </>
  );
}
