"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { MODEL_EVENT_PESERTA } from "../../_lib/interface";
import {
  apiGetKontribusiEvent
} from "../../component/button/api_fetch_event";
import { ComponentEvent_CardKontributor } from "../../component/card_view/card_kontributor";

export default function Event_Kontribusi() {
  const [data, setData] = useState<MODEL_EVENT_PESERTA[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const response = await apiGetKontribusiEvent({
        page: `${activePage}`,
      });
      if (response.success) {
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      clientLogger.error("Error get kontribusi event", error);
      setData(null);
    }
  };

  const hanldeMoreData = async () => {
    try {
      const nextPage = activePage + 1;
      const response = await apiGetKontribusiEvent({
        page: `${nextPage}`,
      });
      if (response.success) {
        setActivePage(nextPage);
        return response.data;
      }
    } catch (error) {
      clientLogger.error("Error get kontribusi event", error);
      setData(null);
    }
  };

  if (!data)
    return (
      <>
        <Stack>
          <CustomSkeleton height={200} width={"100%"} />
          <CustomSkeleton height={200} width={"100%"} />
        </Stack>
      </>
    );

  return (
    <Box>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <Box>
          <ScrollOnly
            height="82vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <ComponentGlobal_Loader />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={hanldeMoreData}
          >
            {(item) => <ComponentEvent_CardKontributor data={item} />}
          </ScrollOnly>
        </Box>
        // --- Main component --- //
      )}
    </Box>
  );
}
