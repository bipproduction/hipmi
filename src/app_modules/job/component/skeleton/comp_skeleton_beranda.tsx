import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Center, Group, Stack } from "@mantine/core";

export {
  Job_ComponentSkeletonBeranda,
  Job_SkeletonDetailJob,
  Job_SkeletonEdit
};

function Job_ComponentSkeletonBeranda() {
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

function Job_SkeletonDetailJob() {
  return (
    <>
      <ComponentGlobal_CardStyles>
        <Stack spacing={"xl"}>
          <Stack align="center">
            <CustomSkeleton h={250} w={200} radius="md" />
            <CustomSkeleton h={10} w={200} />
          </Stack>

          {Array.from(new Array(2)).map((e, i) => (
            <Stack key={i}>
              <CustomSkeleton h={10} w={100} />

              {Array.from({ length: 3 }).map((_, ii) => (
                <CustomSkeleton h={10} key={ii} />
              ))}
            </Stack>
          ))}
        </Stack>
      </ComponentGlobal_CardStyles>
    </>
  );
}

function Job_SkeletonEdit() {
  return (
    <>
      <Stack>
        <CustomSkeleton height={300} width={"100%"} />
        <Center>
          <CustomSkeleton height={40} radius={"xl"} width={"50%"} />
        </Center>
        <CustomSkeleton height={500} width={"100%"} />
        <CustomSkeleton height={40} radius={"xl"} width={"100%"} />
      </Stack>
    </>
  );
}
