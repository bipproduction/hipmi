"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import React, { useState } from "react";
import { Donasi_ViewRekapKabar } from "../../_view";

export function Donasi_UiRekapKabar({
  listKabar,
  donasiId,
}: {
  listKabar: any[];
  donasiId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Tambah Kabar",
      icon: <IconCirclePlus />,
      path: RouterDonasi.create_kabar + donasiId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Daftar Kabar"
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
        }
      >
        <Donasi_ViewRekapKabar donasiId={donasiId} listKabar={listKabar} />
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
