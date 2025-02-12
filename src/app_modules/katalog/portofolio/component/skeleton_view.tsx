import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Stack } from "@mantine/core";

export { Portofolio_SkeletonEditDataBisnis };

function Portofolio_SkeletonEditDataBisnis() {
  return (
    <>
      <Stack spacing={"xl"} p={"sm"}>
        {Array.from({ length: 4 }).map((_, i) => (
          <CustomSkeleton key={i} height={50} width={"100%"} />
        ))}
        <CustomSkeleton height={100} width={"100%"} />
        <CustomSkeleton radius="xl" height={50} width={"100%"} />
      </Stack>
    </>
  );
}
