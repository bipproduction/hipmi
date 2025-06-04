"use client";

import { useAtom } from "jotai";
import { Investasi_ViewInvoice } from "../../_view";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { ActionIcon, Loader } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gs_investas_menu } from "../../g_state";

export function Investasi_UiInvoice() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);
  const [isLoading, setLoading] = useState(false);

  return (
    <UI_NewLayoutTamplate>
      <UI_NewHeader>
        <Component_Header
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
      </UI_NewHeader>
      <UI_NewChildren>
        <Investasi_ViewInvoice />
      </UI_NewChildren>
    </UI_NewLayoutTamplate>
  );
}
