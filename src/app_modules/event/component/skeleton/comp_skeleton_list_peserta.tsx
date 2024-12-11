import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Stack, Center, Skeleton, Grid } from "@mantine/core";

export default function Event_ComponentSkeletonListPeserta() {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"lg"}>
          <Center>
            <Skeleton height={20} width={"50%"} />
          </Center>

          <Stack>
            {Array.from(new Array(3)).map((e, i) => (
              <Grid key={i} align="center">
                <Grid.Col span={"content"}>
                  <Skeleton radius={"100%"} h={30} w={30} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                  <Skeleton h={20} w={"50%"} />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Skeleton h={20} w={"50%"} />
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
