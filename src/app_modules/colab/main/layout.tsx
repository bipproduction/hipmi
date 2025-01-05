"use client";

import { RouterColab } from "@/app/lib/router_hipmi/router_colab";
import { RouterHome } from "@/app/lib/router_hipmi/router_home";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconHome, IconMessages, IconUsersGroup } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { gs_colab_hot_menu } from "../global_state";

export default function LayoutColab_Main({
  children,
  cekNotif,
}: {
  children: React.ReactNode;
  cekNotif: boolean;
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
      <UIGlobal_LayoutTamplate
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

          // <Footer height={"10vh"} bg={"black"}>
          //   {/* {value} */}
          //   <Stack justify="center" h={"100%"}>
          //     <Grid>
          //       {listFooter.map((e) => (
          //         <Grid.Col key={e.id} span={"auto"} pt={"md"}>
          //           <Center>
          //             <Stack
          //               align="center"
          //               spacing={0}
          //               onClick={() => {
          //                 router.replace(e.path);
          //                 setHotMenu(e.id);
          //               }}
          //             >
          //               <ActionIcon
          //                 variant="transparent"
          //                 c={hotMenu === e.id ? "blue" : "white"}
          //               >
          //                 {e.icon}
          //               </ActionIcon>
          //               <Text fz={10} c={hotMenu === e.id ? "blue" : "white"}>
          //                 {e.name}
          //               </Text>
          //             </Stack>
          //           </Center>
          //         </Grid.Col>
          //       ))}
          //     </Grid>
          //   </Stack>
          // </Footer>
        }
      >
        {children}
      </UIGlobal_LayoutTamplate>
    </>
  );
}
