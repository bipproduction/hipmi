import { RouterEvent } from "@/lib/router_hipmi/router_event";
import {
  IconHome,
  IconReservedLine,
  IconCalendarEvent,
  IconHistory,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_event_hotMenu } from "../global_state";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { SimpleGrid, Stack, ActionIcon, Text } from "@mantine/core";

export function Event_ComponentNewFooter() {
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
      <SimpleGrid cols={4} h={"9vh"} mx={"xs"} w={"100%"}>
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
    </>
  );
}
