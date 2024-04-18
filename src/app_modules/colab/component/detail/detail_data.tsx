"use client";

import { Stack, Box, Center, Title, Grid, Text } from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";
import { MODEL_COLLABORATION } from "../../model/interface";

export default function ComponentColab_DetailData({
  data,
}: {
  data?: MODEL_COLLABORATION;
}) {
  return (
    <>
      <Stack>
        <Box>
          <Center px={"md"} mb={"lg"}>
            <Title order={4}>{data?.title ? data.title : "Judul Proyek"}</Title>
          </Center>
          <Stack spacing={"sm"}>
            <Grid>
              <Grid.Col span={2}>
                <Text fw={"bold"} fz={"sm"}>
                  Industri
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text fz={"sm"}>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text fz={"sm"}>
                  {data?.ProjectCollaborationMaster_Industri.name
                    ? data.ProjectCollaborationMaster_Industri.name
                    : "Industri"}
                </Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={2}>
                <Text fw={"bold"} fz={"sm"}>
                  Lokasi
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text fz={"sm"}>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text fz={"sm"} lineClamp={1}>
                  {data?.lokasi ? data.lokasi : " Lokasi dari proyek"}
                </Text>
              </Grid.Col>
            </Grid>

            <Stack spacing={5}>
              <Text fw={"bold"} fz={"sm"}>
                Tujuan proyek
              </Text>
              <Text fz={"sm"}>{data?.purpose ? data?.purpose : "-"}</Text>
            </Stack>
            <Stack spacing={5}>
              <Text fw={"bold"} fz={"sm"}>
                Keutungan
              </Text>
              <Text fz={"sm"}>
                {data?.benefit ? data?.benefit : "-"}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
