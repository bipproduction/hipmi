import { Box, Skeleton } from "@mantine/core";

export default function SkeletonCeritaPenggalangDonasi() {
   return (
      <>
         <Box mb={"md"}>
            <Skeleton height={10} mt={0} radius="xl" width={"50%"} />
            <Skeleton height={10} mt={10} radius="xl" />
            <Skeleton height={10} mt={10} radius="xl" />
            <Skeleton height={10} mt={10} radius="xl" />
         </Box>
      </>
   );
}