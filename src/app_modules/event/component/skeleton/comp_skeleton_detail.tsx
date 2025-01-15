import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Center, Grid, SimpleGrid, Stack } from "@mantine/core";

export function Event_ComponentSkeletonDetail() {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack>
          <Grid align="center">
            <Grid.Col span={"content"}>
              <CustomSkeleton radius={"100%"} h={50} w={50} />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <CustomSkeleton h={20} w={"50%"} />
            </Grid.Col>
          </Grid>
        </Stack>
        <Stack spacing={"xl"}>
          <Center>
            <CustomSkeleton h={20} w={"50%"} />
          </Center>
          <CustomSkeleton h={20} w={"100%"} />
          <CustomSkeleton h={20} w={"100%"} />
          <CustomSkeleton h={20} w={"50%"} />
          <CustomSkeleton h={20} w={"100%"} />
          <CustomSkeleton h={20} w={"100%"} />
          <Stack>
            <CustomSkeleton h={20} w={"50%"} />
            <CustomSkeleton h={20} w={"100%"} />
            <CustomSkeleton h={20} w={"100%"} />
          </Stack>
          <SimpleGrid
            cols={2}
            breakpoints={[
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <CustomSkeleton h={100} w={"100%"} />
            <CustomSkeleton h={100} w={"100%"} />
          </SimpleGrid>
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}
