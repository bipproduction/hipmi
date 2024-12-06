import { AccentColor } from "@/app_modules/_global/color";
import { Paper, Title, Stack, Grid, Text, Skeleton, Box } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IDetailPortofolioSosmed } from "../lib/type_portofolio";
import { apiGetOnePortofolioById } from "../lib/api_portofolio";
import { useShallowEffect } from "@mantine/hooks";

export default function Portofolio_UiSosialMediaNew() {
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string }>()
   const [dataPorto, setDataPorto] = useState<IDetailPortofolioSosmed>();

   async function funGetPortofolio() {
      try {
         setLoading(true)
         const response = await apiGetOnePortofolioById(param.id, "sosmed");
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
            <Title order={6}>Media Sosial Bisnis</Title>
            {
               loading ?
                  <Box>
                     {[...Array(4)].map((_, index) => (
                        <Box key={index} py={5}>
                           <Grid align="center">
                              <Grid.Col span={1}>
                                 <Skeleton w={25} h={25} />
                              </Grid.Col>
                              <Grid.Col span={11}>
                                 <Skeleton w={"100%"} h={15} />
                              </Grid.Col>
                           </Grid>
                        </Box>
                     ))}
                  </Box>
                  :
                  <Stack p={"sm"}>
                     <Grid>
                        <Grid.Col span={2}>
                           <IconBrandFacebook />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                           {dataPorto?.facebook ? (
                              <Text>{dataPorto?.facebook}</Text>
                           ) : (
                              "-"
                           )}
                        </Grid.Col>
                     </Grid>
                     <Grid>
                        <Grid.Col span={2}>
                           <IconBrandInstagram />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                           {dataPorto?.instagram ? (
                              <Text>{dataPorto?.instagram}</Text>
                           ) : (
                              "-"
                           )}
                        </Grid.Col>
                     </Grid>
                     <Grid>
                        <Grid.Col span={2}>
                           <IconBrandTiktok />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                           {dataPorto?.tiktok ? (
                              <Text>{dataPorto?.tiktok}</Text>
                           ) : (
                              "-"
                           )}
                        </Grid.Col>
                     </Grid>
                     <Grid>
                        <Grid.Col span={2}>
                           <IconBrandTwitter />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                           {dataPorto?.twitter ? (
                              <Text>{dataPorto?.twitter}</Text>
                           ) : (
                              "-"
                           )}
                        </Grid.Col>
                     </Grid>
                     <Grid>
                        <Grid.Col span={2}>
                           <IconBrandYoutube />
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                           {dataPorto?.youtube ? (
                              <Text>{dataPorto?.youtube}</Text>
                           ) : (
                              "-"
                           )}
                        </Grid.Col>
                     </Grid>
                  </Stack>

            }
         </Paper>
      </>
   )
}