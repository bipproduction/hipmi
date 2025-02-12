"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";
import { gs_donasi_hot_menu } from "../../global_state";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { useRouter } from "next/navigation";

export default function LayoutDonasi_InvoiceProses({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);
  async function onClick() {
    setDonasiHotMenu(2);
    router.push(RouterDonasi.main_donasi_saya);
  }
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Invoice"
            customButtonLeft={
              <ActionIcon variant="transparent" onClick={() => onClick()}>
                <IconX color="white"/>
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
