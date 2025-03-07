"use client";

import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import CustomSkeleton from "@/app_modules/components/CustomSkeleton";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import { clientLogger } from "@/util/clientLogger";
import { Box, Center, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { apiGetJob, apiGetJobArsip } from "../../component/api_fetch_job";
import ComponentJob_CardStatus from "../../component/card/card_view";
import { MODEL_JOB } from "../../model/interface";

export default function Job_ViewArsip() {
  const [data, setData] = useState<MODEL_JOB[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    onLoadNewData();
  }, []);

  async function onLoadNewData() {
    try {
      setIsLoading(true);
      const response = await apiGetJobArsip({
        page: `${activePage}`,
      });

      if (response.success) {
        setData(response.data);
        setActivePage(1);
        setHasMore(response.data.length > 0);
      } else {
        setData([]);
        setHasMore(false);
      }
    } catch (error) {
      clientLogger.error("Error get job", error);
      setData([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }

  const handleMoreData = async () => {
    if (!hasMore || isLoading) return null;

    try {
      const nextPage = activePage + 1;

      const response = await apiGetJob({
        page: `${nextPage}`,
      });

      if (response?.data && response.data.length > 0) {
        setActivePage(nextPage);
        setHasMore(response.data.length > 0);
        return response.data;
      } else {
        setHasMore(false);
        return null;
      }
    } catch (error) {
      clientLogger.error("Error get job", error);
      setHasMore(false);
      return null;
    }
  };

  return (
    <>
      {!data?.length && isLoading ? (
        <Stack>
          <CustomSkeleton height={70} width={"100%"} />
          <CustomSkeleton height={70} width={"100%"} />
        </Stack>
      ) : _.isEmpty(data) ? (
        <ComponentGlobal_IsEmptyData />
      ) : (
        // --- Main component --- //
        <Box>
          <ScrollOnly
            height="80vh"
            renderLoading={() => (
              <Center>
                <ComponentGlobal_Loader />
              </Center>
            )}
            data={data}
            setData={setData}
            moreData={handleMoreData}
          >
            {(item) => (
              <ComponentJob_CardStatus
                data={item}
                path={RouterJob.detail_arsip}
              />
            )}
          </ScrollOnly>
        </Box>
      )}
    </>
  );
}
