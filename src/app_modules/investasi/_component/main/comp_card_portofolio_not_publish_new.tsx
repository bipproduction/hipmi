import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { ComponentGlobal_CardStyles, ComponentGlobal_LoadImageCustom } from "@/app_modules/_global/component";
import { Grid, Stack, Text } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { IDataInvestasiBursa } from "../../_lib/type_investasi";

export function Investasi_ComponentCardPortofolio_NotPublishNew({ data, }: { data: IDataInvestasiBursa; }) {
   const router = useRouter();
   return (
      <>
         <ComponentGlobal_CardStyles
            onClickHandler={() => {
               router.push(NEW_RouterInvestasi.detail_portofolio({ id: data.id }), { scroll: false });
            }}
         >
            <Grid>
               <Grid.Col span={8}>
                  <Text fw={"bold"} lineClamp={1}>
                     {" "}
                     {_.startCase(data.title)}
                  </Text>
                  <Stack spacing={0}>
                     <Text fz={10}>Target Dana:</Text>
                     <Text>
                        Rp.{" "}
                        {new Intl.NumberFormat("id-ID", {
                           maximumSignificantDigits: 10,
                        }).format(+data.targetDana)}
                     </Text>
                  </Stack>
               </Grid.Col>

               <Grid.Col span={4}>
                  <ComponentGlobal_LoadImageCustom
                     fileId={data.imageId}
                     height={80}
                  />
               </Grid.Col>
            </Grid>
         </ComponentGlobal_CardStyles>
      </>
   );
}
