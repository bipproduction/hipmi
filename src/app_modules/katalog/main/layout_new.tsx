'use client'
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { UIGlobal_LayoutHeaderTamplate, UIGlobal_LayoutTamplate } from "@/app_modules/_global/ui";
import { apiGetUserProfile } from "@/app_modules/user";
import { ActionIcon } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import DrawerKatalogNew from "../component/drawer_katalog_new";

export default function LayoutKatalogNew({ children }: { children: any }) {
   const param = useParams<{ id: string }>()
   const [authorId, setAuthorId] = useState("")
   const [userRoleId, setUserRoleId] = useState("")
   const [userLoginId, setUserLoginId] = useState("")
   const [opened, { open, close }] = useDisclosure()

   async function getProfile() {
      try {
         const response = await apiGetUserProfile(`?profile=${param.id}`)
         const response2 = await funGetUserIdByToken()
         if (response.success) {
            setAuthorId(response.data.id)
            setUserRoleId(response.data.masterUserRoleId)
            setUserLoginId(response2)
         }
      } catch (error) {
         console.error(error);
      }
   }

   useShallowEffect(() => {
      getProfile()
   }, [])

   return (
      <>
         <UIGlobal_LayoutTamplate
            header={
               <UIGlobal_LayoutHeaderTamplate
                  title="KATALOG"
                  customButtonRight={
                     authorId !== userLoginId ? (
                        <ActionIcon disabled variant="transparent"></ActionIcon>
                     ) : (
                        <ActionIcon c="white" variant="transparent" onClick={() => open()}>
                           <IconDotsVertical />
                        </ActionIcon>
                     )
                  }
               />
            }
         >
            {children}
            <DrawerKatalogNew opened={opened} close={() => close()} userRoleId={userRoleId} userId={userLoginId} />
         </UIGlobal_LayoutTamplate>
      </>
   )
}