import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Stack, Group, Skeleton, Divider } from "@mantine/core";

export default function Notifikasi_ComponentSkeletonView() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <ComponentGlobal_CardStyles key={i}>
          <Stack>
            <Group position="apart">
              <Skeleton h={15} w={70} radius={"xl"} />
              <Skeleton h={15} w={100} radius={"xl"} />
            </Group>

            <Divider color="gray" />
            <Skeleton h={15} w={50} radius={"xl"} />
            <Skeleton h={15} w={"100%"} radius={"xl"} />
            <Skeleton h={15} w={"100%"} radius={"xl"} />

            <Group position="apart">
              <Skeleton h={15} w={100} radius={"xl"} />
              <Skeleton h={15} w={50} radius={"xl"} />
            </Group>
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}
