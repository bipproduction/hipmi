"use client";

import { AspectRatio, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Model_Berita_Investasi } from "../_lib/interface";
import { useState } from "react";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import moment from "moment";
import { AccentColor } from "@/app_modules/_global/color/color_pallet";
import { useShallowEffect } from "@mantine/hooks";
import getOneBeritaInvestasiById from "../fun/get_one_berita_by_id";

export default function DetailBeritaInvestasi({
  dataBerita,
  investasiId,
}: {
  dataBerita: Model_Berita_Investasi;
  investasiId: string;
}) {
  const [berita, setBerita] = useState(dataBerita);

  useShallowEffect(() => {
    onLoadData();
  }, []);

  async function onLoadData() {
    const loadData = await getOneBeritaInvestasiById(investasiId);
    setBerita(loadData as any);
  }

  return (
    <>
      <Stack
        spacing={"lg"}
        style={{
          border: `2px solid ${AccentColor.blue}`,
          backgroundColor: AccentColor.darkblue,
          padding: "15px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Stack spacing={0}>
          <Title order={4} align="center">
            {berita?.title}
          </Title>
          <Text align="center" fz={12}>
            {moment(berita?.createdAt).format("lll")}
          </Text>
        </Stack>

        <AspectRatio ratio={1 / 1} mx={"sm"} mah={250}>
          <Image
            alt=""
            src={RouterInvestasi_OLD.api_gambar + `${berita?.imagesId}`}
            radius={"sm"}
            height={250}
            width={"100%"}
          />
        </AspectRatio>

        <Text>{berita?.deskripsi}</Text>
      </Stack>
    </>
  );
}
