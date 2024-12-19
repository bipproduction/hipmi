import { NEW_RouterInvestasi } from "@/app/lib/router_hipmi/router_investasi";
import { Warna } from "@/app/lib/warna";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles, ComponentGlobal_LoadImageCustom } from "@/app_modules/_global/component";
import { Box, Grid, Group, Progress, Stack, Text } from "@mantine/core";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { IDataInvestasiBursa } from "../../_lib/type_investasi";

export function Investasi_ComponentCardBerandaNew({ data }: { data: IDataInvestasiBursa; }) {
   const router = useRouter()

   return (
      <>
         <ComponentGlobal_CardStyles
            onClickHandler={() => {
               router.push(NEW_RouterInvestasi.detail_main({ id: data.id }), {
                  scroll: false,
               });
            }}
         >
            <Stack>
               <Grid>
                  <Grid.Col span={6}>
                     <ComponentGlobal_LoadImageCustom
                        height={100}
                        fileId={data.imageId}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <Stack>
                        <Text fw={"bold"} align="center" lineClamp={2}>
                           {data?.title}
                        </Text>

                        <Progress
                           label={(+data?.progress).toFixed(2) + " %"}
                           value={+data?.progress}
                           color={MainColor.yellow}
                           size="xl"
                           radius="xl"
                           styles={{
                              label: { color: MainColor.black },
                           }}
                        />
                        <Group position="right">
                           {data?.progress === "100" ? (
                              <Group position="right" spacing={"xs"}>
                                 <IconCircleCheck color="green" />
                                 <Text
                                    truncate
                                    variant="text"
                                    c={Warna.hijau_tua}
                                    sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                                    ta="center"
                                    fz="md"
                                    fw={700}
                                 >
                                    Selesai
                                 </Text>
                              </Group>
                           ) : (
                              <Box>
                                 {+data?.pencarianInvestor -
                                    moment(new Date()).diff(
                                       new Date(data?.countDown),
                                       "days"
                                    ) <=
                                    0 ? (
                                    <Group position="right" spacing={"xs"}>
                                       <IconXboxX color="red" />
                                       <Text
                                          truncate
                                          variant="text"
                                          c={Warna.merah}
                                          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                                          ta="center"
                                          fz="md"
                                          fw={700}
                                       >
                                          Waktu Habis
                                       </Text>
                                    </Group>
                                 ) : (
                                    <Group position="right" spacing={"xs"}>
                                       <Text truncate>Sisa waktu:</Text>
                                       <Text truncate>
                                          {Number(data?.pencarianInvestor) -
                                             moment(new Date()).diff(
                                                new Date(data?.countDown),
                                                "days"
                                             )}
                                       </Text>
                                       <Text truncate>Hari</Text>
                                    </Group>
                                 )}
                              </Box>
                           )}
                        </Group>
                     </Stack>
                  </Grid.Col>
               </Grid>
            </Stack>
         </ComponentGlobal_CardStyles>
      </>
   );
}
