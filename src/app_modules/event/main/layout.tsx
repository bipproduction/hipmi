"use client";

import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { RouterHome } from "@/lib/router_hipmi/router_home";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import { ActionIcon, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconCalendarEvent,
  IconHistory,
  IconHome,
  IconTimelineEventText,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { gs_event_hotMenu } from "../global_state";
import { IconReservedLine } from "@tabler/icons-react";

export default function LayoutEvent_Main({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_event_hotMenu);

  const listFooter = [
    {
      id: "1",
      name: "Beranda",
      path: RouterEvent.beranda,
      icon: <IconHome />,
    },

    {
      id: "2",
      name: "Status",
      path: RouterEvent.status({ id: "1" }),
      icon: <IconReservedLine />,
    },
    {
      id: "3",
      name: "Kontribusi",
      path: RouterEvent.kontribusi,
      icon: <IconCalendarEvent />,
    },
    {
      id: "4",
      name: "Riwayat",
      path: RouterEvent.riwayat({ id: "1" }),
      icon: <IconHistory />,
    },
  ];
  return (
    <>
      <UIGlobal_LayoutTamplate
        header={
          <UIGlobal_LayoutHeaderTamplate
            title="Event"
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
                  c={hotMenu === i ? MainColor.yellow : MainColor.white}
                  onClick={() =>
                    e.path === ""
                      ? ComponentGlobal_NotifikasiPeringatan("Cooming Soon")
                      : (router.replace(e.path), setHotMenu(i))
                  }
                >
                  {e.icon}
                </ActionIcon>
                <Text
                  c={hotMenu === i ? MainColor.yellow : MainColor.white}
                  fz={"xs"}
                  lineClamp={1}
                >
                  {e.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>

          // <Footer
          //   height={"10vh"}
          //   bg={"dark"}
          //   sx={{ borderTop: "px solid blue" }}
          // >
          //   <Stack justify="center" h={"100%"}>
          //     <Grid >
          //       {listFooter.map((e, i) => (
          //         <Grid.Col
          //           key={e.id}
          //           span={"auto"}
          //           pt={"md"}
          //           onClick={() => {
          //             router.replace(e.path);
          //             setHotMenu(i);
          //           }}
          //         >
          //           <Center>
          //             <Stack align="center" spacing={0}>
          //               <ActionIcon
          //                 variant="transparent"
          //                 c={hotMenu === i ? "blue" : "white"}
          //               >
          //                 {e.icon}
          //               </ActionIcon>
          //               <Text fz={10} c={hotMenu === i ? "blue" : "white"}>
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
