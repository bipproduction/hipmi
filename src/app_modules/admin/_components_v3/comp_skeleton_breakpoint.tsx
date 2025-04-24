import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { SimpleGrid } from "@mantine/core";

export function Admin_V3_ComponentSkeletonBreakpoint({
  skeletonRequest,
}: {
  skeletonRequest?: number;
}) {
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
        {Array.from({ length: skeletonRequest || 1 }, (_, index) => (
          <CustomSkeleton key={index} height={500} width={"100%"} />
        ))}
      </SimpleGrid>
    </>
  );
}
