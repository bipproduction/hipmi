"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor, MainColor, } from "@/app_modules/_global/color/color_pallet";
import { ActionIcon, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { IconCircleChevronRight } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiGetOneDonasiById } from "../../lib/api_donasi";
import { useShallowEffect } from "@mantine/hooks";
import SkeletonCeritaPenggalangDonasi from "./skeleton_cerita_penggalang";

export default function ComponentDonasi_CeritaPenggalangMainNew() {
   const router = useRouter();
   const param = useParams<{ id: string }>();
   const [loading, setLoading] = useState(true)
   const [donasi, setDonasi] = useState<any>({})


   async function getCeritaDonasi() {
      try {
         setLoading(true)
         const response = await apiGetOneDonasiById(param.id, "cerita")
         if (response.success) {
            setDonasi(response.data)
         }else{
            
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      getCeritaDonasi()
   }, [])


   return (
      <>
         <Stack
            spacing={"xs"}
            style={{
               color: MainColor.white,
            }}
         >
            <Title order={4}>Cerita Penggalang Dana</Title>
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
                  loading ? <SkeletonCeritaPenggalangDonasi />
                     :
                     <Stack>
                        <Group position="apart">
                           <Text>
                              {new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(
                                 new Date(donasi?.createdAt)
                              )}
                           </Text>
                           <ActionIcon
                              variant="transparent"
                              onClick={() => {
                                 router.push(RouterDonasi.cerita_penggalang + `${donasi?.id}`);
                              }}
                           >
                              <IconCircleChevronRight
                                 style={{
                                    color: MainColor.yellow,
                                 }}
                              />
                           </ActionIcon>
                        </Group>
                        <Text lineClamp={4}>{donasi?.CeritaDonasi.cerita}</Text>
                     </Stack>
               }
            </Paper>
         </Stack>
      </>
   );
}
