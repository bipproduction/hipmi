"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { globalStatusApp } from "@/app_modules/_global/lib";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { clientLogger } from "@/util/clientLogger";
import { Center, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useParams } from "next/navigation";
import { useState } from "react";
import { apiGetJobByStatus } from "../../component/api_fetch_job";
import ComponentJob_CardStatus from "../../component/card/card_view";

export default function Job_NewViewStatus() {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<any[] | null>(null);
  const [activePage, setActivePage] = useState(1);

  useShallowEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    try {
      const cek = globalStatusApp.find((e) => e.id === param.id);
      const response = await apiGetJobByStatus({
        status: cek?.name,
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
      const response = await apiGetJobByStatus({
        status: cek?.name,
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
          <CustomSkeleton height={70} width={"100%"} />
          <CustomSkeleton height={70} width={"100%"} />
        </Stack>
      </>
    );

  return (
    <>
      {_.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        <ScrollOnly
          height="75vh"
          renderLoading={() => (
            <Center mt={"lg"}>
              <Loader color={"yellow"} />
            </Center>
          )}
          data={data}
          setData={setData as any}
          moreData={hanldeMoreData}
        >
          {(item) => (
            <ComponentJob_CardStatus
              data={item}
              path={
                param.id == "1"
                  ? RouterJob.detail_publish
                  : param.id == "2"
                    ? RouterJob.detail_review
                    : param.id === "3"
                      ? RouterJob.detail_draft
                      : param.id === "4"
                        ? RouterJob.detail_reject
                        : ""
              }
            />
          )}
        </ScrollOnly>
      )}
    </>
  );
}
