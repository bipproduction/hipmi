import { AccentColor } from "@/app_modules/_global/color";
import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Grid, Group, Paper, Skeleton, Stack, Text } from "@mantine/core";

export default function Event_ComponentSkeletonBeranda() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <ComponentGlobal_CardStyles key={index} marginBottom={"16px"}>
          <Stack>
            <Grid align="center">
              <Grid.Col span={"content"}>
                <Skeleton radius={"100%"} h={50} w={50} />
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Skeleton h={20} w={"50%"} />
              </Grid.Col>
            </Grid>

            <Stack>
              <Skeleton h={20} w={"100%"} />
              <Skeleton h={20} w={"100%"} />
            </Stack>
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}
