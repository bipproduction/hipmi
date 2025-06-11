"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { ActionIcon } from "@mantine/core";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Donasi_ViewRekapKabar } from "../../_view";
import { useParams } from "next/navigation";

export function Donasi_UiRekapKabar() {
  const { id } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Tambah Kabar",
      icon: <IconCirclePlus />,
      path: RouterDonasi.create_kabar + id,
    },
  ];

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Rekap Kabar"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>
          <Donasi_ViewRekapKabar />
        </UI_NewChildren>
      </UI_NewLayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
