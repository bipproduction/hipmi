'use client'
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentSahamSayaNew } from "../../_component/main/comp_card_saham_saya_new";
import { apiGetAllSahamSaya } from "../../_lib/api_interface";
import { IDataSahamSaya } from "../../_lib/type_investasi";
import SkeletonInvestasiSahamSaya from "./skeleton_saham_saya";

export function Investasi_ViewSahamSayaNew() {
   const [data, setData] = useState<IDataSahamSaya[]>([]);
   const [activePage, setActivePage] = useState(1);
   const [loading, setLoading] = useState(true)


   async function getDataSahamSaya() {
      try {
         setLoading(true)
         const response = await apiGetAllSahamSaya(`?cat=saham-saya&page=1`)
         if (response.success) {
            setData(response.data);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      getDataSahamSaya()
   }, []);

   return (
      <>
         <Box>
            {
               loading ?
                  <SkeletonInvestasiSahamSaya />
                  :
                  _.isEmpty(data) ? (
                     <ComponentGlobal_IsEmptyData />
                  ) : (
                     <ScrollOnly
                        height="82vh"
                        renderLoading={() => (
                           <Center>
                              <ComponentGlobal_Loader size={25} />
                           </Center>
                        )}
                        data={data}
                        setData={setData}
                        moreData={async () => {
                           const pageNew = activePage + 1
                           const loadData = await apiGetAllSahamSaya(`?cat=saham-saya&page=${pageNew}`)
                           setActivePage((val) => val + 1);

                           return loadData.data;
                        }}
                     >
                        {(item) => <Investasi_ComponentSahamSayaNew data={item} />}
                     </ScrollOnly>
                  )
            }
         </Box>
      </>
   );
}
