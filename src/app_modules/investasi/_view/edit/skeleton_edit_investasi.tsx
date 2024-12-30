import { Box, Skeleton, Stack } from "@mantine/core";

export default function SkeletonEditInvestasi() {
   return (
      <>
         <Box>
            <Stack align="center" mb={40}>
               <Skeleton height={40} width={"100%"} />
               <Skeleton height={300} width={"100%"} my={"xs"} />
               <Skeleton height={40} width={"40%"} radius={"lg"} />
            </Stack>

            <Stack align="center">
               {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} height={40} width={"100%"} my={"xs"} />
               ))}
               <Skeleton height={40} width={"100%"} radius={"lg"} mt={30} />
            </Stack>
         </Box>

      </>
   );
}