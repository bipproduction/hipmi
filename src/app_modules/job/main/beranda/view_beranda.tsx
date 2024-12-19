"use client";

import { API_RouteJob } from "@/app/lib/api_user_router/route_api_job";
import { gs_jobTiggerBeranda } from "@/app/lib/global_state";
import { RouterJob } from "@/app/lib/router_hipmi/router_job";
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

export default function Job_ViewBeranda() {
  const [data, setData] = useState<MODEL_JOB[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [isSearch, setIsSearch] = useState("");

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
  }, []);

  async function onSearch(text: string) {
    setIsSearch(text);
    const loadData = await fetch(
      API_RouteJob.get_all({ page: activePage, search: text })
    );
    const res = await loadData.json();

    setData(res.data as any);
    setActivePage(1);
  }

  async function onLoadNewData() {
    const loadData = await fetch(API_RouteJob.get_all({ page: activePage }));
    const res = await loadData.json();
    // console.log(res.data);
    setData(res.data);
  }

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

        {_.isNull(data) ? (
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
            moreData={async () => {
              const loadData = await fetch(
                API_RouteJob.get_all({ page: activePage, search: isSearch })
              );

              const res = await loadData.json();
              setActivePage((val) => val + 1);

              return res.data;
            }}
          >
            {(item) => <ComponentJob_BerandaCardView data={item} />}
          </ScrollOnly>
        )}
      </Stack>
    </>
  );
}
