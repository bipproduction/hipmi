"use client";

import { RouterPortofolio } from "@/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/lib/router_hipmi/router_map";
import UIGlobal_Drawer from "@/app_modules/_global/ui/ui_drawer";
import { ActionIcon } from "@mantine/core";
import {
  IconDots,
  IconDotsVertical,
  IconEdit,
  IconId,
  IconMapPin,
  IconMapPin2,
  IconMapPinMinus,
  IconPhotoEdit,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ComponentPortofolio_ButtonMore({
  portoId,
  userLoginId,
  authorId,
}: {
  portoId: string;
  userLoginId: string;
  authorId: string;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const listPage = [
    {
      id: "1",
      name: "Edit detail ",
      icon: <IconEdit />,
      path: RouterPortofolio.edit_data_bisnis + `${portoId}`,
    },
    {
      id: "2",
      name: "Edit logo ",
      icon: <IconPhotoEdit />,
      path: RouterPortofolio.edit_logo_bisnis + `${portoId}`,
    },
    {
      id: "3",
      name: "Edit sosial media",
      icon: <IconId />,
      path: RouterPortofolio.edit_medsos_bisnis + `${portoId}`,
    },
    {
      id: "4",
      name: "Edit data map",
      icon: <IconMapPin2 />,
      path: RouterMap.edit + `${portoId}`,
    },
    {
      id: "5",
      name: "Custom pin map",
      icon: <IconMapPin />,
      path: RouterMap.custom_pin + `${portoId}`,
    },
  ];

  return (
    <>
      {userLoginId === authorId ? (
        <ActionIcon variant="transparent" onClick={() => setOpenDrawer(true)}>
          <IconDotsVertical color="white" />
        </ActionIcon>
      ) : (
        <ActionIcon disabled variant="transparent"></ActionIcon>
      )}

      <UIGlobal_Drawer
        opened={openDrawer}
        close={() => setOpenDrawer(false)}
        component={listPage}
      />
    </>
  );
}
