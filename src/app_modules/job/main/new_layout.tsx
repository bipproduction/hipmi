"use client";

import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { NewUI_Content } from "@/app_modules/_global/ui/new_ui_content";
import { NewUI_Footer } from "@/app_modules/_global/ui/new_ui_footer";
import { NewUI_Header } from "@/app_modules/_global/ui/new_ui_header";
import { NewUI_Tamplate } from "@/app_modules/_global/ui/new_ui_tamplate";
import { RouterHome } from "@/lib/router_hipmi/router_home";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconHistory, IconHome, IconReservedLine } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_job_hot_menu } from "../global_state";

export default function NewLayoutJob_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenuId, setHotMenuId] = useAtom(gs_job_hot_menu);
  const [isLoading, setLoading] = useState(false);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterJob.beranda,
      icon: <IconHome />,
    },

    {
      id: 2,
      name: "Status",
      path: RouterJob.status({ id: "1" }),
      icon: <IconReservedLine />,
    },
    {
      id: 3,
      name: "Arsip",
      path: RouterJob.arsip,
      icon: <IconHistory />,
    },
  ];

  return (
    <>
      <NewUI_Tamplate>
        <NewUI_Header title="Job" routerLeft={RouterHome.main_home} />

        <NewUI_Content>{children}</NewUI_Content>

        <NewUI_Footer>
          <SimpleGrid cols={3} h={"9vh"} mx={"xs"} w={"100%"}>
            {listFooter.map((e, i) => (
              <Stack key={i} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={hotMenuId === e.id ? MainColor.yellow : "white"}
                  onClick={() =>
                    e.path === ""
                      ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                      : (router.replace(e.path), setHotMenuId(e.id))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={hotMenuId === e.id ? MainColor.yellow : "white"}
                  fz={"xs"}
                  lineClamp={1}
                >
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </NewUI_Footer>
      </NewUI_Tamplate>

      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Job"
            routerLeft={RouterHome.main_home}
          />
        }
        footer={}
      >
        {children}
      </UIGlobal_LayoutTamplate> */}
    </>
  );
}
