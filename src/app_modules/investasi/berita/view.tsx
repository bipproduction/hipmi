"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import {
  AspectRatio,
  Box,
  Center,
  Grid,
  Group,
  Image,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MODEL_INVESTASI } from "../_lib/interface";
import { useState } from "react";
import _ from "lodash";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";

export default function BeritaInvestasi({
  dataInvestasi,
}: {
  dataInvestasi: MODEL_INVESTASI;
}) {
  const router = useRouter();
  const [berita, setBerita] = useState(dataInvestasi);

  return (
    <>
      {!_.isEmpty(berita.BeritaInvestasi) ? (
        berita.BeritaInvestasi.map((e) => (
          <Paper
            key={e.id}
            style={{
              padding: "15px",
              backgroundColor: AccentColor.darkblue,
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              color: "white",
              marginBottom: "15px",
            }}
            onClick={() =>
              router.push(RouterInvestasi_OLD.detail_berita + `${e.id}`)
            }
          >
            <Stack>
              <Group position="apart">
                <Title order={6} w={"70%"} lineClamp={1}>
                  {e.title}
                </Title>
                <Text fz={"xs"}>{moment(e.createdAt).format("LL")}</Text>
              </Group>

              <Grid pt={5}>
                <Grid.Col span={8}>
                  <Text lineClamp={3} fz={12}>
                    {e.deskripsi}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <AspectRatio ratio={16 / 9} h={50} w={100}>
                    <Image
                      alt=""
                      src={RouterInvestasi_OLD.api_gambar + `${e.imagesId}`}
                    />
                  </AspectRatio>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        ))
      ) : (
        <ComponentGlobal_IsEmptyData />
      )}
    </>
  );
}
