import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconChecklist, IconCircleCheck } from "@tabler/icons-react";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ComponentInvestasi_IsEmptyData from "../component/is_empty_data";
import { MODEL_INVESTASI } from "../_lib/interface";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";

export default function Publish({ data }: { data: MODEL_INVESTASI[] }) {
  const router = useRouter();
  const [sisaWaktu, setSisaWaktu] = useState();

  if (_.isEmpty(data)) return <ComponentGlobal_IsEmptyData />;

  return (
    <>
      {data.map((e) => (
        <Paper
          key={e.id}
          onClick={() =>
            router.push(RouterInvestasi_OLD.detail_publish + `${e.id}`)
          }
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            borderRadius: "10px",
            border: `2px solid ${AccentColor.blue}`,
            color: MainColor.white,
            marginBottom: "15px",
          }}
        >
          <Grid>
            <Grid.Col span={8}>
              <Text fw={"bold"}> {_.capitalize(e.title)}</Text>
              <Stack spacing={0}>
                <Text fz={10}>Target Dana:</Text>
                <Text>
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID", {
                    maximumSignificantDigits: 10,
                  }).format(+e.targetDana)}
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={4}>
              <AspectRatio ratio={16 / 9}>
                <Paper radius={"md"}>
                  <Image
                    alt=""
                    src={RouterInvestasi_OLD.api_gambar + `${e.imagesId}`}
                  />
                </Paper>
              </AspectRatio>
            </Grid.Col>
          </Grid>

          <Group position="center" mt={"md"}>
            {Number(e.MasterPencarianInvestor.name) -
              moment(new Date()).diff(new Date(e.updatedAt), "days") <=
            0 ? (
              <Group position="right">
                <IconCircleCheck color="green" />
                <Text c={"green"}>Selesai</Text>
              </Group>
            ) : (
              <Group position="center" style={{fontSize: 10, fontWeight: "bold"}}>
                <Group>
                  {Number(e.MasterPencarianInvestor.name) -
                    moment(new Date()).diff(new Date(e.countDown), "days") <=
                  0 ? (
                    <Group>
                      <IconChecklist />
                      <Text>Selesai</Text>
                    </Group>
                  ) : (
                    <Box>
                      Sisa Waktu : {}
                      {Number(e.MasterPencarianInvestor.name) -
                        moment(new Date()).diff(
                          new Date(e.countDown),
                          "days"
                        )}{" "}
                      hari
                    </Box>
                  )}
                </Group>
              </Group>
            )}
          </Group>
        </Paper>
      ))}
    </>
  );
}
