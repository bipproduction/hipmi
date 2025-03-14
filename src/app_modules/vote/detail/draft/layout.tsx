"use client";

import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UI_NewLayoutTamplate, {
  UI_NewChildren,
  UI_NewHeader,
} from "@/app_modules/_global/ui/V2_layout_tamplate";
import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";

export default function LayoutVote_DetailDraft({
  children,
  voteId,
}: {
  children: React.ReactNode;
  voteId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listComponent = [
    {
      id: "1",
      name: "Edit Voting",
      icon: <IconEdit />,
      path: RouterVote.edit + voteId,
    },
  ];

  return (
    <>
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

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listComponent}
      />
    </>
  );
}
