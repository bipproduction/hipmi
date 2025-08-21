import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Stack } from "@mantine/core";

export { Profile_SkeletonViewEdit };

function Profile_SkeletonViewEdit() {
    return (
      <>
        <Stack spacing={"xl"}>
          {Array.from({ length: 4 }).map((_, i) => (
            <CustomSkeleton key={i} height={50} width={"100%"} />
          ))}
          <CustomSkeleton height={50} width={"100%"} radius={"xl"} />
        </Stack>
      </>
    );
}