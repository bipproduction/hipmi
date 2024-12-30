import { ComponentGlobal_CardStyles } from "@/app_modules/_global/component";
import { Grid, Skeleton } from "@mantine/core";

export default function SkeletonInvestasiSahamSaya() {
   return (
      <>
         {[...Array(4)].map((_, index) => (
            <ComponentGlobal_CardStyles key={index}>
               <Grid>
                  <Grid.Col span={12}>
                     <Skeleton w={"100%"} height={70} radius="md" />
                  </Grid.Col>
               </Grid>
            </ComponentGlobal_CardStyles>
         ))}
      </>
   );
}