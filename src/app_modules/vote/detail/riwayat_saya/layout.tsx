"use client";

import { RouterVote } from "@/lib/router_hipmi/router_vote";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconUsersGroup } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, {
  UI_NewHeader,
  UI_NewChildren,
} from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutVote_DetailRiwayatSaya({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id: string }>();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Riwayat"
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
        {children}
      </UIGlobal_LayoutTamplate> */}

      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Detail Riwayat"
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
        <UI_NewChildren>{children}</UI_NewChildren>
      </UI_NewLayoutTamplate>

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={[
          {
            id: "1",
            name: "Daftar Kontribusi",
            icon: <IconUsersGroup />,
            path: RouterVote.daftar_kontributor + params.id,
          },
        ]}
      />
    </>
  );
}
