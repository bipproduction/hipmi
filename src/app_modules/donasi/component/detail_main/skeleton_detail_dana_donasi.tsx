import { Box, Skeleton } from "@mantine/core";

export default function SkeletonDetailDanaDonasi() {
   return (
      <>
         <Box>
            <Box mb={"md"}>
               <Skeleton height={150} radius="md" />
            </Box>
            <Box mb={"md"}>
               <Skeleton height={10} mt={10} radius="xl" width={"50%"} />
               <Skeleton height={10} mt={10} radius="xl" />
               <Skeleton height={10} mt={10} radius="xl" />
            </Box>
            <Box>
               <Skeleton height={50} radius="md" />
            </Box>
         </Box>
      </>
   );
}