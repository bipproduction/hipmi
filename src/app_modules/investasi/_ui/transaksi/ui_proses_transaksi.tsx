"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { IconX } from "@tabler/icons-react";
import { Investasi_ViewProsesTransaksi } from "../../_view";
import { ActionIcon, Loader } from "@mantine/core";
import { gs_donasi_hot_menu } from "@/app_modules/donasi/global_state";
import { useAtom } from "jotai";
import { gs_investas_menu } from "../../g_state";
import { useRouter } from "next/navigation";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { useState } from "react";

export function Investasi_UiProsesTransaksi() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Proses Transaksi"
            customButtonLeft={
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setHotMenu(3);
                  setLoading(true);
                  router.push(RouterInvestasi_OLD.main_transaksi);
                }}
              >
                {isLoading ? <Loader color="yellow" /> : <IconX />}
              </ActionIcon>
            }
          />
        }
      >
        <Investasi_ViewProsesTransaksi />
      </UIGlobal_LayoutTamplate>
    </>
  );
}
