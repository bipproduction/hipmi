"use client";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { gs_investasiTriggerBeranda } from "@/lib/global_state";
import { RouterInvestasi_OLD } from "@/lib/router_hipmi/router_investasi";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { Investasi_ComponentButtonUpdateBeranda } from "../../_component";
import { Investasi_ComponentCardBerandaNew } from "../../_component/main/com_card_beranda_new";
import { apiFetchGetAllInvestasi } from "../../_lib/api_fetch_new_investasi";
import { IDataInvestasiBursa } from "../../_lib/type_investasi";
import SkeletonInvestasiBursa from "./skeleton_beranda";

export function Investasi_ViewBerandaNew() {
  const [data, setData] = useState<IDataInvestasiBursa[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Realtime
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isTriggerReload, setIsTriggerReload] = useAtom(
    gs_investasiTriggerBeranda
  );

  useShallowEffect(() => {
    if (isTriggerReload) {
      setIsShowUpdate(true);
    }
  }, [isTriggerReload]);

  useShallowEffect(() => {
    setIsTriggerReload(false);
    setIsShowUpdate(false);
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      setLoading(true);
      const response = await apiFetchGetAllInvestasi({
        page: `${activePage}`,
      });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoreData = async () => {
    try {
      const nextPage = activePage + 1;
      const loadData = await apiFetchGetAllInvestasi({
        page: `${nextPage}`,
      });
      if (loadData.success) {
        setActivePage(nextPage);
        return loadData.data;
      } else {
        return [];
      }
    } catch (error) {
      clientLogger.error("Error ", error);
      return [];
    }
  };

  return (
    <>
      {isShowUpdate && (
        <Investasi_ComponentButtonUpdateBeranda
          onLoadData={(val) => {
            setData(val);
            setIsShowUpdate(false);
          }}
        />
      )}

      <Box>
        <ComponentGlobal_CreateButton path={RouterInvestasi_OLD.create} />
        {loading ? (
          <SkeletonInvestasiBursa />
        ) : _.isEmpty(data) ? (
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
            moreData={handleMoreData}
          >
            {(item) => <Investasi_ComponentCardBerandaNew data={item as any} />}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
