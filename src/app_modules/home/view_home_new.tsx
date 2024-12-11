"use client";
import { gs_count_ntf, gs_user_ntf } from "@/app/lib/global_state";
import { RouterNotifikasi } from "@/app/lib/router_hipmi/router_notifikasi";
import { RouterUserSearch } from "@/app/lib/router_hipmi/router_user_search";
import { ActionIcon, Indicator, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconBell, IconUserSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainColor } from "../_global/color";
import { ComponentGlobal_NotifikasiPeringatan } from "../_global/notif_global";
import UIGlobal_LayoutHeaderTamplate from "../_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "../_global/ui/ui_layout_tamplate";
import notifikasi_countUserNotifikasi from "../notifikasi/fun/count/fun_count_by_id";
import BodyHome from "./component/body_home";
import FooterHome from "./component/footer_home";
import { apiGetDataHome } from "./fun/get/api_home";

export default function HomeViewNew({ countNotifikasi }: { countNotifikasi: number; }) {
   const [countNtf, setCountNtf] = useState(countNotifikasi);
   const [newUserNtf, setNewUserNtf] = useAtom(gs_user_ntf);
   const [countLoadNtf, setCountLoadNtf] = useAtom(gs_count_ntf);
   const [dataUser, setDataUser] = useState<any>({})
   const router = useRouter();


   useShallowEffect(() => {
      onLoadNotifikasi({
         onLoad(val) {
            setCountNtf(val);
         },
      });

      setCountNtf(countLoadNtf as any);
   }, [countLoadNtf, setCountNtf]);

   useShallowEffect(() => {
      setCountNtf(countNtf + newUserNtf);
      setNewUserNtf(0);
   }, [newUserNtf, setCountNtf]);

   async function onLoadNotifikasi({ onLoad }: { onLoad: (val: any) => void }) {
      const loadNotif = await notifikasi_countUserNotifikasi();
      onLoad(loadNotif);
   }

   useShallowEffect(() => {
      cekUserLogin();
   }, []);


   async function cekUserLogin() {
      try {
         const response = await apiGetDataHome("?cat=cek_profile")
         if (response.success) {
            setDataUser(response.data);
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <>
         <UIGlobal_LayoutTamplate
            header={
               <UIGlobal_LayoutHeaderTamplate
                  title="HIPMI"
                  customButtonLeft={
                     <ActionIcon
                        radius={"xl"}
                        variant={"transparent"}
                        onClick={() => {
                           if (dataUser.profile === undefined || dataUser?.profile === null) {
                              ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                           } else {
                              router.push(RouterUserSearch.main, { scroll: false });
                           }
                        }}
                     >
                        <IconUserSearch color="white" />
                     </ActionIcon>
                  }
                  customButtonRight={
                     <ActionIcon
                        variant="transparent"
                        onClick={() => {
                           if (dataUser.profile === undefined || dataUser?.profile === null) {
                              ComponentGlobal_NotifikasiPeringatan("Lengkapi Profile");
                           } else {
                              router.push(RouterNotifikasi.categoryApp({ name: "semua" }), {
                                 scroll: false,
                              });
                           }
                        }}
                     >
                        {
                           countNotifikasi > 0
                              ?
                              <Indicator
                                 processing
                                 color={MainColor.yellow}
                                 label={
                                    <Text fz={10} c={MainColor.darkblue}>
                                       {countNotifikasi > 99 ? "99+" : countNotifikasi}
                                    </Text>
                                 }
                              >
                                 <IconBell color="white" />
                              </Indicator>
                              :
                              <IconBell color="white" />
                        }

                     </ActionIcon>
                  }
               />
            }

            footer={<FooterHome />}
         >
            <BodyHome />
         </UIGlobal_LayoutTamplate>
      </>
   );
}
