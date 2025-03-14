import { RouterVote } from "@/lib/router_hipmi/router_vote";
import {
  IconHome,
  IconReservedLine,
  IconClick,
  IconHistory,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_vote_hotMenu } from "../global_state";
import { MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { SimpleGrid, Stack, ActionIcon, Text } from "@mantine/core";

export function Voting_ComponentFooterLayout() {
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
      <SimpleGrid cols={4} mx={"xs"} w={"100%"}>
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
    </>
  );
}
