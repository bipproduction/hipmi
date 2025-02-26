import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { Box, SimpleGrid, Stack } from '@mantine/core';
import React from 'react';

function SkeletonAdminInvestasi() {
  return (
    <>
      <Stack px={"lg"}>
        <Box pb={"xl"}>
        </Box>
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          <Box>
            <CustomSkeleton width={"100%"} height={"40vh"} />
          </Box>
          <Box>
            <CustomSkeleton width={"100%"} height={"40vh"} />
          </Box>
          <Box>
            <CustomSkeleton width={"100%"} height={"40vh"} />
          </Box>
        </SimpleGrid>
        <Box>
          <CustomSkeleton width={"100%"} height={"30vh"} />
        </Box>
      </Stack>
    </>
  );
}

export default SkeletonAdminInvestasi;
