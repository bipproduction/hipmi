"use client";

import { gs_jobTiggerBeranda } from "@/lib/global_state";
import { RouterJob } from "@/lib/router_hipmi/router_job";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import { Center, Loader, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import {
  Job_ComponentButtonUpdateBeranda,
  Job_ComponentSkeletonBeranda,
} from "../../component";
import ComponentJob_BerandaCardView from "../../component/beranda/card_view";
import { MODEL_JOB } from "../../model/interface";
import { apiGetJob } from "../../component/api_fetch_job";
import { clientLogger } from "@/util/clientLogger";

export default function Job_ViewBeranda() {
  const [data, setData] = useState<MODEL_JOB[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Notifikasi
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isTriggerJob, setIsTriggerJob] = useAtom(gs_jobTiggerBeranda);

  useShallowEffect(() => {
    if (isTriggerJob == true) {
      setIsShowUpdate(true);
    }
  }, [isTriggerJob]);

  useShallowEffect(() => {
    setIsTriggerJob(false);
    setIsShowUpdate(false);
    onLoadNewData();
  }, [isSearch]);

  async function onSearch(text: string) {
    setIsSearch(text);
    setActivePage(1);
    setHasMore(true);
  }

  async function onLoadNewData() {
    try {
      setIsLoading(true);
      const response = await apiGetJob({
        page: `${activePage}`,
        search: isSearch,
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
        search: isSearch,
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
      <Stack my={1} spacing={30}>
        {isShowUpdate && (
          <Job_ComponentButtonUpdateBeranda
            onSetIsNewPost={(val) => {
              setIsShowUpdate(val);
              setIsTriggerJob(val);
            }}
            onSetData={(val: any[]) => {
              setData(val);
            }}
          />
        )}

        <ComponentGlobal_CreateButton path={RouterJob.create} />

        <TextInput
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
          radius={"xl"}
          icon={<IconSearch />}
          placeholder="Pekerjaan apa yang anda cari ?"
          onChange={(val) => {
            onSearch(val.currentTarget.value);
          }}
        />

        {!data?.length && isLoading ? (
          <Job_ComponentSkeletonBeranda />
        ) : _.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          // --- Main component --- //
          <ScrollOnly
            height="75vh"
            renderLoading={() => (
              <Center mt={"lg"}>
                <Loader color={"yellow"} />
              </Center>
            )}
            data={data}
            setData={setData as any}
            moreData={handleMoreData}
          >
            {(item) => <ComponentJob_BerandaCardView data={item} />}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}
