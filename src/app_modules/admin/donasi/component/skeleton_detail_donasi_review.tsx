import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Stack, Box, SimpleGrid } from "@mantine/core";

function SkeletonAdminDetailDonasiReview() {
  return (
    <>
      <Stack px={"lg"}>
        <Box pb={"xl"}>
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

export default SkeletonAdminDetailDonasiReview;
