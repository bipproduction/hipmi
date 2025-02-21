import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Center, Grid, Group, Stack } from "@mantine/core";

export {
  Forum_SkeletonCard,
  Forum_SkeletonForumku,
  Forum_SkeletonKomentar,
  Forum_SkeletonListKomentar,
};

function Forum_SkeletonCard() {
  return (
    <>
      <Stack>
        <CustomSkeleton height={230} width={"100%"} />
        <CustomSkeleton height={230} width={"100%"} />
      </Stack>
    </>
  );
}

function Forum_SkeletonForumku() {
  return (
    <>
      <Stack spacing={"xl"}>
        <Center>
          <CustomSkeleton height={100} width={100} circle />
        </Center>

        <Grid grow>
          <Grid.Col span={6}>
            <Stack spacing={"xs"}>
              <CustomSkeleton height={15} width={"80%"} />
              <CustomSkeleton height={15} width={"80%"} />
            </Stack>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group position="right">
              <CustomSkeleton height={40} width={"80%"} radius={"xl"} />
            </Group>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}

function Forum_SkeletonKomentar() {
  return (
    <>
      <Stack mt={"lg"}>
        <CustomSkeleton height={50} />
        <Group position="apart">
          <CustomSkeleton height={15} width={"20%"} radius={"xl"} />
          <CustomSkeleton height={40} width={"30%"} radius={"xl"} />
        </Group>
      </Stack>
    </>
  );
}

function Forum_SkeletonListKomentar() {
  return (
    <>
      <Stack>
        {Array.from(new Array(2)).map((e, i) => (
          <CustomSkeleton key={i} height={100} />
        ))}
      </Stack>
    </>
  );
}
