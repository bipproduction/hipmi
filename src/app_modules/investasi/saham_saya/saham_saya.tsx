"use client";

import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  AspectRatio,
  Box,
  Card,
  Center,
  Grid,
  Image,
  Paper,
  Progress,
  Stack,
  Text
} from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MODEL_Transaksi_Investasi } from "../_lib/interface";

export default function InvestasiSahamTerbeli({
  listTransaksi,
}: {
  listTransaksi: MODEL_Transaksi_Investasi[];
}) {
  const router = useRouter();
  const [transaksi, setTransaksi] = useState(listTransaksi);

  if (_.isEmpty(transaksi)) return <ComponentGlobal_IsEmptyData />;

  return (
    <>
      {transaksi.map((e) => (
        <Card
          key={e.id}
          style={{
            padding: "15px",
            backgroundColor: AccentColor.darkblue,
            border: `2px solid ${AccentColor.blue}`,
            borderRadius: "10px",
            color: "white",
            marginBottom: "15px",
          }}

          onClick={() => router.push(RouterInvestasi_OLD.detail_saham_terbeli + e.id)}
        >
          {/* <Card.Section p={"sm"} >
              <ComponentGlobal_AuthorNameOnHeader
                authorName={e?.Investasi?.author?.username}
                imagesId={e?.Investasi?.author.Profile.imagesId}
                profileId={e?.Investasi?.author.Profile.id}
                isPembatas
              />
           
          </Card.Section> */}

          <Card.Section p={"md"}>
            <Stack spacing={"lg"}>
              <Stack spacing={"lg"}>
                <Center>
                  <Text fw={"bold"} fz={20} lineClamp={1}>
                    {e.Investasi.title}
                  </Text>
                </Center>
                <Progress
                  label={
                    "" +
                    (
                      ((+e.Investasi.totalLembar - +e.Investasi.sisaLembar) /
                        +e.Investasi.totalLembar) *
                      100
                    ).toFixed(1) +
                    "%"
                  }
                  value={
                    +(
                      ((+e.Investasi.totalLembar - +e.Investasi.sisaLembar) /
                        +e.Investasi.totalLembar) *
                      100
                    ).toFixed(1)
                  }
                  color="teal"
                  size="xl"
                  radius="xl"
                />
              </Stack>
              <Grid>
                <Grid.Col span={6}>
                  <Stack spacing={5}>
                    <Stack spacing={0}>
                      <Text fz={14}>Lembar Saham:</Text>
                      <Text fw={"bold"} lineClamp={1}>
                        {new Intl.NumberFormat("id-ID", {
                          maximumFractionDigits: 10,
                        }).format(+e.quantity)}
                      </Text>
                    </Stack>
                    <Stack spacing={0}>
                      <Text fz={14}>Total:</Text>
                      <Text fw={"bold"} lineClamp={1}>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID", {
                          maximumFractionDigits: 10,
                        }).format(+e.gross_amount)}
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <AspectRatio ratio={16 / 9}>
                    <Paper radius={"md"}>
                      {e.Investasi.imagesId ? (
                        <Image
                          alt=""
                          src={
                            RouterInvestasi_OLD.api_gambar +
                            `${e.Investasi.imagesId}`
                          }
                        />
                      ) : (
                        <Image alt="" src={"/aset/no-img.png"} />
                      )}
                    </Paper>
                  </AspectRatio>
                </Grid.Col>
              </Grid>
            </Stack>
            <Box></Box>
          </Card.Section>
        </Card>
      ))}
    </>
  );
}
