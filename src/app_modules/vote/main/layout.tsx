"use client";

import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { RouterVote } from "@/app/lib/router_hipmi/router_vote";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconClick,
  IconHistory,
  IconHome,
  IconReservedLine,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_vote_hotMenu } from "../global_state";

export default function LayoutVote_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_vote_hotMenu);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterVote.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "Status",
      path: RouterVote.status({ id: "1" }),
      icon: <IconReservedLine />,
    },
    {
      id: 3,
      name: "Kontribusi",
      path: RouterVote.kontribusi,
      icon: <IconClick />,
    },
    {
      id: 4,
      name: "Riwayat",
      path: RouterVote.riwayat({ id: "1" }),
      icon: <IconHistory />,
    },
  ];

  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Voting"
            routerLeft={RouterHome.main_home}
          />
        }
        footer={
          <SimpleGrid cols={4} h={"9vh"} mx={"xs"}>
            {listFooter.map((e, i) => (
              <Stack key={i} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={hotMenu === e.id ? MainColor.yellow : MainColor.white}
                  onClick={() =>
                    e.path === ""
                      ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                      : (router.replace(e.path), setHotMenu(e.id))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={hotMenu === e.id ? MainColor.yellow : "white"}
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
