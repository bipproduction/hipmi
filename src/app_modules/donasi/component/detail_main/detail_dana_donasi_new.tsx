"use client";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { MainColor } from "@/app_modules/_global/color/color_pallet";
import { ComponentGlobal_CardStyles, ComponentGlobal_LoadImageLandscape, } from "@/app_modules/_global/component";
import { ComponentGlobal_NotifikasiPeringatan } from "@/app_modules/_global/notif_global";
import { Divider, Grid, Group, Progress, Stack, Text, Title, } from "@mantine/core";
import { IconClover, IconMessageChatbot, IconMoneybag, } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { Donasi_findDonaturByTokenId } from "../../fun/get/get_donatur_by_token_id";
import { MODEL_DONASI } from "../../model/interface";
import ComponentDonasi_TampilanHitungMundur from "../tampilan_hitung_mundur";
import TampilanRupiahDonasi from "../tampilan_rupiah";
import { useState } from "react";
import { apiGetOneDonasiById } from "../../lib/api_donasi";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { useShallowEffect } from "@mantine/hooks";
import SkeletonDetailDanaDonasi from "./skeleton_detail_dana_donasi";

export function ComponentDonasi_DetailDataMainNew() {
   const router = useRouter();
   const param = useParams<{ id: string }>();
   const [loading, setLoading] = useState(true);
   const [donasi, setDonasi] = useState<MODEL_DONASI | any>();
   const [countDonatur, setcountDonatur] = useState(0);
   const [userLoginId, setuserLoginId] = useState("");

   async function getData() {
      try {
         setLoading(true)
         const response = await apiGetOneDonasiById(param.id, "semua")
         const response1 = await apiGetOneDonasiById(param.id, "count")
         const response2 = await funGetUserIdByToken()
         if (response.success) {
            setDonasi(response.data)
            setcountDonatur(response1.data)
            setuserLoginId(response2)
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getData()
   }, [])

   return (
      <>
         <ComponentGlobal_CardStyles>
            {
               loading ? <SkeletonDetailDanaDonasi />
                  :
                  <Stack>
                     <ComponentGlobal_LoadImageLandscape fileId={donasi?.imageId} />
                     <Stack spacing={0} mt={"lg"}>
                        <Title order={4}>{donasi?.title}</Title>
                        <ComponentDonasi_TampilanHitungMundur
                           durasi={donasi?.DonasiMaster_Durasi.name}
                           publishTime={donasi?.publishTime}
                        />
                     </Stack>
                     <Stack spacing={0}>
                        <Group position="apart" align="center" h={"100%"}>
                           <Stack spacing={0}>
                              <Text fz={12}>Dana terkumpul</Text>
                              <Title order={4} c="blue">
                                 <TampilanRupiahDonasi nominal={+donasi?.terkumpul} />
                              </Title>
                              <Group>
                                 <Text fz={10}>Dari target</Text>{" "}
                                 <TampilanRupiahDonasi
                                    nominal={+donasi?.target}
                                    fontSize={10}
                                 />
                              </Group>
                           </Stack>
                           <Stack spacing={0}>
                              <Text fz={12}>Kategori</Text>
                              <Title
                                 order={4}
                                 style={{
                                    color: MainColor.yellow,
                                 }}
                              >
                                 {donasi?.DonasiMaster_Ketegori.name}
                              </Title>
                           </Stack>
                        </Group>
                     </Stack>
                     <Progress value={+donasi?.progres} color="yellow" size={"lg"} />

                     <Grid>
                        <Grid.Col
                           span={"auto"}
                           onClick={() => {
                              router.push(RouterDonasi.donatur + `${donasi.id}`);
                           }}
                        >
                           <Stack
                              align="center"
                              spacing={"xs"}
                              style={{
                                 color: MainColor.yellow,
                              }}
                           >
                              <Group align="center" h={"100%"}>
                                 <IconClover />
                                 <Title order={6}>{countDonatur}</Title>
                              </Group>
                              <Text fz={"xs"} c={"white"}>
                                 Donatur
                              </Text>
                           </Stack>
                        </Grid.Col>
                        <Divider orientation="vertical" />
                        <Grid.Col
                           span={"auto"}
                           onClick={() => {
                              router.push(RouterDonasi.daftar_kabar({ id: donasi.id }), {
                                 scroll: false,
                              });
                           }}
                        >
                           <Stack spacing={"sm"} align="center">
                              <IconMessageChatbot
                                 style={{
                                    color: MainColor.yellow,
                                 }}
                              />
                              <Text fz={"xs"}>Kabar Terbaru</Text>
                           </Stack>
                        </Grid.Col>
                        <Divider orientation="vertical" />
                        <Grid.Col
                           span={"auto"}
                           onClick={() => {
                              onPencairanDana(
                                 router,
                                 donasi,
                                 userLoginId,
                              );
                           }}
                        >
                           <Stack spacing={"sm"} align="center">
                              <IconMoneybag
                                 style={{
                                    color: MainColor.yellow,
                                 }}
                              />
                              <Text fz={"xs"}>Pencairan Dana</Text>
                           </Stack>
                        </Grid.Col>
                     </Grid>
                  </Stack>
            }
         </ComponentGlobal_CardStyles>
      </>
   );
}

async function onPencairanDana(router: AppRouterInstance, donasi: MODEL_DONASI, userLoginId: string,) {
   const cek = await Donasi_findDonaturByTokenId(donasi.id, userLoginId);
   if (userLoginId == donasi.authorId) {
      return router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);
   }

   if (!cek) {
      return ComponentGlobal_NotifikasiPeringatan("Halaman khusus donatur");
   } else {
      router.push(RouterDonasi.pencairan_dana + `${donasi.id}`);
   }
}
