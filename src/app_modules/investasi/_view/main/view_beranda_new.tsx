'use client'
import { RouterInvestasi_OLD } from "@/app/lib/router_hipmi/router_investasi";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import mqtt_client from "@/util/mqtt_client";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentButtonUpdateBeranda } from "../../_component";
import { Investasi_ComponentCardBerandaNew } from "../../_component/main/com_card_beranda_new";
import { apiGetAllInvestasi } from "../../_lib/api_interface";
import { IDataInvestasiBursa } from "../../_lib/type_investasi";
import SkeletonInvestasiBursa from "./skeleton_beranda";

export function Investasi_ViewBerandaNew() {
   const [data, setData] = useState<IDataInvestasiBursa[]>([]);
   const [activePage, setActivePage] = useState(1);
   const [isNewPost, setIsNewPost] = useState(false);
   const [loading, setLoading] = useState(true)

   useShallowEffect(() => {
      mqtt_client.subscribe("Beranda_Investasi");

      mqtt_client.on("message", (topic, message) => {
         const newPost = JSON.parse(message.toString());
         setIsNewPost(newPost);
      });
   }, []);


   async function getDataInvestasi() {
      try {
         setLoading(true)
         const response = await apiGetAllInvestasi(`?cat=bursa&page=1`)
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
      getDataInvestasi()
   }, []);

   return (
      <>
         {isNewPost && (
            <Investasi_ComponentButtonUpdateBeranda
               onLoadData={(val) => {
                  setData(val.data);
                  setIsNewPost(val.isNewPost);
               }}
            />
         )}

         <Box>
            <ComponentGlobal_CreateButton path={RouterInvestasi_OLD.create} />
            {
               loading ? <SkeletonInvestasiBursa />
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
                           const loadData = await apiGetAllInvestasi(`?cat=bursa&page=${pageNew}`);
                           setActivePage((val) => val + 1);

                           return loadData;
                        }}
                     >
                        {(item) => <Investasi_ComponentCardBerandaNew data={item as any} />}
                     </ScrollOnly>
                  )

            }
         </Box>
      </>
   );
}
