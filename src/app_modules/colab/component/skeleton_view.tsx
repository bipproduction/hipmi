import { Skeleton, Stack } from "@mantine/core";

export function Collaboration_SkeletonCreate() {
  return (
    <>
      <Stack px={"xl"} spacing={"lg"}>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={40} />
        </Stack>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={130} />
        </Stack>
        <Stack spacing={"xs"}>
          <Skeleton height={10} width={50} />
          <Skeleton height={130} />
        </Stack>

        <Skeleton mt={50} height={40} radius={"xl"} />
      </Stack>
    </>
  );
}
