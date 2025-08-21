import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Center, Grid, Stack } from "@mantine/core";

export default function Event_ComponentSkeletonListPeserta() {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"lg"}>
          <Center>
            <CustomSkeleton height={20} width={"50%"} />
          </Center>

          <Stack>
            {Array.from(new Array(3)).map((e, i) => (
              <Grid key={i} align="center">
                <Grid.Col span={"content"}>
                  <CustomSkeleton radius={"100%"} h={30} w={30} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <CustomSkeleton h={20} w={"50%"} />
                </Grid.Col>
                <Grid.Col span={2}>
                  <CustomSkeleton h={20} w={"50%"} />
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
