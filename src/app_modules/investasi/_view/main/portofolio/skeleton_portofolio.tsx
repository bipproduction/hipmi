import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Box, Grid, Skeleton } from "@mantine/core";

export default function SkeletonInvestasiPortofolio() {
   return (
      <>
         {[...Array(4)].map((_, index) => (
            <ComponentGlobal_CardStyles key={index}>
               <Grid>
                  <Grid.Col span={7}>
                     <Box>
                        {[...Array(3)].map((_, i) => (
                           <Box key={i} py={5}>
                              <Grid align="center">
                                 <Grid.Col span={12}>
                                    <Skeleton w={"90%"} h={23} />
                                 </Grid.Col>
                              </Grid>
                           </Box>
                        ))}
                     </Box>
                  </Grid.Col>
                  <Grid.Col span={5}>
                     <Skeleton w={"100%"} height={100} radius="md" />
                  </Grid.Col>
               </Grid>
            </ComponentGlobal_CardStyles>
         ))}
      </>
   );
}