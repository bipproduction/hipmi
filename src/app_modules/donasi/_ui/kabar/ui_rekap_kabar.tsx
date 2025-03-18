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
      {/* <UIGlobal_LayoutTamplate
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
      </UIGlobal_LayoutTamplate> */}

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
          <Donasi_ViewRekapKabar donasiId={donasiId} listKabar={listKabar} />
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
