import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Stack } from "@mantine/core";

export default function SkeletonEditDonasi() {
   return (
      <>
         <Box>
            <Stack align="center" mb={40}>
               <CustomSkeleton height={40} width={"100%"} />
               <CustomSkeleton height={300} width={"100%"} my={"xs"} />
               <CustomSkeleton height={40} width={"40%"} radius={"lg"} />
            </Stack>

            <Stack align="center">
               {[...Array(3)].map((_, index) => (
                  <CustomSkeleton key={index} height={40} width={"100%"} my={"xs"} />
               ))}
               <CustomSkeleton height={40} width={"100%"} radius={"xl"} mt={30} />
            </Stack>
         </Box>

      </>
   );
}