import { AdminColor } from "@/app_modules/_global/color/color_pallet";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { MODEL_USER } from "@/app_modules/home/model/interface";
import { Paper, Stack, Title, Grid, Text } from "@mantine/core";

export function ComponentAdminInvestasi_DetailDataAuthor({
  data,
}: {
  data: MODEL_USER;
}) {
  return (
    <>
      {!data ? (<CustomSkeleton height={"50vh"} width={"100%"} />)
        : (<Paper bg={AdminColor.softBlue} p={"lg"}>
        <Stack c={AdminColor.white}>
          <Title order={3}>Data User</Title>
          <Stack spacing={"xs"}>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Nama:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>{data?.Profile?.name}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Username:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>@{data?.username}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Nomor:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>+ {data?.nomor}</Text>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={6}>
                <Text fw={"bold"}>Alamat:</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text>{data?.Profile?.alamat}</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Paper>)}
    </>
  );
}
{/* <CustomSkeleton height={"80vh"} width={"100%"} /> */ }
