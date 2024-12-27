"use client";

import { RouterCrowd } from "@/app/lib/router_hipmi/router_crowd";
import {
  AccentColor,
  MainColor,
} from "@/app_modules/_global/color/color_pallet";
import { gs_donasi_hot_menu } from "@/app_modules/donasi/global_state";
import { gs_investas_menu } from "@/app_modules/investasi/g_state";
import { Grid, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainCrowd() {
  const router = useRouter();
  const [changeColor, setChangeColor] = useAtom(gs_investas_menu);
  const [donasiHotMenu, setDonasiHotMenu] = useAtom(gs_donasi_hot_menu);
  const [loadingInv, setLoadingInv] = useState(false);
  const [loadingDon, setLoadingDon] = useState(false);
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Stack>
        <Image
          height={200}
          fit={"cover"}
          alt="logo"
          src={"/aset/investasi/logo-crowd-panjang-new.png"}
          onLoad={() => setLoading(false)}
          styles={{
            imageWrapper: {
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px 10px 10px 10px",
            },
            image: {
              borderRadius: "8px 8px 8px 8px",
            },
          }}
        />

        <Stack>
          {/* INVESTASI */}
          <Paper
            style={{
              cursor: "pointer",
              padding: "15px",
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              backgroundColor: MainColor.darkblue,
              color: "white",
              // color: "gray",
            }}
            onClick={() => {
              setLoadingInv(true);
              router.push(RouterCrowd.investasi);
              setChangeColor(0);
              // ComponentGlobal_NotifikasiPeringatan(
              //   "Sedang Perbaikan",
              //   3000
              // );
            }}
          >
            <Grid>
              <Grid.Col span={10}>
                <Title order={4}> Investasi</Title>
                <Text fz={12}>
                  Buat investasi dan jual beli saham lebih mudah dengan pengguna
                  lain dengan CROWD INVESTASI
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Stack h={"100%"} justify="center" align="center">
                  {/* PAKE LOADING */}
                  {/* {loadingInv ? (
                    <ComponentGlobal_Loader />
                  ) : (
                    <IconChevronRight />
                  )} */}

                  {/* GA PAKE LOADING */}
                  <IconChevronRight />
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* DONASI */}
          <Paper
            style={{
              cursor: "pointer",
              padding: "15px",
              border: `2px solid ${AccentColor.blue}`,
              borderRadius: "10px",
              backgroundColor: MainColor.darkblue,
              color: "white",
            }}
            onClick={() => {
              setLoadingDon(true);
              router.push(RouterCrowd.donasi);
              setDonasiHotMenu(0);
              // ComponentGlobal_NotifikasiPeringatan(
              //   "Sementara ini sedang maintenance",
              //   3000
              // );
            }}
          >
            <Grid>
              <Grid.Col span={10}>
                <Title order={4}> Donasi</Title>
                <Text fz={12}>
                  Berbagi info untuk berdonasi lebih luas dan lebih mudah dengan
                  CROWD DONASI
                </Text>
              </Grid.Col>
              <Grid.Col span={2}>
                <Stack h={"100%"} justify="center" align="center">
                  {/* PAKE LOADING */}
                  {/* {loadingDon ? (
                    <ComponentGlobal_Loader />
                  ) : (
                    <IconChevronRight />
                  )} */}

                  {/* GA PAKE LOADINGF */}
                  <IconChevronRight />
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}
