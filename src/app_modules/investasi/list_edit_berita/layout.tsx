"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconPencilPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutListEditBeritaInvestasi({
  children,
  idInves,
}: {
  children: React.ReactNode;
  idInves: string;
}) {
  const router = useRouter();
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah Berita",
      icon: <IconPencilPlus />,
      path: RouterInvestasi_OLD.create_berita + `${idInves}`,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Daftar Berita"
            // iconRight={<IconPencilPlus />}
            // routerRight={RouterInvestasi.create_berita + `${idInves}`}
            customButtonRight={
              <ActionIcon
                variant="transparent"
                onClick={() => setIsOpenDrawer(true)}
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
        opened={isOpenDrawer}
        close={() => setIsOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
