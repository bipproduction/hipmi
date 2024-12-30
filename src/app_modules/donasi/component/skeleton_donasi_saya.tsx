import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Box, Grid, Skeleton } from "@mantine/core";

export default function SkeletonDonasiSaya() {
   return <>
      <Box>
         {[...Array(3)].map((_, index) => (
            <ComponentGlobal_CardStyles key={index}>
               <Grid>
                  <Grid.Col span={6}>
                     <Box>
                        {[...Array(4)].map((_, index) => (
                           <Box key={index} py={5}>
                              <Grid align="center">
                                 <Grid.Col span={12}>
                                    <Skeleton w={"100%"} h={15} />
                                 </Grid.Col>
                              </Grid>
                           </Box>
                        ))}
                     </Box>

                  </Grid.Col>
                  <Grid.Col span={6}>
                     <Skeleton w={"100%"} height={100} radius="md" />
                  </Grid.Col>
               </Grid>
            </ComponentGlobal_CardStyles>
         ))}
      </Box >
   </>;
}