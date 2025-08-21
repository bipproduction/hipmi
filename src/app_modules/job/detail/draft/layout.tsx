"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React from "react";

export default function LayoutJob_DetailDraft({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure();

  const listComponent = [
    {
      id: "1",
      name: "Edit Job",
      icon: <IconEdit />,
      path: RouterJob.edit + id,
    },
  ];

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail Draft"
            iconRight={
              <ActionIcon variant="transparent" onClick={() => open()}>
                <IconDotsVertical color="white" />
              </ActionIcon>
            }
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>

      <UIGlobal_Drawer
        opened={opened}
        close={close}
        component={listComponent}
      />
    </>
  );
}
