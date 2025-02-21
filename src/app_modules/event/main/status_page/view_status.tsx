"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { globalStatusApp } from "@/app_modules/_global/lib";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterEvent } from "@/lib/router_hipmi/router_event";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import ComponentEvent_BoxListStatus from "../../component/box_list_status";
import { apiGetEventByStatus } from "../../component/button/api_fetch_event";

export default function Event_ViewStatus() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<any[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const cek = globalStatusApp.find((e) => e.id === param.id);
      const response = await apiGetEventByStatus({
        status: cek?.name as string,
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
      const cek = globalStatusApp.find((e) => e.id === param.id);
      const nextPage = activePage + 1;
      const response = await apiGetEventByStatus({
        status: cek?.name as string,
        page: `${nextPage}`,
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
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <ComponentGlobal_Loader size={25} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={hanldeMoreData}
          >
            {(item) => (
              <ComponentEvent_BoxListStatus
                data={item}
                path={
                  param.id == "1"
                    ? RouterEvent.detail_publish
                    : param.id == "2"
                      ? RouterEvent.detail_review
                      : param.id == "3"
                        ? RouterEvent.detail_draft
                        : param.id == "4"
                          ? RouterEvent.detail_reject
                          : ""
                }
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
