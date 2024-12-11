import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentPortofolio_DaftarBoxView } from "../component/card_view_daftar";
import { portofolio_funGetAllDaftarByid } from "../fun/get/get_all_portofolio";
import { MODEL_PORTOFOLIO } from "../model/interface";
import { useParams } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";
import { apiGetPortofolioByProfile } from "../lib/api_portofolio";

export default function Portofolio_UiListDetailNew() {
   const param = useParams<{ id: string }>()
   const profileId = param.id
   const [data, setData] = useState<MODEL_PORTOFOLIO[]>([])
   const [activePage, setActivePage] = useState(1)

   async function getPortofolio() {
      try {
         const response = await apiGetPortofolioByProfile(`?profile=${param.id}&cat=portofolio&page=1`)
         if (response.success) {
            setData(response.data);
         }
      } catch (error) {
         console.error(error);
      }
   }


   useShallowEffect(() => {
      getPortofolio()
   }, []);

   return <>
      <Box py={5}>
         <ScrollOnly
            height="90vh"
            renderLoading={() => (
               <Center mt={"lg"}>
                  <ComponentGlobal_Loader />
               </Center>
            )}
            data={data}
            setData={setData}
            moreData={async () => {
               const loadData = await portofolio_funGetAllDaftarByid({
                  profileId,
                  page: activePage + 1,
               });
               setActivePage((val) => val + 1);

               return loadData;
            }}
         >
            {(item) => <ComponentPortofolio_DaftarBoxView data={item} />}
         </ScrollOnly>
      </Box>
   </>;
}