'use client'
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Box, Center, Loader } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentCardDaftarTransaksiNew } from "../../_component/main/comp_card_daftar_transaksi_new";
import { apiGetAllSahamSaya } from "../../_lib/api_interface";
import { IDataSahamSaya } from "../../_lib/type_investasi";
import SkeletonInvestasiSahamSaya from "./skeleton_saham_saya";

export function Investasi_ViewDaftarTransaksiNew() {
   const [data, setData] = useState<IDataSahamSaya[]>([]);
   const [activePage, setActivePage] = useState(1);
   const [loading, setLoading] = useState(true)


   async function getDataTransaksi() {
      try {
         setLoading(true)
         const response = await apiGetAllSahamSaya(`?cat=transaksi&page=1`)
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
      getDataTransaksi()
   }, []);

   return (
      <>
         {
            loading ?
               <SkeletonInvestasiSahamSaya />
               :
               _.isEmpty(data) ? (
                  <ComponentGlobal_IsEmptyData />
               ) : (
                  <Box>
                     <ScrollOnly
                        height="82vh"
                        renderLoading={() => (
                           <Center mt={"lg"}>
                              <Loader color={"yellow"} />
                           </Center>
                        )}
                        data={data}
                        setData={setData}
                        moreData={async () => {
                           const pageNew = activePage + 1
                           const loadData = await apiGetAllSahamSaya(`?cat=transaksi&page=${pageNew}`)
                           setActivePage((val) => val + 1);

                           return loadData.data;
                        }}
                     >
                        {(item) => <Investasi_ComponentCardDaftarTransaksiNew data={item} />}
                     </ScrollOnly>
                  </Box>
               )
         }
      </>
   );
}
