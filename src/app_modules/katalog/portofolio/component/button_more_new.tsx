import { RouterPortofolio } from "@/app/lib/router_hipmi/router_katalog";
import { RouterMap } from "@/app/lib/router_hipmi/router_map";
import { UIGlobal_Drawer } from "@/app_modules/_global/ui";
import { ActionIcon } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEdit, IconPhotoEdit, IconId, IconMapPin2, IconMapPin, IconDotsVertical } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetOnePortofolioById } from "../lib/api_portofolio";
import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";

export default function ComponentPortofolio_ButtonMoreNew() {
   const param = useParams<{ id: string }>()
   const [userLoginId, setUserLoginId] = useState("")
   const [authorId, setAuthorId] = useState("")
   const [openDrawer, setOpenDrawer] = useState(false)

   const listPage = [
      {
         id: "1",
         name: "Edit detail ",
         icon: <IconEdit />,
         path: RouterPortofolio.edit_data_bisnis + `${param.id}`,
      },
      {
         id: "2",
         name: "Edit logo ",
         icon: <IconPhotoEdit />,
         path: RouterPortofolio.edit_logo_bisnis + `${param.id}`,
      },
      {
         id: "3",
         name: "Edit sosial media",
         icon: <IconId />,
         path: RouterPortofolio.edit_medsos_bisnis + `${param.id}`,
      },
      {
         id: "4",
         name: "Edit data map",
         icon: <IconMapPin2 />,
         path: RouterMap.edit + `${param.id}`,
      },
      {
         id: "5",
         name: "Custom pin map",
         icon: <IconMapPin />,
         path: RouterMap.custom_pin + `${param.id}`,
      },
   ];


   async function funGetPortofolio() {
      try {
         const response = await apiGetOnePortofolioById(param.id, "bisnis")
         const response2 = await funGetUserIdByToken()
         if (response.success) {
            setAuthorId(response.data.authorId)
            setUserLoginId(response2)
         }
      } catch (error) {
         console.error(error);
      }
   }

   useShallowEffect(() => {
      funGetPortofolio()
   }, []);


   return (
      <>
         {userLoginId === authorId ? (
            <ActionIcon variant="transparent" onClick={() => setOpenDrawer(true)}>
               <IconDotsVertical color="white" />
            </ActionIcon>
         ) : (
            <ActionIcon disabled variant="transparent"></ActionIcon>
         )}

         <UIGlobal_Drawer
            opened={openDrawer}
            close={() => setOpenDrawer(false)}
            component={listPage}
         />
      </>
   )
}