"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MODEL_EVENT } from "../../_lib/interface";
import {
    apiGetRiwayatEvent
} from "../../component/button/api_fetch_event";
import { ComponentEvent_CardRiwayat } from "../../component/card_view/card_riwayat";
import { listTabsRiwayatEvent } from "../../component/list_tab_riwayat";

export default function Event_ViewRiwayat() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<MODEL_EVENT[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const cek = listTabsRiwayatEvent.find((e) => e.id === param.id);
      const response = await apiGetRiwayatEvent({
        name: cek?.value as string,
        page: `${activePage}`,
      });
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      clientLogger.error("Error get job", error);
    }
  };

  const hanldeMoreData = async () => {
    try {
      const cek = listTabsRiwayatEvent.find((e) => e.id === param.id);
      const nextPage = activePage + 1;
      const response = await apiGetRiwayatEvent({
        name: cek?.value as string,
        page: `${activePage}`,
      });
      if (response.success) {
        setActivePage(nextPage);
        return response.data;
      }
    } catch (error) {
      clientLogger.error("Error get job", error);
    }
  };

  if (!data)
    return (
      <>
        <Stack>
          <CustomSkeleton height={100} width={"100%"} />
          <CustomSkeleton height={100} width={"100%"} />
        </Stack>
      </>
    );

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box>
          <ScrollOnly
            height="77vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={hanldeMoreData}
          >
            {(item) => <ComponentEvent_CardRiwayat data={item} />}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
