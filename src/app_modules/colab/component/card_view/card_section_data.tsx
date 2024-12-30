"use client";

import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global/notifikasi_peringatan";
import { Card, Center, Grid, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { MODEL_COLLABORATION } from "../../model/interface";
import { useState } from "react";
import { ComponentGlobal_CardLoadingOverlay } from "@/app_modules/_global/component";

export default function ComponentColab_CardSectionData({
  colabId,
  path,
  data,
}: {
  colabId?: any;
  path?: any;
  data?: MODEL_COLLABORATION;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card.Section
        px={"md"}
        onClick={() => {
          if (path) {
            setVisible(true);
            router.push(path + colabId);
          } else {
            ComponentGlobal_NotifikasiPeringatan("Path tidak ditemukan");
          }
        }}
      >
        <Center px={"md"} mb={"lg"}>
          <Title order={5} lineClamp={1}>
            {data?.title ? data.title : "Judul Proyek"}
          </Title>
        </Center>
        <Stack spacing={"xs"}>
          <Grid>
            <Grid.Col span={2}>
              <Text fw={"bold"} >
                Industri
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text >:</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text  lineClamp={1}>
                {data?.ProjectCollaborationMaster_Industri.name
                  ? data?.ProjectCollaborationMaster_Industri?.name
                  : "Industri"}
              </Text>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={2}>
              <Text fw={"bold"} >
                Lokasi
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text >:</Text>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Text  lineClamp={1}>
                {data?.lokasi ? data?.lokasi : "Lokasi dari proyek"}
              </Text>
            </Grid.Col>
          </Grid>

          <Stack spacing={5}>
            <Text fw={"bold"} >
              Tujuan proyek
            </Text>
            <Text lineClamp={2} >
              {data?.purpose
                ? data?.purpose
                : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores odio nihil in animi expedita, suscipit excepturi pariatur totam esse officiis enim cumque. Quidem, facere aliquam. Sunt laboriosam incidunt iste amet"}
            </Text>
          </Stack>
        </Stack>
        {visible && <ComponentGlobal_CardLoadingOverlay />}
      </Card.Section>
    </>
  );
}
