import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_colab_hot_menu } from "../global_state";
import { useState } from "react";

import { IconHome, IconMessages, IconUsersGroup } from "@tabler/icons-react";
import { RouterColab } from "@/lib/router_hipmi/router_colab";
import { MainColor } from "@/app_modules/_global/color";
import { SimpleGrid, Stack, ActionIcon, Text } from "@mantine/core";

export function Collaboration_ComponentNewFooter() {
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
      <SimpleGrid cols={listFooter.length} h={"9vh"} mx={"xs"} w={"100%"}>
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
    </>
  );
}
