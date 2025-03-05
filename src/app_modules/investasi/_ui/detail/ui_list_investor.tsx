"use client";

import {
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { Stack } from "@mantine/core";
import { Investasi_ViewListInvestor } from "../../_view/detail/view_list_investor";

export function Investasi_UiListInvestor() {
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={<UIGlobal_LayoutHeaderTamplate title="Daftar Investor" />}
      >
        <Investasi_ViewListInvestor />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
