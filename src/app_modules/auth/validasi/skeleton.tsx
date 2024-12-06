import { Stack, Skeleton, Group } from "@mantine/core";

export default function Validasi_SkeletonView() {
  return (
    <>
      <Stack align="center" justify="center" h={"100vh"} spacing={50}>
        <Skeleton h={30} w={250} radius={"xl"} />
        <Stack>
          <Skeleton h={20} w={250} radius={"xl"} />
          <Skeleton h={20} w={250} radius={"xl"} />
        </Stack>

        <Group>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} h={50} w={50} radius={"sm"} />
          ))}
        </Group>

        <Skeleton h={20} w={250} radius={"xl"} />

        <Skeleton h={50} w={250} radius={"sm"} />
      </Stack>
    </>
  );
}
