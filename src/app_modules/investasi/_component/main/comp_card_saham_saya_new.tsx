import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_TampilanAngkaRatusan, ComponentGlobal_TampilanRupiah } from "@/app_modules/_global/component";
import { Box, Progress, SimpleGrid, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IDataSahamSaya } from "../../_lib/type_investasi";
import { Investasi_ComponentStylesCard } from "../comp_card_border_and_background";

export function Investasi_ComponentSahamSayaNew({ data }: { data: IDataSahamSaya; }) {
   const router = useRouter();

   return (
      <>
         <Investasi_ComponentStylesCard
            onClickHandler={() => {
               router.push(NEW_RouterInvestasi.detail_saham + data?.id, {
                  scroll: false,
               });
            }}
            marginBottom={"15px"}
         >
            <SimpleGrid cols={2} spacing={"xs"}>
               <Box>
                  <Stack spacing={0}>
                     <Text fw={"bold"} lineClamp={2}>
                        {data?.title}
                     </Text>
                     <ComponentGlobal_TampilanRupiah
                        nominal={+data?.nominal}
                        color="white"
                        fontSize={"xs"}
                     />
                     <ComponentGlobal_TampilanAngkaRatusan
                        nominal={+data?.lembarTerbeli}
                        color="white"
                        fontSize={"xs"}
                        textAfter="Lembar"
                     />
                  </Stack>
               </Box>

               <Stack justify="center">
                  <Progress
                     size={"xl"}
                     radius={"xl"}
                     color="yellow"
                     value={+data.progress}
                     label={data.progress + "%"}
                     styles={{
                        bar: {
                           backgroundColor: MainColor.yellow,
                        },
                        root: {
                           backgroundColor: "whitesmoke",
                        },
                        label: {
                           color: "black",
                        },
                     }}
                  />
               </Stack>
            </SimpleGrid>
         </Investasi_ComponentStylesCard>
      </>
   );
}
