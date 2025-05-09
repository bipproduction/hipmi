"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LayoutEvent_DetailDraft({
  children,
  eventId,
}: {
  children: React.ReactNode;
  eventId: string;
}) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Edit Event",
      icon: <IconEdit />,
      path: RouterEvent.edit + eventId,
    },
  ];

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail Draft"
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setOpenDrawer(true)}
              >
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>

      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
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
      </UIGlobal_LayoutTamplate> */}

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
