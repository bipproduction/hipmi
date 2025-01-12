import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Divider, Group, Stack } from "@mantine/core";

export default function Notifikasi_ComponentSkeletonView() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <ComponentGlobal_CardStyles key={i}>
          <Stack>
            <Group position="apart">
              <CustomSkeleton h={15} w={70} radius={"xl"} />
              <CustomSkeleton h={15} w={100} radius={"xl"} />
            </Group>

            <Divider color="#1F5B9E" />
            <CustomSkeleton h={15} w={50} radius={"xl"} />
            <CustomSkeleton h={15} w={"100%"} radius={"xl"} />
            <CustomSkeleton h={15} w={"100%"} radius={"xl"} />

            <Group position="apart">
              <CustomSkeleton h={15} w={100} radius={"xl"} />
              <CustomSkeleton h={15} w={50} radius={"xl"} />
            </Group>
          </Stack>
        </ComponentGlobal_CardStyles>
      ))}
    </>
  );
}
