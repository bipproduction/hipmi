import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { ComponentGlobal_CardStyles, ComponentGlobal_LoadImageCustom } from "@/app_modules/_global/component";
import { Grid, Stack, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { IDataAllDonasi } from "../../lib/type_donasi";

export function ComponentDonasi_CardStatusNew({ data }: { data: IDataAllDonasi; }) {
   const router = useRouter();
   const param = useParams<{ id: string }>();

   function goToDetail() {
      if (param.id == "2") {
         router.push(RouterDonasi.detail_review + `${data.id}`);
      } else if (param.id == "3") {
         router.push(RouterDonasi.detail_draft + `${data.id}`);
      } else if (param.id == "4") {
         router.push(RouterDonasi.detail_reject + `${data.id}`);
      }
   }

   return (
      <>
         <ComponentGlobal_CardStyles onClickHandler={() => { goToDetail() }} >
            <Stack>
               <Grid>
                  <Grid.Col span={6}>
                     <ComponentGlobal_LoadImageCustom
                        fileId={data.imageId}
                        height={100}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <Stack spacing={"xs"}>
                        <Text fz={"sm"} fw={"bold"} lineClamp={2}>
                           {data.title}
                        </Text>
                        <Stack spacing={0}>
                           <Text fz={"sm"}>Target Dana</Text>
                           <Text fz={"sm"} fw={"bold"} c={"yellow"} lineClamp={1}>
                              Rp.{" "}
                              {new Intl.NumberFormat("id-ID", {
                                 maximumFractionDigits: 10,
                              }).format(+data.target)}
                           </Text>
                        </Stack>
                     </Stack>
                  </Grid.Col>
               </Grid>
            </Stack>
         </ComponentGlobal_CardStyles>
      </>
   );
}
