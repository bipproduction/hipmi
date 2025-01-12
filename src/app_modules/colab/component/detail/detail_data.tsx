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
                <Text fw={"bold"} >
                  Industri
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text >:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text >
                  {data?.ProjectCollaborationMaster_Industri.name
                    ? data.ProjectCollaborationMaster_Industri.name
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
                  {data?.lokasi ? data.lokasi : " Lokasi dari proyek"}
                </Text>
              </Grid.Col>
            </Grid>

            <Stack spacing={5}>
              <Text fw={"bold"} >
                Tujuan proyek
              </Text>
              <Text >{data?.purpose ? data?.purpose : "-"}</Text>
            </Stack>
            <Stack spacing={5}>
              <Text fw={"bold"} >
                Keuntungan
              </Text>
              <Text >{data?.benefit ? data?.benefit : "-"}</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
