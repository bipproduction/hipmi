"use client";

import { RouterColab } from "@/lib/router_hipmi/router_colab";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function LayoutColab_DetailProyekSaya({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{id: string}>()
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Edit Proyek",
      icon: <IconEdit />,
      path: RouterColab.edit + params.id,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Proyek Saya"
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
