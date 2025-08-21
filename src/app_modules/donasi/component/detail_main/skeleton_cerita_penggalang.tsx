import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box } from "@mantine/core";

export default function SkeletonCeritaPenggalangDonasi() {
   return (
      <>
         <Box mb={"md"}>
            <CustomSkeleton height={10} mt={0} radius="xl" width={"50%"} />
            <CustomSkeleton height={10} mt={10} radius="xl" />
            <CustomSkeleton height={10} mt={10} radius="xl" />
            <CustomSkeleton height={10} mt={10} radius="xl" />
         </Box>
      </>
   );
}