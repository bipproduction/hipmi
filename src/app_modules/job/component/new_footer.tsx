import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { SimpleGrid, Stack, ActionIcon, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconReservedLine, IconHistory } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useState } from "react";
import { gs_job_hot_menu } from "../global_state";
import { useRouter } from "next/navigation";

export function NewFooter() {
     const router = useRouter();
      const [hotMenuId, setHotMenuId] = useAtom(gs_job_hot_menu);
      const [isLoading, setLoading] = useState(false);
      const [opened, handlers] = useDisclosure(false);
    
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
      </>
    );
}