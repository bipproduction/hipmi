import { Stack, Skeleton } from "@mantine/core";

export default function Register_SkeletonView() {
  return (
    <>
      <Stack h={"100vh"} align="center" justify="center" spacing={50}>
        <Skeleton h={30} w={250} radius={"xl"} />

        <Skeleton h={100} w={100} radius={"50%"} />

        <Stack spacing={"sm"}>
          <Skeleton h={20} w={300} radius={"xl"} />
          <Skeleton h={50} w={300} radius={"sm"} />
          <Skeleton h={50} w={300} radius={"sm"} />
        </Stack>
      </Stack>
    </>
  );
}
