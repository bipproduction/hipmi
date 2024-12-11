import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Stack, Center, Skeleton, Grid } from "@mantine/core";

export function Event_ComponentSkeletonDetail() {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Grid align="center">
            <Grid.Col span={"content"}>
              <Skeleton radius={"100%"} h={50} w={50} />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Skeleton h={20} w={"50%"} />
            </Grid.Col>
          </Grid>
        </Stack>
        <Stack spacing={"xl"}>
          <Center>
            <Skeleton h={20} w={"50%"} />
          </Center>
          <Skeleton h={20} w={"100%"} />
          <Skeleton h={20} w={"100%"} />
          <Skeleton h={20} w={"50%"} />
          <Skeleton h={20} w={"100%"} />
          <Skeleton h={20} w={"100%"} />
          <Stack>
            <Skeleton h={20} w={"50%"} />
            <Skeleton h={20} w={"100%"} />
            <Skeleton h={20} w={"100%"} />
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
