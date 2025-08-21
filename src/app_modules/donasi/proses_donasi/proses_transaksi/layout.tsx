"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_donasi_hot_menu } from "../../global_state";

export default function LayoutDonasi_ProsesTransaksi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);
  async function onClick() {
    setIsLoading(true);
    setDonasiHotMenu(2);
    router.push(RouterDonasi.main_donasi_saya);
  }
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Proses Transaksi"
            customButtonLeft={
              <ActionIcon variant="transparent" onClick={() => onClick()}>
                {isLoading ? <ComponentGlobal_Loader /> : <IconX />}
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
