"use client";

import { RouterJob } from "@/lib/router_hipmi/router_job";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import {
  ActionIcon
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import React from "react";

export default function LayoutJob_DetailDraft({
  children,
  jobId,
}: {
  children: React.ReactNode;
  jobId: string;
}) {
  const [opened, { open, close }] = useDisclosure();

  const listComponent = [
    {
      id: "1",
      name: "Edit Job",
      icon: <IconEdit />,
      path: RouterJob.edit + jobId,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Draft"
            iconRight={
              <ActionIcon variant="transparent" onClick={() => open()}>
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
            // routerRight={}
          />
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>

      <UIGlobal_Drawer
        opened={opened}
        close={close}
        component={listComponent}
      />
    </>
  );
}
