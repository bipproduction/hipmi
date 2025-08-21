import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { Box, Grid, Group, Skeleton, Stack } from "@mantine/core";

export default function SkeletonDetailBisnis() {
   return <>
      <Box>
         <Grid>
            <Grid.Col span={6}>
               <CustomSkeleton w={"60%"} height={15} radius="md" />
            </Grid.Col>
            <Grid.Col span={6}>
               <CustomSkeleton w={"100%"} height={15} radius="md" />
            </Grid.Col>
         </Grid>
         <Grid>
            <Grid.Col span={6}>
               <CustomSkeleton w={"100%"} height={200} radius="md" />
            </Grid.Col>
            <Grid.Col span={6}>
               <Box>
                  {[...Array(4)].map((_, index) => (
                     <Box key={index} py={5}>
                        <Grid align="center">
                           <Grid.Col span={2}>
                              <CustomSkeleton w={25} h={25} />
                           </Grid.Col>
                           <Grid.Col span={10}>
                              <CustomSkeleton w={"100%"} h={15} />
                           </Grid.Col>
                        </Grid>
                     </Box>
                  ))}
               </Box>
            </Grid.Col>
         </Grid>
         <Box mt={"md"}>
            <CustomSkeleton w={"30%"} h={15} my={10} />
            <CustomSkeleton w={"95%"} h={15} my={10} />
            <CustomSkeleton w={"95%"} h={15} my={10} />
            <CustomSkeleton w={"95%"} h={15} my={10} />
         </Box>
      </Box>
   </>;
}