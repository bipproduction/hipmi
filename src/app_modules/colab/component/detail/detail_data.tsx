"use client";

import { Stack, Box, Center, Title, Grid, Text } from "@mantine/core";
import ComponentColab_AuthorNameOnHeader from "../header_author_name";
import { MODEL_COLLABORATION } from "../../model/interface";
import { Comp_V3_SetInnerHTML } from "@/app_modules/_global/component/new/comp_V3_set_html_with_stiker";
import { Component_V3_GridDetailData } from "@/app_modules/_global/component/new/comp_V3_grid_detail_data";

export default function ComponentColab_DetailData({
  data,
}: {
  data?: MODEL_COLLABORATION;
}) {

  const listData = [
    {
      title: "Industri",
      value: data?.ProjectCollaborationMaster_Industri.name
        ? data.ProjectCollaborationMaster_Industri.name
        : "Industri",
    },
    {
      title: "Lokasi",
      value: data?.lokasi ? data.lokasi : "-",
    },
    {
      title: "Tujuan Proyek",
      value: <Comp_V3_SetInnerHTML props={data?.purpose} />,
    },
    {
      title: "Keuntungan Proyek",
      value: <Comp_V3_SetInnerHTML props={data?.benefit} />,
    },
  ];


  return (
    <>
      <Box>
        <Center px={"md"} mb={"lg"}>
          <Title order={3}>{data?.title ? data.title : "Judul Proyek"}</Title>
        </Center>

        <Stack>
          {listData.map((e, i) => (
            <Component_V3_GridDetailData item={e} key={i} />
          ))}
        </Stack>

        {/* <Stack spacing={"sm"}>
            <Grid>
              <Grid.Col span={2}>
                <Text fw={"bold"}>Industri</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text>
                  {data?.ProjectCollaborationMaster_Industri.name
                    ? data.ProjectCollaborationMaster_Industri.name
                    : "Industri"}
                </Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={2}>
                <Text fw={"bold"}>Lokasi</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text lineClamp={1}>
                  {data?.lokasi ? data.lokasi : " Lokasi dari proyek"}
                </Text>
              </Grid.Col>
            </Grid>

            <Stack spacing={5}>
              <Text fw={"bold"}>Tujuan proyek</Text>
              <Comp_V3_SetInnerHTML
                props={data?.purpose}
              />
            </Stack>
            <Stack spacing={5}>
              <Text fw={"bold"}>Keuntungan</Text>
              <Comp_V3_SetInnerHTML
                props={data?.benefit}
              />
            </Stack>
          </Stack> */}
      </Box>
    </>
  );
}
