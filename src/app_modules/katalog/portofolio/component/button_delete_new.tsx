import { funGetUserIdByToken } from "@/app_modules/_global/fun/get";
import { ComponentGlobal_NotifikasiBerhasil, ComponentGlobal_NotifikasiGagal } from "@/app_modules/_global/notif_global";
import { UIGlobal_Modal } from "@/app_modules/_global/ui";
import { Button } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { apiDeletePortofolio, apiGetOnePortofolioById } from "../lib/api_portofolio";
import { IDetailPortofolioBisnis } from "../lib/type_portofolio";

export default function ComponentPortofolio_ButtonDeleteNew() {
   const param = useParams<{ id: string }>()
   const [openModal, setModal] = useState(false)
   const [loadingDel, setLoadingDel] = useState(false)
   const [userLoginId, setUserLoginId] = useState("")
   const [dataPorto, setDataPorto] = useState<IDetailPortofolioBisnis>()
   const router = useRouter()


   async function onDelete() {
      try {
         setLoadingDel(true)
         const response = await apiDeletePortofolio(param.id)
         if (response.success) {
            ComponentGlobal_NotifikasiBerhasil(response.message)
            router.back()
         } else {
            ComponentGlobal_NotifikasiGagal(response.message);
         }
      } catch (error) {
         console.error(error)
         ComponentGlobal_NotifikasiGagal("Gagal menghapus portofolio");
      } finally {
         setLoadingDel(false)
      }
   }

   async function funGetPortofolio() {
      try {
         const response = await apiGetOnePortofolioById(param.id, "bisnis")
         const response2 = await funGetUserIdByToken()
         if (response.success) {
            setDataPorto(response.data)
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
         {userLoginId === dataPorto?.authorId ? (
            <Button
               radius={"xl"}
               bg={"red"}
               color="red"
               onClick={() => {
                  setModal(true)
               }}
            >
               <IconTrash />
            </Button>
         ) : (
            ""
         )}

         <UIGlobal_Modal
            title={"Anda yakin menghapus portofolio ini ?"}
            opened={openModal}
            close={() => setModal(false)}
            buttonKiri={
               <Button radius={"xl"} onClick={() => setModal(false)}>
                  Batal
               </Button>
            }
            buttonKanan={
               <Button
                  radius={"xl"}
                  color="red"
                  loaderPosition="center"
                  loading={loadingDel}
                  onClick={() => onDelete()}
               >
                  Hapus
               </Button>
            }
         />
      </>
   )
}