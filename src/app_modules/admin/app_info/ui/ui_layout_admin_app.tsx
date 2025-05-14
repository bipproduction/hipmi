"use client";

import React from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import { Stack, Group, Button } from "@mantine/core";
import { AccentColor } from "@/app_modules/_global/color";
import {
  AdminColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { gs_app_information_menu } from "../lib";
import {
  AdminAppInformation_ViewInfoBank,
  AdminAppInformation_ViewKategoriPortofolio,
} from "../view";
import Link from "next/link";

export default function AdminAppInformation_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const listPage = [
    // {
    //   id: "1",
    //   name: "Whatsapp",
    // },
    {
      id: "2",
      name: "Informasi Bank",
      path: "/dev/admin/app-information/info-bank",
    },
    {
      id: "3",
      name: "Bidang Bisnis",
      path: "/dev/admin/app-information/bidang-bisnis",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <Stack h={"100%"}>
        <ComponentAdminGlobal_HeaderTamplate name="App Information" />

        <Group>
          {listPage.map((e, i) => (
            <Button
              key={i}
              component={Link}
              href={e.path}
              radius={"xl"}
              c={isActive(e.path) ? AdminColor.white : "gray"}
              bg={isActive(e.path) ? AccentColor.blue : AccentColor.blackgray}
              style={{
                transition: "all 0.5s",
              }}
            >
              {e.name}
            </Button>
          ))}
        </Group>

        {children}
      </Stack>
    </>
  );
}
