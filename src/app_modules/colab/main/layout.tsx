"use client";

import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { RouterHome } from "@/lib/router_hipmi/router_home";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconHome, IconMessages, IconUsersGroup } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_colab_hot_menu } from "../global_state";
import { Collaboration_ComponentNewFooter } from "../component/comp_new_footer_collaboration";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren, UI_NewFooter } from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutColab_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_colab_hot_menu);
  const [loading, setLoading] = useState(false);

  const listFooter = [
    {
      id: 1,
      name: "Beranda",
      path: RouterColab.beranda,
      icon: <IconHome />,
    },
    {
      id: 2,
      name: "Partisipasi",
      path: RouterColab.proyek,
      icon: <IconUsersGroup />,
    },
    {
      id: 3,
      name: "Grup Diskusi",
      path: RouterColab.grup_diskusi,
      icon: <IconMessages />,
    },
  ];

  return (
    <>
      <UI_NewLayoutTamplate>
        <UI_NewHeader>
          <Component_Header
            title="Collaboration"
            routerLeft={RouterHome.main_home}
          />
        </UI_NewHeader>
        <UI_NewChildren>{children}</UI_NewChildren>
        <UI_NewFooter>
          <Collaboration_ComponentNewFooter />
        </UI_NewFooter>
      </UI_NewLayoutTamplate>

      {/* <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Collaboration"
            routerLeft={RouterHome.main_home}
          />
        }
        footer={
          <SimpleGrid cols={listFooter.length} h={"9vh"} mx={"xs"}>
            {listFooter.map((e) => (
              <Stack key={e.id} align="center" justify="center" spacing={0}>
                <ActionIcon
                  // disabled={e.path === "" ? true : false}
                  variant="transparent"
                  c={hotMenu === e.id ? MainColor.yellow : MainColor.white}
                  onClick={() => {
                    router.replace(e.path, { scroll: false });
                    setHotMenu(e.id);
                  }}
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={hotMenu === e.id ? MainColor.yellow : MainColor.white}
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
      </UIGlobal_LayoutTamplate> */}
    </>
  );
}
