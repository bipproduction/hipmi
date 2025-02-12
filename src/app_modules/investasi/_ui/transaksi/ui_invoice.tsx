"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { Investasi_ViewInvoice } from "../../_view";
import { useAtom } from "jotai";

import { useState } from "react";
import { gs_investas_menu } from "../../g_state";
import { useRouter } from "next/navigation";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { ActionIcon, Loader } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export function Investasi_UiInvoice({ dataInvoice }: { dataInvoice : any}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);
  const [isLoading, setLoading] = useState(false);


  return (
    <UIGlobal_LayoutTamplate
      header={
        <UIGlobal_LayoutHeaderTamplate
          title="Invoice"
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
      <Investasi_ViewInvoice dataInvoice={dataInvoice} />
    </UIGlobal_LayoutTamplate>
  );
}
