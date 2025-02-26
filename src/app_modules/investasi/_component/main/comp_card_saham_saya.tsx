import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import {
  Box,
  Card,
  Center,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MODEL_INVOICE_INVESTASI } from "../../_lib/interface";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_TampilanAngkaRatusan,
  ComponentGlobal_TampilanRupiah,
} from "@/app_modules/_global/component";
import { useRouter } from "next/navigation";
import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import { useState } from "react";
import { Investasi_ComponentStylesCard } from "../comp_card_border_and_background";

export function Investasi_ComponentSahamSaya({
  data,
}: {
  data: MODEL_INVOICE_INVESTASI;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Investasi_ComponentStylesCard
        onClickHandler={() => {
          setVisible(true);
          router.push(NEW_RouterInvestasi.detail_saham + data?.id, {
            scroll: false,
          });
        }}
        marginBottom={"15px"}
      >
        <SimpleGrid cols={2} spacing={"xs"}>
          <Box>
            <Stack spacing={0}>
              <Text fw={"bold"} lineClamp={2}>
                {data?.Investasi?.title}
              </Text>
              <ComponentGlobal_TampilanRupiah
                nominal={+data?.nominal}
                color="white"
                fontSize={"xs"}
              />
              <ComponentGlobal_TampilanAngkaRatusan
                nominal={+data?.lembarTerbeli}
                color="white"
                fontSize={"xs"}
                textAfter="Lembar"
              />
            </Stack>
          </Box>

          <Stack justify="center">
            <Progress
              size={"xl"}
              radius={"xl"}
              color="yellow"
              value={+data.Investasi.progress}
              label={data.Investasi.progress + "%"}
              styles={{
                bar: {
                  backgroundColor: MainColor.yellow,
                },
                root: {
                  backgroundColor: "whitesmoke",
                },
                label: {
                  color: "black",
                },
              }}
            />
          </Stack>
        </SimpleGrid>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </Investasi_ComponentStylesCard>
    </>
  );
}
