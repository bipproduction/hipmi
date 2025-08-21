"use client";

import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import {
  UIGlobal_Drawer,
  UIGlobal_LayoutHeaderTamplate,
  UIGlobal_LayoutTamplate,
} from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { IconCirclePlus, IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Investasi_ViewRekapDokumen } from "../../_view";
import { useParams } from "next/navigation";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren } from "@/app_modules/_global/ui/V2_layout_tamplate";

export function Investasi_UiRekapDokumen() {
  const params = useParams<{ id: string }>();
  const investasiId = params.id;

  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Tambah Dokumen",
      icon: <IconCirclePlus />,
      path: NEW_RouterInvestasi.create_dokumen({ id: investasiId }),
    },
  ];

  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Rekap Dokumen"
            customButtonRight={
              <ActionIcon
                onClick={() => setOpenDrawer(true)}
                variant="transparent"
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        <Investasi_ViewRekapDokumen />
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Rekap Dokumen"
            customButtonRight={
              <ActionIcon
                onClick={() => setOpenDrawer(true)}
                variant="transparent"
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>
          <Investasi_ViewRekapDokumen />
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
