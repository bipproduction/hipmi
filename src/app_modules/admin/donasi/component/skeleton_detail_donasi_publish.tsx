import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { Box, Stack } from '@mantine/core';

function SkeletonAdminDetailDonasiPublish() {
  return (
    <>
      <Stack px={"lg"}>
        <Box pb={"xl"}>
        </Box>
        <Box>
          <CustomSkeleton width={"100%"} height={"40vh"} />
        </Box>
      </Stack>
    </>
  );
}

export default SkeletonAdminDetailDonasiPublish;
