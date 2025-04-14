import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { SimpleGrid } from "@mantine/core";

export function Admin_V3_ComponentSkeletonBreakpoint() {
  return (
    <>
      <SimpleGrid
        cols={2}
        breakpoints={[
          { maxWidth: "sm", cols: 1 },
          { maxWidth: "md", cols: 1 },
          { maxWidth: "lg", cols: 1 },
        ]}
      >
        <CustomSkeleton height={500} width={"100%"} />
      </SimpleGrid>
    </>
  );
}
