"use client";

import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React, { useState } from "react";
import ButtonDonasi from "../../component/footer_button_donasi";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { IconDotsVertical, IconMessageShare } from "@tabler/icons-react";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";

export default function LayoutDetailMainDonasi({
  children,
  donasiId,
  authorId,
  userLoginId,
}: {
  children: React.ReactNode;
  donasiId: string;
  authorId: string;
  userLoginId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Rekap Kabar",
      icon: <IconMessageShare />,
      path: RouterDonasi.rekap_kabar({ id: donasiId }),
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Detail Donasi"
            customButtonRight={
              userLoginId !== authorId ? (
                ""
              ) : (
                <ActionIcon
                  variant="transparent"
                  onClick={() => setOpenDrawer(true)}
                >
                  <IconDotsVertical color="white" />
                </ActionIcon>
              )
            }
          />
        }
        footer={<ButtonDonasi donasiId={donasiId} />}
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
