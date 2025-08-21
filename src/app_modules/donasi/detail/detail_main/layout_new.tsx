"use client";
import UIGlobal_LayoutHeaderTamplate from "@/app_modules/_global/ui/ui_header_tamplate";
import UIGlobal_LayoutTamplate from "@/app_modules/_global/ui/ui_layout_tamplate";
import React, { useState } from "react";
import ButtonDonasi from "../../component/footer_button_donasi";
import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import { IconDotsVertical, IconMessageShare } from "@tabler/icons-react";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { useParams } from "next/navigation";
import { apiGetOneDonasiById } from "../../lib/api_donasi";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { useShallowEffect } from "@mantine/hooks";
import { Component_Header } from "@/app_modules/_global/component/new/component_header";
import UI_NewLayoutTamplate, { UI_NewHeader, UI_NewChildren, UI_NewFooter } from "@/app_modules/_global/ui/V2_layout_tamplate";

export default function LayoutDetailMainDonasiNew({ children, }: { children: React.ReactNode; }) {
   const [openDrawer, setOpenDrawer] = useState(false);
   const param = useParams<{ id: string }>();
   const [loading, setLoading] = useState(true);
   const [authorId, setAuthorId] = useState("");
   const [userLogin, setUserLogin] = useState("");

   const listPage = [
      {
         id: "1",
         name: "Rekap Kabar",
         icon: <IconMessageShare />,
         path: RouterDonasi.rekap_kabar({ id: param.id }),
      },
   ];

   async function getDataDonasi() {
      try {
         setLoading(true)
         const response = await apiGetOneDonasiById(param.id, "author")
         const response2 = await funGetUserIdByToken()
         if (response.success) {
            setAuthorId(response.data.authorId)
            setUserLogin(response2)
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getDataDonasi()
   }, [])

   return (
     <>
       {/* <UIGlobal_LayoutTamplate
         header={
           <UIGlobal_LayoutHeaderTamplate
             title="Detail Donasi"
             customButtonRight={
               loading ? (
                 ""
               ) : userLogin !== authorId ? (
                 ""
               ) : (
                 <ActionIcon
                   variant="transparent"
                   onClick={() => setOpenDrawer(true)}
                 >
                   <IconDotsVertical color="white" />
                 </ActionIcon>
               )
             }
           />
         }
         footer={<ButtonDonasi donasiId={param.id} />}
       >
         {children}
       </UIGlobal_LayoutTamplate> */}

       <UI_NewLayoutTamplate>
         <UI_NewHeader>
           <Component_Header
             title="Detail Donasi"
             customButtonRight={
               loading ? (
                 ""
               ) : userLogin !== authorId ? (
                 ""
               ) : (
                 <ActionIcon
                   variant="transparent"
                   onClick={() => setOpenDrawer(true)}
                 >
                   <IconDotsVertical color="white" />
                 </ActionIcon>
               )
             }
           />
         </UI_NewHeader>
         <UI_NewChildren>{children}</UI_NewChildren>
         <UI_NewFooter>
           <ButtonDonasi donasiId={param.id} />
         </UI_NewFooter>
       </UI_NewLayoutTamplate>

       <UIGlobal_Drawer
         opened={openDrawer}
         close={() => setOpenDrawer(false)}
         component={listPage}
       />
     </>
   );
}
