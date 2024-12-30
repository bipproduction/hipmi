"use client";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import ComponentDonasi_CardPublishNew from "../../component/card_view/card_publish_new";
import SkeletonDonasi from "../../component/skeleton_donasi";
import { apiGetAllDonasi } from "../../lib/api_donasi";
import { IDataAllDonasi } from "../../lib/type_donasi";
import { ComponentDonasi_CardStatusNew } from "../../component/card_view/card_status_new";

export default function Donasi_ViewGalangDanaNew() {
   const param = useParams<{ id: string }>();;
   const [data, setData] = useState<IDataAllDonasi[]>([]);
   const [activePage, setActivePage] = useState(1);
   const [loading, setLoading] = useState(true)

   async function getDataGalangDana() {
      try {
         setLoading(true)
         const response = await apiGetAllDonasi(`?cat=galang-dana&status=${param.id}&page=1`)
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
      getDataGalangDana()
   }, []);

   return (
      <>
         {
            loading ? <SkeletonDonasi />
               :
               _.isEmpty(data) ? (
                  <ComponentGlobal_IsEmptyData />
               ) : (
                  <Box>
                     <ScrollOnly
                        height="75vh"
                        renderLoading={() => (
                           <Center>
                              <ComponentGlobal_Loader size={25} />
                           </Center>
                        )}
                        data={data}
                        setData={setData}
                        moreData={async () => {
                           const pageNew = activePage + 1
                           const loadData = await apiGetAllDonasi(`?cat=galang-dana&status=${param.id}&page=${pageNew}`)
                           setActivePage((val) => val + 1);

                           return loadData.data;
                        }}
                     >
                        {
                           param.id == "1" ?
                              (item) => (<ComponentDonasi_CardPublishNew data={item} />)
                              :
                              (item) => (<ComponentDonasi_CardStatusNew data={item} />)

                        }
                     </ScrollOnly>
                  </Box>
               )
         }
      </>
   );
}
