import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import { MODEL_COLLABORATION } from "@/app_modules/colab/model/interface";
import { Stack, Box, Center, Title, Grid, Text } from "@mantine/core";

export default function ComponentAdminColab_DetailData({
  data,
}: {
  data: MODEL_COLLABORATION;
}) {
  return (
    <>
      <Stack>
        <Box>
          <Center px={"md"} mb={"lg"}>
            <Title c={AdminColor.white} order={4}>{data?.title ? data.title : "Judul Proyek"}</Title>
          </Center>
          <Stack spacing={"sm"}>
            <Grid>
              <Grid.Col span={2}>
                <Text c={AdminColor.white} fw={"bold"} fz={"sm"}>
                  Industri
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text c={AdminColor.white} fz={"sm"}>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text c={AdminColor.white} fz={"sm"}>
                  {data?.ProjectCollaborationMaster_Industri.name
                    ? data.ProjectCollaborationMaster_Industri.name
                    : "Industri"}
                </Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={2}>
                <Text c={AdminColor.white} fw={"bold"} fz={"sm"}>
                  Lokasi
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text c={AdminColor.white} fz={"sm"}>:</Text>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Text c={AdminColor.white} fz={"sm"} lineClamp={1}>
                  {data?.lokasi ? data.lokasi : " Lokasi dari proyek"}
                </Text>
              </Grid.Col>
            </Grid>

            <Stack spacing={5}>
              <Text c={AdminColor.white} fw={"bold"} fz={"sm"}>
                Tujuan proyek
              </Text>
              <Text c={AdminColor.white} fz={"sm"}>{data?.purpose ? data?.purpose : "-"}</Text>
            </Stack>
            <Stack spacing={5}>
              <Text c={AdminColor.white} fw={"bold"} fz={"sm"}>
                Keuntungan
              </Text>
              <Text c={AdminColor.white} fz={"sm"}>{data?.benefit ? data?.benefit : "-"}</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
