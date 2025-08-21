import CustomSkeleton from '@/app_modules/components/CustomSkeleton';
import { Box, SimpleGrid, Stack } from '@mantine/core';
import React from 'react';

function SkeletonAdminDetailDonasiReject() {
    return (
        <>
            <Stack px={"lg"}>
                <Box pb={"xl"}>
                </Box>
                <Box>
                    <CustomSkeleton width={"100%"} height={"20vh"} />
                </Box>
                <SimpleGrid
                    cols={2}
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
                </SimpleGrid>
            </Stack>
        </>
    );
}

export default SkeletonAdminDetailDonasiReject;


