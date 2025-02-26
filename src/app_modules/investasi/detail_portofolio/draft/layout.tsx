"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconFilePencil } from "@tabler/icons-react";
import React, { useState } from "react";

export default function LayoutDetailDraftInvestasi({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Edit Investasi",
      icon: <IconEdit />,
      path: RouterInvestasi_OLD.edit_intro + id,
    },
    {
      id: "2",
      name: "Edit Prospektus",
      icon: <IconFilePencil />,
      path: RouterInvestasi_OLD.upload_prospektus + id,
    },
    {
      id: "3",
      name: "Edit Dokumen",
      icon: <IconFilePencil />,
      path: RouterInvestasi_OLD.edit_dokumen + id,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
            // icon={<IconEdit />}
            // route2={`/dev/investasi/edit/${id}`}
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
