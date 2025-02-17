import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Stack } from "@mantine/core";

export { Forum_SkeletonCard };

function Forum_SkeletonCard() {
  return (
    <>
      <Stack>
        <CustomSkeleton height={230} width={"100%"} />
        <CustomSkeleton height={230} width={"100%"} />
      </Stack>
    </>
  );
}
