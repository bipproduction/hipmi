import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import { Paper, Grid, Stack, AspectRatio, Text, Image } from "@mantine/core";
import _ from "lodash";

import { MODEL_INVESTASI } from "../../_lib/interface";
import { AccentColor, MainColor } from "@/app_modules/_global/color/color_pallet";
import { useRouter } from "next/navigation";

export function ComponentInvestasi_CardStatus({
  data,
  path,
}: {
  data: MODEL_INVESTASI;
  path: string;
}) {
  const router = useRouter();
  return (
    <>
      <Paper
        onClick={() => router.push(path + `${data.id}`)}
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
            <Text fw={"bold"} lineClamp={1}>
              {" "}
              {_.startCase(data.title)}
            </Text>
            <Stack spacing={0}>
              <Text fz={10}>Target Dana:</Text>
              <Text>
                Rp.{" "}
                {new Intl.NumberFormat("id-ID", {
                  maximumSignificantDigits: 10,
                }).format(+data.targetDana)}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <AspectRatio ratio={16 / 9}>
              <Paper radius={"md"}>
                <Image
                  alt=""
                  src={RouterInvestasi_OLD.api_gambar + `${data.imagesId}`}
                />
              </Paper>
            </AspectRatio>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
