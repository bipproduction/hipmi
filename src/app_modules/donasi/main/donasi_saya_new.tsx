"use client";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentDonasi_CardInvoiceNew } from "../component/card_view/card_invoice_new";
import SkeletonDonasiSaya from "../component/skeleton_donasi_saya";
import { apiGetAllDonasiSaya } from "../lib/api_donasi";
import { IDataAllDonasiSaya } from "../lib/type_donasi";

export default function DonasiSayaNew() {
   const [data, setData] = useState<IDataAllDonasiSaya[]>([]);
   const [activePage, setActivePage] = useState(1);
   const [loading, setLoading] = useState(true)

   async function getDataDonasiSaya() {
      try {
         setLoading(true)
         const response = await apiGetAllDonasiSaya(`?page=1`)
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
      getDataDonasiSaya()
   }, []);

   return (
      <>
         <Box>
            {
               loading ?
                  <SkeletonDonasiSaya />
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
                           const loadData = await apiGetAllDonasiSaya(`?page=${pageNew}`)
                           setActivePage((val) => val + 1);

                           return loadData.data;
                        }}
                     >
                        {(item) => <ComponentDonasi_CardInvoiceNew data={item} />}
                     </ScrollOnly>
                  )
            }
         </Box>
      </>
   );
}