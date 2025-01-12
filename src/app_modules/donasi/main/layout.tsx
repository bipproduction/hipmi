"use client";

import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconGiftCardFilled,
  IconHome,
  IconMoneybag,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_donasi_hot_menu } from "../global_state";

export default function LayoutDonasi({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [active, setActive] = useAtom(gs_donasi_hot_menu);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterDonasi.main_beranda,
      icon: <IconHome />,
    },
    {
      id: 2,
      name: "Galang Dana",
      path: RouterDonasi.status_galang_dana({ id: "1" }),
      icon: <IconMoneybag />,
    },
    {
      id: 3,
      name: "Donasi Saya",
      path: RouterDonasi.main_donasi_saya,
      icon: <IconGiftCardFilled />,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Donasi"
            routerLeft={RouterCrowd.main}
          />
        }
        footer={
          <SimpleGrid cols={listFooter.length} h={"9vh"} mx={"xs"}>
            {listFooter.map((e, i) => (
              <Stack key={i} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={active === i ? MainColor.yellow : MainColor.white}
                  onClick={() =>
                    e.path === ""
                      ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                      : (router.replace(e.path), setActive(i))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={active === i ? MainColor.yellow : MainColor.white}
                  fz={"xs"}
                  lineClamp={1}
                >
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
