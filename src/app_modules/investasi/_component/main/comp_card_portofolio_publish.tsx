import {
  NEW_RouterInvestasi,
  RouterInvestasi_OLD,
} from "@/lib/router_hipmi/router_investasi";
import {
  Grid,
  Stack,
  AspectRatio,
  Paper,
  Group,
  Box,
  Text,
  Image,
} from "@mantine/core";
import { IconCircleCheck, IconChecklist } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";
import { MODEL_INVESTASI } from "../../_lib/interface";
import { Investasi_ComponentStylesCard } from "../comp_card_border_and_background";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ComponentGlobal_CardLoadingOverlay,
  ComponentGlobal_LoadImageCustom,
} from "@/app_modules/_global/component";

export function Investasi_ComponentCardPortofolioPublish({
  data,
}: {
  data: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Investasi_ComponentStylesCard
        marginBottom={"15px"}
        onClickHandler={() => {
          router.push(NEW_RouterInvestasi.detail_main({ id: data?.id }), {
            scroll: false,
          });
          setVisible(true);
        }}
      >
        <Grid>
          <Grid.Col span={8}>
            <Text fw={"bold"}> {_.capitalize(data?.title)}</Text>
            <Stack spacing={0}>
              <Text fz={10}>Target Dana:</Text>
              <Text>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+data?.targetDana)}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <ComponentGlobal_LoadImageCustom
              height={80}
              fileId={data.imageId}
            />
          </Grid.Col>
        </Grid>

        <Group position="center" mt={"md"}>
          {Number(data?.MasterPencarianInvestor.name) -
            moment(new Date()).diff(new Date(data?.updatedAt), "days") <=
          0 ? (
            <Group position="right">
              <IconCircleCheck color="green" />
              <Text c={"green"}>Selesai</Text>
            </Group>
          ) : (
            <Group
              position="center"
              style={{ fontSize: 10, fontWeight: "bold" }}
            >
              <Group>
                {Number(data?.MasterPencarianInvestor.name) -
                  moment(new Date()).diff(new Date(data?.countDown), "days") <=
                0 ? (
                  <Group>
                    <IconChecklist />
                    <Text>Selesai</Text>
                  </Group>
                ) : (
                  <Box>
                    Sisa Waktu : {}
                    {Number(data?.MasterPencarianInvestor.name) -
                      moment(new Date()).diff(
                        new Date(data?.countDown),
                        "days"
                      )}{" "}
                    hari
                  </Box>
                )}
              </Group>
            </Group>
          )}
        </Group>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </Investasi_ComponentStylesCard>
    </>
  );
}
