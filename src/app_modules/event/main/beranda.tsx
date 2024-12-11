"use client";

import { gs_eventTriggerBeranda } from "@/app/lib/global_state";
import { RouterEvent } from "@/app/lib/router_hipmi/router_event";
import { AccentColor } from "@/app_modules/_global/color";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import {
  Affix,
  Box,
  Button,
  Center,
  Loader,
  rem,
  Skeleton,
  Paper,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import { ComponentEvent_CardBeranda } from "../component/card_view/card_beranda";
import { event_getListAllPublish } from "../fun/get/get_list_all_publish";
import { MODEL_EVENT } from "../model/interface";
import { Event_ComponentSkeletonBeranda } from "../component";
import { API_RouteEvent } from "@/app/lib/api_user_router/route_api_event";

export default function Event_Beranda() {
  const [data, setData] = useState<MODEL_EVENT[] | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Realtime
  const [isTriggerEventBeranda, setIsTriggerEventBeranca] = useAtom(
    gs_eventTriggerBeranda
  );
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  useShallowEffect(() => {
    setIsShowUpdate(false);
    loadData();
  }, []);

  useShallowEffect(() => {
    if (isTriggerEventBeranda) {
      setIsShowUpdate(true);
    }
  }, [isTriggerEventBeranda]);

  async function loadData() {
    const res = await fetch(API_RouteEvent.get_all({ page: activePage }));
    const data = await res.json();
    setData(data.data as any);
  }

  async function onLoadNewData() {
    setIsLoading(true);
    const res = await fetch(API_RouteEvent.get_all({ page: 1 }));
    const data = await res.json();
    setData(data.data as any);

    setIsShowUpdate(false);
    setIsTriggerEventBeranca(false);
    setIsLoading(false);
  }

  return (
    <>
      <Box>
        {isShowUpdate && (
          <Affix position={{ top: rem(100) }} w={"100%"}>
            <Center>
              <Button
                style={{
                  transition: "0.5s",
                  border: `1px solid ${AccentColor.skyblue}`,
                }}
                bg={AccentColor.blue}
                loaderPosition="center"
                loading={isLoading}
                radius={"xl"}
                opacity={0.8}
                onClick={() => {
                  onLoadNewData();
                }}
              >
                Update beranda
              </Button>
            </Center>
          </Affix>
        )}

        <ComponentGlobal_CreateButton path={RouterEvent.create} />

        {data == null ? (
          <Event_ComponentSkeletonBeranda />
        ) : _.isEmpty(data) ? (
          <ComponentGlobal_IsEmptyData />
        ) : (
          <Box>
            <ScrollOnly
              height="82vh"
              renderLoading={() => (
                <Center mt={"lg"}>
                  <Loader color={"yellow"} />
                </Center>
              )}
              data={data}
              setData={setData as any}
              moreData={async () => {
                const loadData = await event_getListAllPublish({
                  page: activePage + 1,
                });

                setActivePage((val) => val + 1);

                return loadData;
              }}
            >
              {(item) => <ComponentEvent_CardBeranda data={item} />}
            </ScrollOnly>
          </Box>
        )}
      </Box>
    </>
  );
}
