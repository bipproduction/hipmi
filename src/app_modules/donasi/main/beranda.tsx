"use client";

import { RouterDonasi } from "@/lib/router_hipmi/router_donasi";
import ComponentGlobal_CreateButton from "@/app_modules/_global/component/button_create";
import ComponentGlobal_IsEmptyData from "@/app_modules/_global/component/is_empty_data";
import ComponentGlobal_Loader from "@/app_modules/_global/component/loader";
import { Affix, Box, Button, Center, rem } from "@mantine/core";
import _ from "lodash";
import { ScrollOnly } from "next-scroll-loader";
import { useState } from "react";
import ComponentDonasi_CardPublish from "../component/card_view/card_publish";
import { donasi_funGetAllPublish } from "../fun/get/get_list_beranda";
import { MODEL_DONASI } from "../model/interface";
import { gs_donasiTriggerBeranda } from "@/lib/global_state";
import { useAtom } from "jotai";
import { useShallowEffect } from "@mantine/hooks";
import { AccentColor } from "@/app_modules/_global/color";

export default function MainDonasi({
  listDonasi,
}: {
  listDonasi: MODEL_DONASI[];
}) {
  const [data, setData] = useState(listDonasi);
  const [activePage, setActivePage] = useState(1);

  // Realtime
  const [isTriggerDonasiBeranda, setIsTriggerDonasiBeranda] = useAtom(
    gs_donasiTriggerBeranda
  );
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useShallowEffect(() => {
    if (isTriggerDonasiBeranda) {
      setIsShowUpdate(true);
    }
  }, [isTriggerDonasiBeranda, setIsShowUpdate]);

  async function onLoadData({ onPublish }: { onPublish: (val: any) => void }) {
    setIsLoading(true);
    const loadData = await donasi_funGetAllPublish({ page: 1 });
    onPublish(loadData);

    setIsShowUpdate(false);
    setIsTriggerDonasiBeranda(false);
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
                  onLoadData({
                    onPublish(val) {
                      setData(val);
                    },
                  });
                }}
              >
                Update beranda
              </Button>
            </Center>
          </Affix>
        )}

        <ComponentGlobal_CreateButton path={RouterDonasi.create_donasi} />
        {_.isEmpty(data) ? (
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
            moreData={async () => {
              const loadData = await donasi_funGetAllPublish({
                page: activePage + 1,
              });

              setActivePage((val) => val + 1);

              return loadData;
            }}
          >
            {(item) => (
              <ComponentDonasi_CardPublish
                data={item as any}
                path={RouterDonasi.detail_main}
              />
            )}
          </ScrollOnly>
        )}
      </Box>
    </>
  );
}
