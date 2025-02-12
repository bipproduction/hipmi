import { NEW_RouterInvestasi } from "@/lib/router_hipmi/router_investasi";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Box, Center } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentCardPortofolio_NotPublish } from "../../../_component";
import { investasi_funGetAllInvestasiNonPublishByUserId } from "../../../_fun";

export function Investasi_ViewPortofolioReview({
  statusId,
  dataPortofolio,
}: {
  statusId: string;
  dataPortofolio: any;
}) {
  const [data, setData] = useState<any[]>(dataPortofolio);
  const [activePage, setActivePage] = useState(1);

  return (
    <>
      <Box>
        {_.isEmpty(data) ? (
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
              const loadData =
                await investasi_funGetAllInvestasiNonPublishByUserId({
                  page: activePage + 1,
                  statusId: "2",
                });
              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <Investasi_ComponentCardPortofolio_NotPublish
                data={item}
                path={NEW_RouterInvestasi.detail_portofolio({id: item.id})}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
