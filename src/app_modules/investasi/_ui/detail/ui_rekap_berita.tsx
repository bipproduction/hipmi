"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import {
  UIGlobal_Drawer
} from "@/app_modules/_global/ui";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { ActionIcon } from "@mantine/core";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Investasi_ViewRekapBerita } from "../../_view";

export function Investasi_UiRekapBerita() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah Berita",
      icon: <IconCirclePlus />,
      path: NEW_RouterInvestasi.create_berita({ id: investasiId }),
    },
  ];

  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Rekap Berita"
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
        <Investasi_ViewRekapBerita />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Rekap Berita"
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
          <Investasi_ViewRekapBerita />
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
