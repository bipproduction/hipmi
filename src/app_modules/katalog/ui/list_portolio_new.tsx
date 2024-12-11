import { AccentColor, MainColor } from "@/app_modules/_global/color";
import { Box, Center, Group, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { apiGetPortofolioByProfile, IListPortofolio } from "../portofolio";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { IconCaretRight } from "@tabler/icons-react";

export default function ListPortofolioProfileNew() {
   const router = useRouter();
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
   const [dataPortofolio, setDataPortofolio] = useState<IListPortofolio[]>([])

   async function getPortofolio() {
      try {
         setLoading(true)
         const response = await apiGetPortofolioByProfile(`?profile=${param.id}&cat=profile`)
         if (response.success) {
            setDataPortofolio(response.data);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      getPortofolio()
   }, []);


   return (
      <>
         <Box
            style={{
               backgroundColor: AccentColor.darkblue,
               border: `2px solid ${AccentColor.blue}`,
               borderRadius: "10px ",
               padding: "15px",
               color: "white",
            }}
         >
            <Stack spacing={"sm"}>
               <Group position="center">
                  <Title order={4}>Portofolio</Title>
               </Group>

               <Stack
                  style={{
                     height: "auto",
                  }}
               >
                  {
                     loading ?
                        <>
                           <Skeleton height={70} radius={"md"} width={"100%"} />
                           <Skeleton height={70} radius={"md"} width={"100%"} />
                        </>
                        :

                        _.isEmpty(dataPortofolio) ? (
                           <Center>
                              <Text fs={"italic"} fz={"xs"} c={"gray"}>
                                 - Belum Ada Portofolio -
                              </Text>
                           </Center>
                        ) : (
                           <Stack>
                              {dataPortofolio.map((e, i) => (
                                 <Paper
                                    shadow="sm"
                                    key={i}
                                    radius={"md"}
                                    onClick={() => {
                                       router.push(RouterPortofolio.main_detail + e?.id);
                                    }}
                                    style={{
                                       backgroundColor: MainColor.darkblue,
                                       border: `2px solid ${AccentColor.blue}`,
                                       borderRadius: "10px ",
                                       padding: "15px",
                                       color: "white",
                                    }}
                                 >
                                    <Group position="apart">
                                       <Stack spacing={0} w={"80%"}>
                                          <Text fw={"bold"} lineClamp={1}>
                                             {e?.namaBisnis}
                                          </Text>
                                          <Text fz={10} c={MainColor.yellow}>
                                             #{e.id_Portofolio}
                                          </Text>
                                       </Stack>
                                       <Stack>
                                          <IconCaretRight color="white" size={25} />
                                       </Stack>
                                    </Group>
                                 </Paper>
                              ))}
                           </Stack>
                        )
                  }

                  {
                     loading ? <></>
                        :
                        _.isEmpty(dataPortofolio) ? (
                           ""
                        ) : (
                           <Group position="right">
                              <Text
                                 style={{
                                    cursor: "pointer",
                                 }}
                                 onClick={() =>
                                    router.push(
                                       RouterPortofolio.daftar_portofolio + param.id,
                                       { scroll: false }
                                    )
                                 }
                                 fw={"bold"}
                                 fz={"sm"}
                              >
                                 Lihat semua
                              </Text>
                           </Group>
                        )
                  }
               </Stack>
            </Stack>
         </Box>
      </>
   )
}