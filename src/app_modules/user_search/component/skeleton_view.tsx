import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Grid, Group, Stack } from "@mantine/core";

export function UserSearch_SkeletonView() {
  return (
    <>
      <Stack>
        {Array.from({ length: 2 }).map((e, i) => (
          <Grid key={i}>
            <Grid.Col span={2}>
              <CustomSkeleton height={40} width={40} circle />
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Stack>
                <CustomSkeleton width={"80%"} height={20} />
                <CustomSkeleton width={"40%"} height={15} />
              </Stack>
            </Grid.Col>
            <Grid.Col span={2}>
              <CustomSkeleton height={40} width={40} circle />
            </Grid.Col>
          </Grid>
        ))}
      </Stack>
    </>
  );
}
