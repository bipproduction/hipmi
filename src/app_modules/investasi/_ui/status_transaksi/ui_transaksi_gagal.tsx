"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, Loader } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Investasi_ViewTransaksiGagal } from "../../_view";
import { gs_investas_menu } from "../../g_state";

export function Investasi_UiTransaksiGagal({
  dataTransaksi,
  nomorAdmin,
}: {
  dataTransaksi: any;
  nomorAdmin: any
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);
  const [isLoading, setLoading] = useState(false);

  return (
    <UIGlobal_LayoutTamplate
      header={
        <UIGlobal_LayoutHeaderTamplate
          title="Transaksi Gagal"
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
      <Investasi_ViewTransaksiGagal dataTransaksi={dataTransaksi} nomorAdmin={nomorAdmin} />
    </UIGlobal_LayoutTamplate>
  );
}
