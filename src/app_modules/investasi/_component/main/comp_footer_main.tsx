import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { SimpleGrid, Stack, ActionIcon, Text } from "@mantine/core";
import {
  IconChartHistogram,
  IconChartPie,
  IconCash,
  IconNotes,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gs_investas_menu } from "../../g_state";

const listFooter = [
  {
    id: 1,
    name: "Bursa",
    route: RouterInvestasi_OLD.main,
    icon: <IconChartHistogram />,
  },
  {
    id: 2,
    name: "Portofolio",
    route: RouterInvestasi_OLD.main_porto,
    icon: <IconChartPie />,
  },
  {
    id: 3,
    name: "Saham Saya",
    route: RouterInvestasi_OLD.main_investasi,
    icon: <IconCash />,
  },
  {
    id: 4,
    name: "Transaksi",
    route: RouterInvestasi_OLD.main_transaksi,
    icon: <IconNotes />,
  },
];

export function Investasi_ComponentFooterMain() {
  const router = useRouter();
  const [hotMenu, setHotMenu] = useAtom(gs_investas_menu);

  return (
    <>
      <SimpleGrid cols={listFooter.length} h={"9vh"} mx={"xs"}>
        {listFooter.map((e, i) => (
          <Stack key={i} align="center" justify="center" spacing={0}>
            <ActionIcon
              // disabled={e.path === "" ? true : false}
              variant="transparent"
              c={hotMenu === i ? MainColor.yellow : "white"}
              onClick={() => {
                router.push(e.route);
                setHotMenu(i);
              }}
            >
              {e.icon}
            </ActionIcon>
            <Text
              c={hotMenu === i ? MainColor.yellow : "white"}
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
