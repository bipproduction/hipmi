"use client";
import { gs_donasiTriggerBeranda } from "@/app/lib/global_state";
import { RouterDonasi } from "@/app/lib/router_hipmi/router_donasi";
import { AccentColor } from "@/app_modules/_global/color";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Affix, Box, Button, Center, rem } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentDonasi_CardPublishNew from "../component/card_view/card_publish_new";
import SkeletonDonasi from "../component/skeleton_donasi";
import { apiGetAllDonasi } from "../lib/api_donasi";
import { IDataAllDonasi } from "../lib/type_donasi";

export default function MainDonasiNew() {
   const [data, setData] = useState<IDataAllDonasi[]>([]);
   const [activePage, setActivePage] = useState(1);
   const [loading, setLoading] = useState(true)

   // Realtime
   const [isTriggerDonasiBeranda, setIsTriggerDonasiBeranda] = useAtom(
      gs_donasiTriggerBeranda
   );
   const [isShowUpdate, setIsShowUpdate] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   useShallowEffect(() => {
      if (isTriggerDonasiBeranda) {
         setIsShowUpdate(true);
      }
   }, [isTriggerDonasiBeranda, setIsShowUpdate]);

   async function onLoadData({ onPublish }: { onPublish: (val: any) => void }) {
      setIsLoading(true);
      const loadData = await apiGetAllDonasi(`?cat=beranda&page=1`)
      onPublish(loadData);

      setIsShowUpdate(false);
      setIsTriggerDonasiBeranda(false);
      setIsLoading(false);
   }


   async function getDataDonasi() {
      try {
         setLoading(true)
         const response = await apiGetAllDonasi(`?cat=beranda&page=1`)
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
      getDataDonasi()
   }, []);

   return (
      <>
         <Box>
            {isShowUpdate && (
               <Affix position={{ top: rem(100) }} w={"100%"}>
                  <Center>
                     <Button
                        style={{
                           transition: "0.5s",
                           border: `1px solid ${AccentColor.skyblue}`,
                        }}
                        bg={AccentColor.blue}
                        loaderPosition="center"
                        loading={isLoading}
                        radius={"xl"}
                        opacity={0.8}
                        onClick={() => {
                           onLoadData({
                              onPublish(val) {
                                 setData(val);
                              },
                           });
                        }}
                     >
                        Update beranda
                     </Button>
                  </Center>
               </Affix>
            )}

            <ComponentGlobal_CreateButton path={RouterDonasi.create_donasi} />
            {
               loading
                  ? <SkeletonDonasi />
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
                           const loadData = await apiGetAllDonasi(`?cat=beranda&page=${pageNew}`)

                           setActivePage((val) => val + 1);

                           return loadData;
                        }}
                     >
                        {(item) => (
                           <ComponentDonasi_CardPublishNew
                              data={item as any}
                              path={RouterDonasi.detail_main}
                           />
                        )}
                     </ScrollOnly>
                  )
            }
         </Box>
      </>
   );
}
