"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor, MainColor, } from "@/app_modules/_global/color/color_pallet";
import ComponentGlobal_BoxInformation from "@/app_modules/_global/component/box_information";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { ActionIcon, Avatar, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCircleChevronRight } from "@tabler/icons-react";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetOneDonasiById } from "../../lib/api_donasi";

export default function ComponentDonasi_InformasiPenggalangMainNew() {
   const router = useRouter();
   const param = useParams<{ id: string }>();
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState<any>({})


   async function getDataAuthor() {
      try {
         setLoading(true)
         const response = await apiGetOneDonasiById(param.id, "author")
         if (response.success) {
            setData(response.data)
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getDataAuthor()
   }, [])

   return (
      <>
         <Stack
            spacing={"xs"}
            style={{
               color: MainColor.white,
            }}
         >
            <Title order={4}>Informasi Penggalang Dana</Title>
            <Paper
               style={{
                  padding: "15px",
                  backgroundColor: AccentColor.darkblue,
                  border: `2px solid ${AccentColor.blue}`,
                  borderRadius: "10px",
                  color: MainColor.white,
               }}
            >
               {
                  loading ? <CustomSkeleton height={100} radius="md" width={"100%"} />
                     :
                     <Stack>
                        <Group position="apart">
                           <Title order={5}>Penggalang Dana</Title>
                           <ActionIcon
                              variant="transparent"
                              onClick={() => {
                                 router.push(RouterDonasi.penggalang_dana + `${data.authorId}`);
                              }}
                           >
                              <IconCircleChevronRight
                                 style={{
                                    color: MainColor.yellow,
                                 }}
                              />
                           </ActionIcon>
                        </Group>
                        <Group>
                           <Avatar radius={"xl"} variant="filled" bg={"blue"}>
                              {(() => {
                                 const usr = data?.Author?.username;
                                 const splt = usr?.split("");
                                 const Up = _.upperCase(splt[0])

                                 return Up;
                              })()}
                           </Avatar>
                           <Text>{data?.Author?.username}</Text>
                        </Group>
                        <ComponentGlobal_BoxInformation
                           informasi="Semua dana yang terkumpul akan disalurkan ke penggalang dana,
                  kabar penyaluran dapat dilihat di halaman kabar terbaru."
                        />
                     </Stack>
               }
            </Paper>
         </Stack>
      </>
   );
}
