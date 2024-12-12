import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Box, Center, Group, Skeleton, Stack } from "@mantine/core";

export default function Job_ComponentSkeletonBeranda() {
  return (
    <>
      <Box>
        {Array.from(new Array(10)).map((e, i) => (
          <ComponentGlobal_CardStyles key={i} marginBottom={"15px"}>
            <Stack>
              <Group position="left">
                <Skeleton height={40} width={40} circle />
                <Skeleton height={20} width={200} />
              </Group>

              <Center my={"md"}>
                <Skeleton height={20} width={300} />
              </Center>
            </Stack>
          </ComponentGlobal_CardStyles>
        ))}
      </Box>
    </>
  );
}
