import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_LoaderAvatar } from "@/app_modules/_global/component";
import { ActionIcon, Box, Button, Drawer, Grid, Group, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBuildingSkyscraper, IconListDetails, IconMapPin, IconPhoneCall, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetOneMapById } from "../lib/api_map";
import { IDataMap, IDataMapDetailAuthor, IDataMapDetailBisnis } from "../lib/type_map";
import { ComponentMap_LoadImageMap } from "./comp_load_image_map";
import { ComponentMap_SkeletonDrawerDetailData } from "./skeleton_detail_data";





// SALAHHHHHHHH ---- HARUS ULANGG
export function ComponentMap_DrawerDetailDataNew({ opened, close, mapId, }: { opened: boolean; close: () => void; mapId: string }) {
   const router = useRouter();
   const [dataLokasi, setDataLokasi] = useState<IDataMap>()
   const [dataAuthor, setDataAuthor] = useState<IDataMapDetailAuthor>()
   const [dataBisnis, setDataBisnis] = useState<IDataMapDetailBisnis>()
   const [loading, setLoading] = useState(false)

   useShallowEffect(() => {
      onLoadData();
   }, []);

   async function onLoadData() {
      try {
         setLoading(true)
         const response = await apiGetOneMapById(mapId)
         if (response.success) {
            setDataLokasi(response.dataLokasi)
            setDataAuthor(response.dataAuthor)
            setDataBisnis(response.dataBisnis)
         }
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <>
         <Drawer
            opened={opened}
            onClose={() => close()}
            position={"bottom"}
            size={"auto"}
            withCloseButton={false}
            styles={{
               content: {
                  padding: 0,
                  position: "absolute",
                  margin: "auto",
                  backgroundColor: "transparent",
                  left: 0,
                  right: 0,
                  width: 500,
               },
               body: {
                  backgroundColor: AccentColor.darkblue,
                  borderTop: `2px solid ${AccentColor.blue}`,
                  borderRight: `1px solid ${AccentColor.blue}`,
                  borderLeft: `1px solid ${AccentColor.blue}`,
                  borderRadius: "20px 20px 0px 0px",
                  color: "white",
                  paddingBottom: "5%",
               },
            }}
         >
            <Stack spacing={"xs"}>
               <Group position="apart">
                  <Title order={5}>
                     {dataLokasi?.namePin ? (
                        dataLokasi?.namePin
                     ) : (
                        <Skeleton radius={"xl"} w={100} />
                     )}
                  </Title>
                  <ActionIcon onClick={close} variant="transparent">
                     <IconX color="white" />
                  </ActionIcon>
               </Group>





               {
                  loading ?
                     <ComponentMap_SkeletonDrawerDetailData /> :
                     <Stack mt={"lg"} spacing={"xl"} px={"md"}>
                        <Grid align="flex-start" justify="space-around">
                           <Grid.Col span={"content"} style={{ minHeight: 50 }}>
                              <ActionIcon
                                 radius={"xl"}
                                 variant="transparent"
                              // onClick={() => onCheckProfile()}
                              >
                                 <ComponentGlobal_LoaderAvatar
                                    fileId={dataAuthor?.imageId as any}
                                 />
                              </ActionIcon>
                           </Grid.Col>
                           <Grid.Col span={"auto"} style={{ minHeight: 50 }}>
                              <Stack justify="center" h={30}>
                                 <Text
                                    fw={"bold"}
                                    fz={"sm"}
                                    lineClamp={1}
                                 // onClick={() => onCheckProfile()}
                                 >
                                    {dataAuthor?.name}
                                 </Text>
                              </Stack>
                           </Grid.Col>
                        </Grid>



                        <ComponentMap_LoadImageMap fileId={String(dataLokasi?.imageId)} />

                        <Box>
                           <Grid>
                              <Grid.Col span={2}>
                                 <IconBuildingSkyscraper />
                              </Grid.Col>
                              <Grid.Col span={"auto"}>
                                 <Text>{dataBisnis?.namaBisnis}</Text>
                              </Grid.Col>
                           </Grid>
                           <Grid>
                              <Grid.Col span={2}>
                                 <IconListDetails />
                              </Grid.Col>
                              <Grid.Col span={"auto"}>
                                 <Text>{dataBisnis?.bidangBisnis}</Text>
                              </Grid.Col>
                           </Grid>
                           <Grid>
                              <Grid.Col span={2}>
                                 <IconPhoneCall />
                              </Grid.Col>
                              <Grid.Col span={"auto"}>
                                 <Text>+{dataBisnis?.tlpn}</Text>
                              </Grid.Col>
                           </Grid>
                           <Grid>
                              <Grid.Col span={2}>
                                 <IconMapPin />
                              </Grid.Col>
                              <Grid.Col span={"auto"}>
                                 <Text>{dataBisnis?.alamatKantor}</Text>
                              </Grid.Col>
                           </Grid>
                        </Box>

                        <Group grow position={"apart"}>
                           <Button
                              onClick={() => {
                                 router.push(
                                    RouterPortofolio.main_detail + dataBisnis?.id, { scroll: false, }
                                 );
                              }}
                              loaderPosition="center"
                              radius={"xl"}
                              bg={MainColor.yellow}
                              color="yellow"
                              c={"black"}
                           >
                              Detail
                           </Button>

                           <Button
                              radius={"xl"}
                              bg={MainColor.yellow}
                              color="yellow"
                              c={"black"}
                              onClick={() => {
                                 window.open(
                                    `https://maps.google.com?q=${dataLokasi?.latitude},${dataLokasi?.longitude}`,
                                    "_blank",
                                    "width=800,height=600,noopener,noreferrer"
                                 );
                              }}
                           >
                              Buka Maps
                           </Button>
                        </Group>
                     </Stack>
               }






            </Stack>
         </Drawer>
      </>
   );
}