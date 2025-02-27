"use client";

import { RouterPortofolio } from "@/lib/router_hipmi/router_katalog";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_AvatarAndUsername } from "@/app_modules/_global/component";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { Box, Button, Grid, Group, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconBuildingSkyscraper,
  IconListDetails,
  IconMapPin,
  IconPhoneCall,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { map_funGetOneById } from "../fun/get/fun_get_one_by_id";
import { MODEL_MAP } from "../lib/interface";
import { ComponentMap_LoadImageMap } from "./comp_load_image_map";
import { ComponentMap_SkeletonDrawerDetailData } from "./skeleton_detail_data";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import Link from "next/link";

export function ComponentMap_DetailData({
  mapId,
  isDetail,
}: {
  mapId: any;
  isDetail?: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<MODEL_MAP>();
  const [dataUser, setDataUser] = useState<MODEL_USER>();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const res: any = await map_funGetOneById({ mapId: mapId });
    setData(res);
    setDataUser(res.Author);
  }

  if (!data) return <ComponentMap_SkeletonDrawerDetailData />;

  return (
    <>
      <Stack mt={"lg"} spacing={"xl"} px={"md"}>
        <ComponentGlobal_AvatarAndUsername profile={dataUser?.Profile as any} />

        <ComponentMap_LoadImageMap fileId={data.imageId} />

        <Box>
          <Grid>
            <Grid.Col span={2}>
              <IconBuildingSkyscraper />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{data?.Portofolio.namaBisnis}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconListDetails />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{data?.Portofolio.MasterBidangBisnis.name}</Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconPhoneCall />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                + {data?.Portofolio.tlpn}
              </Text>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={2}>
              <IconMapPin />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text>{data?.Portofolio.alamatKantor}</Text>
            </Grid.Col>
          </Grid>
        </Box>

        <Group grow position={isDetail ? "center" : "apart"}>
          {!isDetail && (
            <Button
              onClick={() => {
                setIsLoading(true);
                router.push(
                  RouterPortofolio.main_detail + data?.Portofolio.id,
                  {
                    scroll: false,
                  }
                );
              }}
              loading={isLoading}
              loaderPosition="center"
              radius={"xl"}
              bg={MainColor.yellow}
              color="yellow"
              c={"black"}
            >
              Detail
            </Button>
          )}

          <Button
            radius={"xl"}
            bg={MainColor.yellow}
            color="yellow"
            c={"black"}
            onClick={() => {
              window.open(
                `https://maps.google.com?q=${data?.latitude},${data?.longitude}`,
                "_blank",
                "width=800,height=600,noopener,noreferrer"
              );
            }}
          >
            Buka Maps
          </Button>
        </Group>
      </Stack>

      <UIGlobal_Modal
        title={
          "Anda akan dialihkan ke WhatsApp untuk melanjutkan percakapan. Tekan 'Lanjutkan' untuk melanjutkan."
        }
        opened={openModal}
        close={() => {
          setOpenModal(false);
        }}
        buttonKanan={
          <Button radius={"xl"} color="yellow" c={MainColor.darkblue}>
            <Link
              color="white"
              style={{
                color: "white",
                textDecoration: "none",
              }}
              target="_blank"
              href={`https://wa.me/+${data?.Portofolio.tlpn}?text=Hallo  , saya tertarik dengan bisnis anda. Apa boleh saya minta informasi tentang bisnis ${data?.Portofolio.namaBisnis} ?`}
            >
              Lanjutkan
            </Link>
          </Button>
        }
        buttonKiri={
          <Button radius={"xl"} onClick={() => setOpenModal(false)}>
            Batal
          </Button>
        }
      />
    </>
  );
}
