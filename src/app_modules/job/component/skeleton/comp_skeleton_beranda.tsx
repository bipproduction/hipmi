import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Center, Group, Skeleton, Stack } from "@mantine/core";

export default function Job_ComponentSkeletonBeranda() {
  return (
    <>
      <Box>
        {Array.from(new Array(3)).map((e, i) => (
          <ComponentGlobal_CardStyles key={i} marginBottom={"15px"}>
            <Stack>
              <Group position="left">
                <CustomSkeleton height={40} width={40} circle />
                <CustomSkeleton height={20} width={200} />
              </Group>

              <Center my={"md"}>
                <CustomSkeleton height={20} width={300} />
              </Center>
            </Stack>
          </ComponentGlobal_CardStyles>
        ))}
      </Box>
    </>
  );
}
