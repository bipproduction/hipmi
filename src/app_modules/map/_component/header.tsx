"use client";

import { RouterMap } from "@/lib/router_hipmi/router_map";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import { ActionIcon } from "@mantine/core";
import { IconDotsVertical, IconMapPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentMap_Header() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const listPage = [
    {
      id: "1",
      name: "Tambah Pin",
      icon: <IconMapPlus />,
      path: RouterMap.create,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutHeaderTamplate
        title="Business Maps"
        // customButtonRight={
        //   <ActionIcon variant="transparent" onClick={() => setOpenDrawer(true)}>
        //     <IconDotsVertical color="white" />
        //   </ActionIcon>
        // }
      />

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
