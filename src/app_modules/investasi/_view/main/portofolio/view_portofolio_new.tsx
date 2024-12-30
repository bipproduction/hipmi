import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Investasi_ComponentCardPortofolio_NotPublishNew } from "@/app_modules/investasi/_component/main/comp_card_portofolio_not_publish_new";
import { Investasi_ComponentCardPortofolioPublishNew } from "@/app_modules/investasi/_component/main/comp_card_portofolio_publish_new";
import { apiGetAllInvestasi } from "@/app_modules/investasi/_lib/api_interface";
import { IDataInvestasiBursa } from "@/app_modules/investasi/_lib/type_investasi";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import SkeletonInvestasiPortofolio from "./skeleton_portofolio";

export function Investasi_ViewPortofolioNew() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<IDataInvestasiBursa[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true)

  async function getDataInvestasi() {
    try {
      setLoading(true)
      const response = await apiGetAllInvestasi(`?cat=portofolio&status=${param.id}&page=1`)
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
      <Box>
        {
          loading ?
            <SkeletonInvestasiPortofolio />
            :
            _.isEmpty(data) ? (
              <ComponentGlobal_IsEmptyData />
            ) : (
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
                  const loadData = await apiGetAllInvestasi(`?cat=portofolio&status=${param.id}&page=${pageNew}`)
                  setActivePage((val) => val + 1);

                  return loadData.data;
                }}
              >
                {
                  param.id == "1" ?
                    (item) => (<Investasi_ComponentCardPortofolioPublishNew data={item} />)
                    :
                    (item) => (<Investasi_ComponentCardPortofolio_NotPublishNew data={item} />)
                }
              </ScrollOnly>
            )
        }
      </Box>
    </>
  );
}
