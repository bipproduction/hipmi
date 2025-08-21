"use client";

import { AccentColor } from "@/app_modules/_global/color";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { RouterAdminAppInformation } from "@/lib/router_admin/router_app_information";
import { Button, Group, Stack } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import ComponentAdminGlobal_HeaderTamplate from "../../_admin_global/header_tamplate";
import {
  IconBriefcase,
  IconMoneybag,
  IconMoodSmileFilled,
  IconSticker,
} from "@tabler/icons-react";
import { useShallowEffect } from "@mantine/hooks";

export default function AdminAppInformation_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  // Reset loading saat route berubah
  useShallowEffect(() => {
    setLoadingPath(null);
  }, [pathname]);

  const listPage = [
    {
      icon: <IconMoneybag />,
      name: "Informasi Bank",
      path: RouterAdminAppInformation.infoBank,
    },
    {
      icon: <IconBriefcase />,
      name: "Bidang Bisnis",
      path: RouterAdminAppInformation.bidangBisnis,
    },
    {
      icon: <IconMoodSmileFilled />,
      name: "Stiker",
      path: RouterAdminAppInformation.sticker,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleClick = async (path: string) => {
    if (path === pathname) return; // kalau sudah di halaman itu, jangan reload
    // setLoadingPath(path);
    router.push(path);
  };

  return (
    <Stack h="100%">
      <ComponentAdminGlobal_HeaderTamplate name="App Information" />

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "0.5rem 0",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Group spacing="sm" style={{ flexWrap: "nowrap" }}>
          {listPage.map((e, i) => {
            const active = isActive(e.path);
            const loading = loadingPath === e.path;

            return (
              <Button
                key={i}
                radius="xl"
                leftIcon={e.icon}
                c={active ? MainColor.black : MainColor.white}
                color="yellow"
                bg={active ? AccentColor.yellow : AccentColor.blackgray}
                style={{
                  transition: "all 0.5s",
                  flexShrink: 0,
                }}
                loading={loading}
                disabled={loading}
                onClick={() => handleClick(e.path)}
              >
                {e.name}
              </Button>
            );
          })}
        </Group>
      </div>

      {children}
    </Stack>
  );
}
