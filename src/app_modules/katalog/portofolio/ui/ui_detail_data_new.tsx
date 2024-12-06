import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { ComponentGlobal_LoadImage } from "@/app_modules/_global/component";
import { Paper, Stack, Group, Title, SimpleGrid, Box, Grid, Divider, Text } from "@mantine/core";
import { IconBuildingSkyscraper, IconListDetails, IconPhoneCall, IconMapPin, IconPinned } from "@tabler/icons-react";
import { useState } from "react";
import { IDetailPortofolioBisnis } from "../lib/type_portofolio";
import { useParams } from "next/navigation";
import { apiGetOnePortofolioById } from "../lib/api_portofolio";
import { useShallowEffect } from "@mantine/hooks";
import SkeletonDetailBisnis from "./ui_skeleton_detail_bisnis";

export default function Portofolio_UiDetailDataNew() {
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string }>()
   const [dataPorto, setDataPorto] = useState<IDetailPortofolioBisnis>();

   async function funGetPortofolio() {
      try {
         setLoading(true)
         const response = await apiGetOnePortofolioById(param.id, "bisnis");
         if (response.success) {
            setDataPorto(response.data);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      funGetPortofolio()
   }, []);

   return (
      <>
         <Paper
            p={"sm"}
            style={{
               backgroundColor: AccentColor.darkblue,
               border: `2px solid ${AccentColor.blue}`,
               borderRadius: "10px ",
               padding: "15px",
               color: "white",
            }}
         >
            {
               loading ?
                  <SkeletonDetailBisnis />
                  :
                  <Stack>
                     <Group position="apart">
                        <Title order={6}>Data Bisnis</Title>
                        <Text color={MainColor.yellow} fw={"bold"}>
                           id: {"  "}
                           <Text span inherit>
                              #{dataPorto?.id_Portofolio}
                           </Text>
                        </Text>
                     </Group>
                     <Stack>
                        <SimpleGrid
                           cols={2}
                           spacing={"md"}
                           breakpoints={[
                              { maxWidth: "62rem", cols: 2, spacing: "md" },
                              { maxWidth: "48rem", cols: 1, spacing: "sm" },
                              { maxWidth: "36rem", cols: 1, spacing: "sm" },
                           ]}
                        >
                           <Box>
                              <Paper>
                                 <ComponentGlobal_LoadImage fileId={String(dataPorto?.logoId)} />
                              </Paper>
                           </Box>

                           <Box>
                              <Grid>
                                 <Grid.Col span={2}>
                                    <IconBuildingSkyscraper />
                                 </Grid.Col>
                                 <Grid.Col span={"auto"}>
                                    <Text>{dataPorto?.namaBisnis}</Text>
                                 </Grid.Col>
                              </Grid>
                              <Grid>
                                 <Grid.Col span={2}>
                                    <IconListDetails />
                                 </Grid.Col>
                                 <Grid.Col span={"auto"}>
                                    <Text>{dataPorto?.bidangBisnis}</Text>
                                 </Grid.Col>
                              </Grid>
                              <Grid>
                                 <Grid.Col span={2}>
                                    <IconPhoneCall />
                                 </Grid.Col>
                                 <Grid.Col span={"auto"}>
                                    <Text>{dataPorto?.tlpn}</Text>
                                 </Grid.Col>
                              </Grid>
                              <Grid>
                                 <Grid.Col span={2}>
                                    <IconMapPin />
                                 </Grid.Col>
                                 <Grid.Col span={"auto"}>
                                    <Text>{dataPorto?.alamatKantor}</Text>
                                 </Grid.Col>
                              </Grid>
                           </Box>
                        </SimpleGrid>
                     </Stack>

                     <Divider color={AccentColor.softblue} />

                     <Stack spacing={5}>
                        <Group spacing={"xs"}>
                           <IconPinned />
                           <Text fz={"sm"} fw={"bold"}>
                              Tentang Kami
                           </Text>
                        </Group>
                        <Text px={"sm"}>{dataPorto?.deskripsi}</Text>
                     </Stack>
                  </Stack>
            }

         </Paper>
      </>
   )
}